import { configure } from 'log4js';

import { Express } from 'express';
import { LogSection } from '@server/typings';

import { logAppenders } from '@server/utils/logs';

export default function useLogger(app: Express): void {
    const logSection: LogSection = app.get('logSection');

    configure({
        appenders: logAppenders(logSection),
        categories: {
            default: {
                appenders: logSection.transports.filter((transport) => !!logSection[transport]),
                level: logSection.level ?? 'info',
            },
        },
    });
}
