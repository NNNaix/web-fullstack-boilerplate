import { resolve } from 'path';
import { Express } from 'express';
import chalk from 'chalk';
import { createProxyMiddleware } from 'http-proxy-middleware';
import configParser from '@server/utils/configParser';
import { rootPath, hmrPath } from '@scripts/utils/envConfig';

const { NODE_CONFIG_DIR } = process.env;

function link(str: string) {
    return chalk.magenta.underline(str);
}

export default function proxyMiddleware(app: Express) {
    const configPath = NODE_CONFIG_DIR ?? resolve(rootPath, 'config');
    const { server } = configParser(configPath);

    console.log(`proxy ${link('*')} ${chalk.green('->')} ${link(server.rootUrl)}`);
    app.use(
        /** ignore the HMR path */
        createProxyMiddleware([`!${hmrPath}`], {
            target: server.rootUrl,
            changeOrigin: true,
            ws: true,
            logLevel: 'warn',
        }),
    );
    process.stdout.write('\n');
}
