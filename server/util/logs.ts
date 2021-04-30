import { resolve } from 'path';
import { Appender, ConsoleAppender, FileAppender } from 'log4js';
import {
    LogBasicTransportSectionSetting,
    LogSectionSetting,
} from '@server/infra/setting/sections/logging';
import { boostrapLogger } from '@server/infra/logger/logger.constants';

function appenderParser(
    globalConfig: LogSectionSetting,
    config: Required<LogBasicTransportSectionSetting>,
): Appender {
    const { storePath } = globalConfig;
    const { appenderType, filename, logRotate, maxSizeShift, maxDays } = config;

    switch (appenderType) {
        case 'console': {
            return {
                type: 'console',
                layout: { type: 'basic' },
            } as ConsoleAppender;
        }
        case 'file': {
            return {
                type: 'file',
                filename: resolve(storePath, filename),
                keepFileExt: logRotate,
                maxLogSize: 1 << Number(maxSizeShift),
                backups: Number(maxDays),
                layout: { type: 'basic' },
            } as FileAppender;
        }
        default: {
            // This only use to fallback, you should add to the above if want use a new type.
            return {
                type: appenderType,
                layout: { type: 'basic' },
            };
        }
    }
}

export function logAppenders(logSection: LogSectionSetting): { [name: string]: Appender } {
    const appenderMaps: { [name: string]: Appender } = {};
    logSection.transports.forEach((transport) => {
        if (logSection[transport]) {
            appenderMaps[transport] = appenderParser(
                logSection,
                logSection[transport] as Required<LogBasicTransportSectionSetting>,
            );
        } else {
            boostrapLogger.warn(
                `log section transport <${transport}> has no config and be ignored`,
            );
        }
    });
    return appenderMaps;
}
