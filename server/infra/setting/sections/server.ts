import Joi from 'joi';
import {
    AppEnvironment,
    DEFAULT_APP_VIEW_TITLE,
    DEFAULT_CONF_LOAD_DIRECTORY,
    DEFAULT_DEV_HRM_PATH,
    DEFAULT_DEV_PORT,
    DEFAULT_DOMAIN,
    DEFAULT_EMPTY,
    DEFAULT_PORT,
    DEFAULT_STATIC_ROOT_PATH,
    Scheme,
    SettingSection,
    Switch,
} from '@server/infra/setting/setting.constants';
import generateSettingSectionDefaultSchema from '@server/util/setting';

export interface ServerDevSectionSetting {
    httpPort: number;
    hmrPath: string;
    hmrReload: boolean;
    hmrOverlay: boolean;
}

export interface ServerRuntimeSectionSetting {
    appRootPath: string;
    appConfigPath: string;
    appEnv: AppEnvironment;
}

export interface ServerSectionSetting {
    protocol: Scheme;
    httpAddr: string;
    httpPort: number;
    domain: string;
    rootUrl: string;
    appSubUrl: string;
    staticRootPath: string;
    appViewTitle: string;
    enableGzip: boolean;
    certFile: string;
    certKey: string;
    ca: string;
    dev: ServerDevSectionSetting;
    runtime: ServerRuntimeSectionSetting;
}

export const ServerSectionSettingSchema = generateSettingSectionDefaultSchema(
    SettingSection.SERVER,
    {
        protocol: Scheme.HTTP,
        httpAddr: DEFAULT_EMPTY,
        httpPort: DEFAULT_PORT,
        domain: DEFAULT_DOMAIN,
        rootUrl: DEFAULT_EMPTY,
        appEnv: AppEnvironment.DEVELOPMENT,
        appSubUrl: DEFAULT_EMPTY,
        staticRootPath: DEFAULT_STATIC_ROOT_PATH,
        appViewTitle: DEFAULT_APP_VIEW_TITLE,
        enableGzip: Switch.ON,
        certFile: DEFAULT_EMPTY,
        certKey: DEFAULT_EMPTY,
        ca: DEFAULT_EMPTY,
        dev: {
            httpPort: DEFAULT_DEV_PORT,
            hmrPath: DEFAULT_DEV_HRM_PATH,
            hmrOverlay: Switch.ON,
            hmrReload: Switch.ON,
        },
        runtime: {
            appConfigPath: DEFAULT_CONF_LOAD_DIRECTORY,
            appRootPath: DEFAULT_EMPTY,
            appEnv: AppEnvironment.DEVELOPMENT,
        },
    },
    {
        protocol: Joi.string().valid(Scheme.HTTP, Scheme.HTTP2, Scheme.HTTPS),
        runtime: {
            appEnv: Joi.string().valid(...Object.values(AppEnvironment)),
        },
    },
);
