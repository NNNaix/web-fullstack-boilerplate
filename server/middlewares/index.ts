import { Express } from 'express';
import chalk from 'chalk';
import useConfig from './useConfigMiddleware';
import useLogger from './useLoggerMiddleware';
import useViewEngine from './useViewMiddleware';
import useStatic from './useStaticMiidleware';
import useRequestParser from './useRequestParserMiddleware';
import useProxy from './useProxyMiddleware';
import useRouter from './useRouterMiddleware';

function setupMiddlewares(app: Express) {
    console.log(chalk.grey.bold('Starting React Pro Boilerplate Server'));
    useConfig(app);
    useLogger(app);
    useViewEngine(app);
    useStatic(app);
    useRequestParser(app);
    useProxy(app);
    useRouter(app);
}

export default setupMiddlewares;
