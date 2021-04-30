import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { configure, getLogger, Logger } from 'log4js';
import { LogTransport, SettingSection } from '@server/infra/setting/setting.constants';
import { SettingService } from '@server/infra/setting/setting.service';
import { logAppenders } from '@server/util/logs';

@Injectable()
export class LoggerService implements NestLoggerService {
    private readonly loggers: Map<string, Logger>;

    constructor(settingService: SettingService) {
        const logSetting = settingService.get(SettingSection.LOG);
        this.loggers = new Map();
        configure({
            appenders: logAppenders(logSetting),
            categories: {
                default: {
                    appenders: logSetting.transports.filter((transport) => !!logSetting[transport]),
                    level: logSetting.level ?? 'info',
                },
            },
        });
    }

    getLogger(loggerName = LogTransport.CONSOLE) {
        let logger = this.loggers.get(loggerName);
        if (!logger) {
            logger = getLogger(logger);
            this.loggers.set(loggerName, logger);
        }
        return logger;
    }

    log(message: any, context?: LogTransport): any {
        this.getLogger(context).info(message);
    }

    warn(message: any, context?: LogTransport): any {
        this.getLogger(context).warn(message);
    }

    verbose(message: any, context?: LogTransport): any {
        this.getLogger(context).trace(message);
    }

    debug(message: any, context?: LogTransport): any {
        this.getLogger(context).debug(message);
    }

    error(message: any, trace: string, context?: LogTransport): any {
        this.getLogger(context).error(message, trace);
    }
}
