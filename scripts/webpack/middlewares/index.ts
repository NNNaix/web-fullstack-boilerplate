import { Compiler } from 'webpack';
import { Express } from 'express';

import historyFallback from 'connect-history-api-fallback';
import cors from 'cors';
import createServerMiddleware from '@server/middlewares/createServerMiddleware';

import proxyMiddleware from './proxyMiddleware';
import webpackMiddleware from './webpackMiddleware';

/**
 * setup middlewares
 */
export default function setupMiddlewares(app: Express, compiler: Compiler) {
    proxyMiddleware(app);

    // when use browserRouter ，need to redirt all the html page to home
    app.use(historyFallback());

    // enable cors proxy
    app.use(cors());

    // webpack middleware
    app.use(webpackMiddleware(compiler));
    createServerMiddleware(app);
}
