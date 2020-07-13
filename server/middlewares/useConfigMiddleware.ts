import { resolve } from 'path';

import { Express } from 'express';
import configParser from '@server/utils/configParser';
import chalk from 'chalk';

const { NODE_CONFIG_DIR, NODE_ROOT_DIR, NODE_ENV } = process.env;

export default function useConfig(app: Express) {
    /**
     * environment variable config
     */
    app.set('inDev', NODE_ENV !== 'production');

    console.log('Mode:', chalk.greenBright.bold(app.get('inDev') ? 'Development' : 'Production'));
    /**
     * condition config
     */
    if (app.get('inDev')) {
        app.set('hmrPath', '/__webpack_hmr');
        app.set('rootPath', resolve(__dirname, '../../'));
    } else {
        app.set('copyright', '/** Copyright©2020 React Pro Boilerplate. All rights reserved. */');
        app.set('rootPath', NODE_ROOT_DIR ?? __dirname);
    }

    console.log('RootPath:', chalk.greenBright.bold(app.get('rootPath')));
    /**
     * file config
     */
    const configPath = NODE_CONFIG_DIR ?? resolve(app.get('rootPath'), 'config');
    const config = configParser(configPath);

    console.log('Config loaded from:', chalk.greenBright.bold(configPath));

    app.set('logSection', config.log);
    app.set('serverSection', config.server);
    app.set('authSection', config.auth);
    app.set('proxySection', config.proxy);
    app.set('docTitle', config.docTitle);
}
