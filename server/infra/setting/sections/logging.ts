import Joi, { AnySchema } from 'joi';
import {
    DEFAULT_LOG_DESC_FILE_NAME,
    DEFAULT_LOG_MAX_DAYS,
    DEFAULT_LOG_MAX_SIZE_SHIFT,
    DEFAULT_LOG_STORE_PATH,
    LogAppenderType,
    LogLevel,
    LogTransport,
    SettingSection,
    Switch,
} from '@server/infra/setting/setting.constants';
import generateSettingSectionDefaultSchema from '@server/util/setting';

export interface LogBasicTransportSectionSetting {
    level?: LogLevel;
    appenderType?: LogAppenderType;
    filename?: string;
    logRotate?: boolean;
    maxSizeShift?: number;
    dailyRotate?: boolean;
    maxDays?: number;
}

export interface LogSectionSetting {
    // transports: (keyof Omit<LogSectionSetting, 'transports' | 'level' | 'storePath'>)[]
    transports: LogTransport[];
    level: LogLevel;
    storePath: string;
    [LogTransport.CONSOLE]: LogBasicTransportSectionSetting;
    [LogTransport.DESC]: LogBasicTransportSectionSetting;
}

function generateLogTransportSectionOverrideSchema() {
    const schema: {
        [k in LogTransport]?: { [t in keyof LogBasicTransportSectionSetting]: AnySchema };
    } = {};
    const transports = Object.values(LogTransport);

    transports.forEach((transport) => {
        schema[transport as LogTransport] = {
            level: Joi.string().valid(...Object.values(LogLevel)),
            appenderType: Joi.string().valid(...Object.values(LogAppenderType)),
        };
    });

    return schema;
}

export const LogSectionSettingSchema = generateSettingSectionDefaultSchema(
    SettingSection.LOG,
    {
        level: LogLevel.INFO,
        storePath: DEFAULT_LOG_STORE_PATH,
        transports: Object.values(LogTransport),
        [LogTransport.CONSOLE]: {
            level: LogLevel.INFO,
            appenderType: LogAppenderType.CONSOLE,
        },
        [LogTransport.DESC]: {
            level: LogLevel.INFO,
            filename: DEFAULT_LOG_DESC_FILE_NAME,
            appenderType: LogAppenderType.FILE,
            logRotate: Switch.ON,
            maxSizeShift: DEFAULT_LOG_MAX_SIZE_SHIFT,
            dailyRotate: Switch.ON,
            maxDays: DEFAULT_LOG_MAX_DAYS,
        },
    },
    {
        level: Joi.string().valid(...Object.values(LogLevel)),
        transports: Joi.array()
            .unique()
            .items(...Object.values(LogTransport)),
        ...generateLogTransportSectionOverrideSchema(),
    },
);
