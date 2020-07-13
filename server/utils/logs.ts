import { resolve } from 'path';
import log4js, { Appender, ConsoleAppender, FileAppender, Logger } from 'log4js';
import logSymbol from 'log-symbols';
import { LogSection, LogBasicTransportSection } from '../typings';

function appenderParser(globalConfig: LogSection, config: LogBasicTransportSection): Appender {
    const { storePath } = globalConfig;
    const {
        appenderType = 'custom',
        filename = 'default.log',
        logRotate = false,
        maxSizeShift = 28,
        maxDays = 7,
    } = config;

    switch (appenderType) {
        case 'console': {
            const consoleAppenderConfig: ConsoleAppender = {
                type: 'console',
                layout: { type: 'basic' },
            };
            return consoleAppenderConfig;
        }
        case 'file': {
            const fileAppenderConfig: FileAppender = {
                type: 'file',
                filename: resolve(storePath, filename),
                keepFileExt: logRotate,
                maxLogSize: 1 << maxSizeShift,
                backups: maxDays,
                layout: { type: 'basic' },
            };
            return fileAppenderConfig;
        }
        default: {
            // This only use to fallback, you should add to the above if want use a new type.
            const customAppenderConfig: Appender = {
                type: appenderType,
                layout: { type: 'basic' },
            };
            return customAppenderConfig;
        }
    }
}

export function logAppenders(logSection: LogSection): { [name: string]: Appender } {
    const appenderMaps: { [name: string]: Appender } = {};
    logSection.transports.forEach((transport) => {
        if (logSection[transport]) {
            appenderMaps[transport] = appenderParser(
                logSection,
                logSection[transport] as LogBasicTransportSection,
            );
        } else {
            console.warn(
                `[${logSymbol.warning}]: log section transport <${transport}> has no config and be ignored`,
            );
        }
    });
    return appenderMaps;
}

class Nlogger {
    // auto memo the logger instance.
    #loggerMap: { [type: string]: Logger } = {};

    // auto use type if no type, depends on env.
    get(type?: string): Logger {
        const finalType = process.env.NODE_ENV !== 'production' ? 'console' : type ?? 'desc';

        if (!this.#loggerMap[finalType]) {
            this.#loggerMap[finalType] = log4js.getLogger(type);
        }
        return this.#loggerMap[finalType];
    }
}
export const nLogger = new Nlogger();
