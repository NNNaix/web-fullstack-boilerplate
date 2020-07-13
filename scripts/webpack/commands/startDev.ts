import express from 'express';
import webpack from 'webpack';
import WebpackOpenBrowser from 'webpack-open-browser';
import { argv } from 'yargs';
import { devServerSection } from '@scripts/utils/envConfig';

import devConfig from '../configs/web/webpack.dev';
import setupMiddlewares from '../middlewares';

async function start() {
    const openBrowser = argv.open as any;
    const app = express();
    app.set('serverSection', devServerSection);
    const { rootUrl } = devServerSection;

    // may true or a url address
    if (openBrowser) {
        const openAddress = openBrowser === true ? rootUrl : openBrowser;
        devConfig.plugins!.push(new WebpackOpenBrowser({ url: openAddress }));
    }

    // load webpack config and get compiler
    const compiler = webpack(devConfig);

    setupMiddlewares(app, compiler);
}

// if this module be directly runned
if (require.main === module) {
    start();
}
