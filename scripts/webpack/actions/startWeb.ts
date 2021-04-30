import { useWebDevMiddleware } from '@scripts/middlewares/useWebDevMiddleware';
import { boostrapDevServer } from '@scripts/utils/boostrapDevServer';

declare const module: any;

async function startWeb() {
    const { expressApp, settingService, devRootUrl, createServer } = await boostrapDevServer();

    await useWebDevMiddleware(expressApp, settingService, devRootUrl, createServer);
}

startWeb();
