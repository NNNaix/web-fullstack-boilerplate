import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import boostrap from '@server/boostrap';
import { AppEnvironment } from '@server/infra/setting/setting.constants';
import { AppModule } from './app.module';

declare const module: any;

async function main() {
    const expressApp = express();
    const nestApp = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(expressApp),
    );
    const httpServer = await boostrap(nestApp, expressApp);
    await nestApp.init();

    const { NODE_ENV = AppEnvironment.DEVELOPMENT } = process.env;
    if (NODE_ENV === AppEnvironment.DEVELOPMENT && module.hot) {
        module.hot.accept();
        module.hot.dispose(() => {
            nestApp.close();
            httpServer.close();
            // process.exit()
        });
    }
}

main();
