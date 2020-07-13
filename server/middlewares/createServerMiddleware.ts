import { ListenOptions } from 'net';
import http, { Server } from 'http';
import https from 'https';
import fs from 'fs';

import chalk from 'chalk';
import logSymbols from 'log-symbols';

import { Express } from 'express';
import { ServerSection } from '../typings';
import { nLogger } from '../utils/logs';

const HTTP = 'http';
const HTTPS = 'https';

export default function createServerMiddleware(app: Express) {
    const {
        protocol = HTTP,
        domain,
        httpPort,
        rootUrl,
        certFile,
        certKey,
        ca,
    }: ServerSection = app.get('serverSection');

    let httpServer: Server;
    const options: ListenOptions = { port: httpPort, host: domain };
    // create server, depends on protocol
    console.log(
        'Initialing HTTPServer:',
        '\n    Protocoal:',
        chalk.greenBright.bold(protocol),
        '\n    Domain:',
        chalk.greenBright.bold(domain),
        '\n    Port:',
        chalk.greenBright.bold(httpPort),
    );

    switch (protocol) {
        case HTTP: {
            httpServer = http.createServer(app).listen(options, () => {
                console.info(
                    `Server is running at ${chalk.magenta.underline(rootUrl)} ${
                        logSymbols.success
                    }`,
                );
            });
            break;
        }
        case HTTPS: {
            const httpsOptions = {
                ...options,
                key: fs.readFileSync(certKey),
                cert: fs.readFileSync(certFile),
            };
            https.globalAgent.options.ca = fs.readFileSync(ca);
            https.createServer(httpsOptions, app).listen({ port: httpPort, host: domain }, () => {
                console.info(
                    `Server is running at ${chalk.magenta.underline(rootUrl)} ${
                        logSymbols.success
                    }`,
                );
            });
            httpServer = https.createServer(app).listen(options);
            break;
        }
        default: {
            httpServer = http.createServer(app).listen(options, () => {
                console.info(
                    `Server is running at ${chalk.magenta.underline(rootUrl)} ${
                        logSymbols.success
                    }`,
                );
            });
            break;
        }
    }
    httpServer.addListener('error', (err) => {
        nLogger.get().error(err);
    });
    // 我们监听了 node 信号，所以使用 cross-env-shell 而不是 cross-env
    // 参考：https://github.com/kentcdodds/cross-env#cross-env-vs-cross-env-shell
    ['SIGINT', 'SIGTERM'].forEach((signal: any) => {
        process.on(signal, () => {
            // 先关闭 devServer
            httpServer.close();
            console.info(chalk.greenBright.bold(`\nReact Pro Boilerplate stopped!`));
            // 退出 node 进程
            process.exit();
        });
    });
}
