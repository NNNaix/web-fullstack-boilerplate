import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from '@ltd/j-toml';
import { camelCase, defaultsDeep, each, isObject } from 'lodash';
import chalk from 'chalk';
import {
    AppEnvironment,
    DEFAULT_CONF_FILE_EXTENSION_NAME,
    DEFAULT_CONF_FILE_NAME,
    DEFAULT_CONF_LOAD_DIRECTORY,
    SettingSection,
} from '@server/infra/setting/setting.constants';
import { ServerRuntimeSectionSetting } from '@server/infra/setting/sections/server';
import { boostrapLogger } from '@server/infra/logger/logger.constants';
import { Setting, TOMLAvailableValue } from './sections';

function loadConfigFile(
    configDir: string,
    filename = `${DEFAULT_CONF_FILE_NAME}.${DEFAULT_CONF_FILE_EXTENSION_NAME}`,
) {
    try {
        return parse(readFileSync(resolve(configDir, filename), 'utf8'), 1, '/n', false) as any;
    } catch (error) {
        boostrapLogger.error(`Configuration Loading Failed: [${filename}] ${error}`);
        return null;
    }
}

function camelCaseMap(config: {
    [name: string]: TOMLAvailableValue;
}): { [name: string]: TOMLAvailableValue } {
    each(config, (v, k) => {
        const camelKey = camelCase(k);
        if (isObject(v) && !Array.isArray(v)) {
            config[camelKey] = camelCaseMap(v as { [name: string]: any });
        } else {
            config[camelKey] = v;
        }
        if (k !== camelKey) {
            Reflect.deleteProperty(config, k);
        }
    });
    return config;
}

export function postTransformRawConfiguration(
    configFromFile:
        | {
              [name in SettingSection]: Setting[name];
          }
        | null,
    configFromRuntime: ServerRuntimeSectionSetting,
): Setting {
    if (configFromFile === null) {
        configFromFile = {
            server: {},
        } as Setting;
    }
    // add runtime source configuration
    configFromFile.server.runtime = configFromRuntime;

    return (camelCaseMap(configFromFile) as unknown) as Setting;
}

export default function loadConfiguration() {
    /**
     * NODE_CONFIG_DIR: the directory which contains config files
     * NODE_ROOT_DIR: the project root path
     * NODE_ENV: the environment of app
     */
    const {
        NODE_ROOT_DIR = resolve(process.cwd()),
        NODE_CONFIG_DIR = resolve(NODE_ROOT_DIR, DEFAULT_CONF_LOAD_DIRECTORY),
        NODE_ENV = AppEnvironment.DEVELOPMENT,
    } = process.env;

    /**
     *  Note: The order of the array is not allowed to be modified!!!
     *  The higher order of the array has a higher priority of the configuration merge.
     */
    const fileConfSources = [
        /** env override conf */
        NODE_ENV,
        /** default conf */
        DEFAULT_CONF_FILE_NAME,
    ].map((confName) => {
        const fullName = `${confName}.${DEFAULT_CONF_FILE_EXTENSION_NAME}`;
        return {
            fullName,
            existed: existsSync(resolve(NODE_CONFIG_DIR, fullName)),
        };
    });

    const confDirExisted = existsSync(NODE_CONFIG_DIR);
    const anyFileConfSourceExisted = fileConfSources.some((src) => src.existed);

    boostrapLogger.log(`Application Root Path: ${chalk.greenBright.bold(NODE_ROOT_DIR)}`);
    boostrapLogger.log(`Configuration Directory: ${chalk.greenBright.bold(NODE_CONFIG_DIR)}`);
    boostrapLogger.log(
        `Available Configuration File(s) Expected: ${chalk.greenBright.bold(
            fileConfSources.map((src) => src.fullName),
        )}`,
    );

    if (confDirExisted) {
        if (anyFileConfSourceExisted) {
            boostrapLogger.log(
                `Available Configuration File(s) Founded: ${chalk.greenBright.bold(
                    fileConfSources.filter((src) => src.existed).map((src) => src.fullName),
                )}`,
            );
            boostrapLogger.log(
                `Available Configuration File(s) Loading: ${chalk.greenBright.bold(
                    fileConfSources.filter((src) => src.existed).map((src) => src.fullName),
                )}`,
            );
        } else {
            boostrapLogger.warn(
                'The specified configuration file(s) was not found in the configuration directory',
            );
        }
    } else {
        boostrapLogger.warn('The configuration directory is not found');
    }

    !anyFileConfSourceExisted &&
        boostrapLogger.warn('The application will start using the built-in default configuration');

    return postTransformRawConfiguration(
        anyFileConfSourceExisted
            ? defaultsDeep(
                  ...(fileConfSources.map((src) =>
                      src.existed ? loadConfigFile(NODE_CONFIG_DIR, src.fullName) : null,
                  ) as [Record<string, unknown>, Record<string, unknown>]),
              )
            : null,
        {
            appRootPath: NODE_ROOT_DIR,
            appConfigPath: NODE_CONFIG_DIR,
            appEnv: NODE_ENV as AppEnvironment,
        },
    );
}
