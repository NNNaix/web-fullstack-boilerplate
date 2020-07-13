// use camel case name style
export type TOMLAvailableValue =
    | number
    | string
    | boolean
    | [string | number | boolean]
    | { [key: string]: any };

export interface LogBasicTransportSection {
    level?: string;
    appenderType?: string;
    filename?: string;
    logRotate?: boolean;
    maxSizeShift?: number;
    dailyRotate?: boolean;
    maxDays?: number;
}

export interface LogSection {
    transports: [string];
    level: string;
    storePath: string;
    desc: LogBasicTransportSection;
    console: LogBasicTransportSection;
    [key: string]: TOMLAvailableValue;
}

export interface ServerSection {
    protocol: 'http' | 'https';
    httpAddr: string;
    httpPort: number;
    domain: string;
    rootUrl: string;
    appSubUrl: string;
    staticRootPath: string;
    enableGzip: boolean;
    certFile: string;
    certKey: string;
    ca: string;
    [key: string]: TOMLAvailableValue;
}

export interface AuthSection {
    loginCookieName: string;
    signoutRedirectUrl: string;
    loginUrl: string;
    [key: string]: TOMLAvailableValue;
}

export interface ProxySection {
    enable: boolean;
    context: string;
    target: string;
    changeOrigin: boolean;
}

export interface ConfigKeys {
    server: ServerSection;
    auth: AuthSection;
    log: LogSection;
    proxy: ProxySection;
    docTitle: string;
    [key: string]: TOMLAvailableValue;
}
