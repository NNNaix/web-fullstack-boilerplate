import fs from 'fs';
import path from 'path';
import { parse } from 'toml';
import { merge, camelCase, each, isPlainObject } from 'lodash';

import { ConfigKeys, TOMLAvailableValue } from '@server/typings';

const { NODE_ENV } = process.env;

/**
 * @todo default as the config file is existed, later we wiil add presearch predicate.
 */

function loadConfigFile(configDir: string, filename = 'default.toml') {
    return parse(fs.readFileSync(path.resolve(configDir, filename), 'utf8'));
}

function camelCaseMap(config: {
    [name: string]: TOMLAvailableValue;
}): { [name: string]: TOMLAvailableValue } {
    each(config, (v, k) => {
        const camelKey = camelCase(k);
        if (camelKey !== k) {
            if (isPlainObject(v)) {
                config[camelKey] = camelCaseMap(v as { [name: string]: any });
            } else {
                config[camelKey] = v;
            }
            delete config[k];
        } else if (isPlainObject(v)) {
            config[k] = camelCaseMap(v as { [name: string]: any });
        }
    });
    return config;
}

/**
 * @description handle function that prefix with postTransform use to generate variable depend on toml.
 * @todo i will develop a toml variable parser later for replacing the config post-handler
 * @author naix
 */
export function postTransformtServerSection(config: {
    [name: string]: TOMLAvailableValue;
}): ConfigKeys {
    const formattedConfig = camelCaseMap(config) as ConfigKeys;
    const { protocol, domain, httpPort, appSubUrl } = formattedConfig.server;

    /** add server root url depends on other url component */
    formattedConfig.server.rootUrl = `${protocol}://${domain}:${httpPort}/${appSubUrl}`;

    return formattedConfig;
}

export default function configParser(configDir: string): ConfigKeys {
    return postTransformtServerSection(
        merge(
            /** defualt config */
            loadConfigFile(configDir),
            /** env override config */
            loadConfigFile(configDir, `${NODE_ENV}.toml`),
        ),
    );
}
