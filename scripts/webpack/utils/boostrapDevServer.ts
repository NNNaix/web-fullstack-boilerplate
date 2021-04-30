import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { SettingService } from '@server/infra/setting/setting.service';
import { SettingModule } from '@server/infra/setting/setting.module';
import { boostrapLogger } from '@server/infra/logger/logger.constants';
import chalk from 'chalk';
import { SettingSection } from '@server/infra/setting/setting.constants';
import * as http from 'http';

export async function boostrapDevServer() {
    const expressApp = express();
    const nestApp = await NestFactory.create<NestExpressApplication>(
        SettingModule,
        new ExpressAdapter(expressApp),
    );
    const settingService = nestApp.get(SettingService);
    const { protocol, domain, dev, appSubUrl } = settingService.get(SettingSection.SERVER);
    const devRootUrl = `${protocol}://${domain}:${dev.httpPort}/${appSubUrl}`;

    const createServer = async () => {
        http.createServer(expressApp).listen(dev.httpPort);
        boostrapLogger.log(
            `Web Development Server is running: ${chalk.greenBright.bold(devRootUrl)}`,
        );
        await nestApp.init();
    };

    return { expressApp, nestApp, settingService, devRootUrl, createServer };
}
