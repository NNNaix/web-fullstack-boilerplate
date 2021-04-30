/** ************************************** Common Setting Constants *************************************** */
export const DEFAULT_CONF_FILE_EXTENSION_NAME = 'toml';
export const DEFAULT_CONF_FILE_NAME = 'default';
export const DEFAULT_EMPTY = '';
export const DEFAULT_CONF_LOAD_DIRECTORY = 'conf';

export enum Scheme {
    HTTP = 'http',
    HTTPS = 'https',
    HTTP2 = 'h2',
}

export const Switch = {
    ON: true,
    OFF: false,
};

export enum SettingSection {
    SERVER = 'server',
    LOG = 'log',
    AUTH = 'auth',
    PROXY = 'proxy',
}

/** ************************************** Server Sections Constants *************************************** */
export const DEFAULT_DOMAIN = 'localhost';
export const DEFAULT_STATIC_ROOT_PATH = 'dist/public';
export const DEFAULT_PORT = 3000;
export const DEFAULT_DEV_PORT = 3001;
export const DEFAULT_APP_VIEW_TITLE = 'application';
export const DEFAULT_DEV_HRM_PATH = '/__webpack_hmr';

export enum AppEnvironment {
    DEVELOPMENT = 'development',
    TEST = 'test',
    PRODUCTION = 'production',
}

/** ************************************** Log Sections Constants *************************************** */
export const DEFAULT_LOG_STORE_PATH = 'log';
export const DEFAULT_LOG_DESC_FILE_NAME = 'desc.log';
export const DEFAULT_LOG_MAX_SIZE_SHIFT = 28;
export const DEFAULT_LOG_MAX_DAYS = 7;

export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    FATAL = 'fatal',
}

export enum LogAppenderType {
    STDOUT = 'stdout',
    CONSOLE = 'console',
    FILE = 'file',
    DATE_FILE = 'dateFile',
}

export enum LogTransport {
    CONSOLE = 'console',
    DESC = 'desc',
}

/** ************************************** Auth Sections Constants *************************************** */
export const DEFAULT_SESSION_NAME = 'SESSION';

/** ************************************** Proxy Sections Constants *************************************** */
