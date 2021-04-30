import chalk from 'chalk';
import ejs from 'ejs';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SettingService } from '@server/infra/setting/setting.service';
import { Scheme, SettingSection } from '@server/infra/setting/setting.constants';
import { LoggerService } from '@server/infra/logger/logger.service';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Express, json, urlencoded } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer as createHttpServer, Server } from 'http';
import {
    createServer as createHttpsServer,
    globalAgent as httpsGlobalAgent,
    ServerOptions as HttpsServerOptions,
} from 'https';
import { ListenOptions } from 'net';
import { boostrapLogger } from '@server/infra/logger/logger.constants';
import { GlobalExceptionsFilter } from '@server/infra/exception/global-exception.filter';

/**
 * Use custom logger replacing built-in logger after nest application init.
 */
function useLogger(app: NestExpressApplication) {
    const loggerService = app.get(LoggerService);
    app.useLogger(loggerService);
}

/**
 * Enable static serviceSet custom engine & views.
 * "app.useStaticAssets(path, options)" eq "app.use(express.static(path, options))"
 * "app.setViewEngine(engine)" eq "app.set('view engine', engine)"
 * "app.setBaseViewsDir(path)" eq "app.set('views', path)"
 */
function useViewer(app: NestExpressApplication, settingService: SettingService) {
    const { runtime, staticRootPath } = settingService.get(SettingSection.SERVER);
    const absoluteStaticPath = resolve(runtime.appRootPath, staticRootPath);

    const viewTemplateExtension = 'html';
    app.useStaticAssets(absoluteStaticPath, { index: false });
    app.setViewEngine(viewTemplateExtension);
    app.setBaseViewsDir(absoluteStaticPath);
    app.engine(viewTemplateExtension, (ejs.delimiter = '$') && ejs.renderFile);

    boostrapLogger.log(`Default View Template Extension: ${viewTemplateExtension}`);
    boostrapLogger.log(`View Engine Render: ${ejs.name}`);
    boostrapLogger.log(`Static Assets Directory: ${chalk.greenBright.bold(absoluteStaticPath)}`);
}

/**
 * Register middleware list.
 * "app.use" eq "adapter.use"
 */
function useGlobalMiddleware(app: NestExpressApplication, settingService: SettingService) {
    const serverSetting = settingService.get(SettingSection.SERVER);

    /**
     * request parser middleware
     * @see https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
     * 'express.json' eq 'bodyParser.json' after express v4.1.6'
     * 'express.urlencoded' eq 'bodyParser.urlencoded after express v4.1.6'
     */
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(cookieParser());
    app.enableCors();

    /**
     * enable gzip compression middleware
     */
    if (serverSetting.enableGzip) {
        app.use(compression());
    }

    /**
     * security
     */
    // app.use(csrf({ cookie: true }))
    // app.use(helmet());

    /**
     * proxy middleware
     */
    const proxySetting = settingService.get(SettingSection.PROXY);
    if (proxySetting.enable) {
        app.use(
            proxySetting.context,
            createProxyMiddleware({
                target: proxySetting.target,
                changeOrigin: proxySetting.changeOrigin,
                // https://github.com/chimurai/http-proxy-middleware/issues/320
                onProxyReq: function onProxyReq(proxyReq, req) {
                    if (!req.body || !Object.keys(req.body).length) {
                        return;
                    }

                    const contentType = proxyReq.getHeader('Content-Type') as string;
                    const writeBody = (stringfiedBody: string) => {
                        proxyReq.setHeader('Content-Length', Buffer.byteLength(stringfiedBody));
                        proxyReq.write(stringfiedBody);
                    };

                    const reg = new RegExp('application/json');
                    if (reg.test(contentType)) {
                        writeBody(JSON.stringify(req.body));
                    }
                },
            }),
        );
    }
}

/**
 * Register Global Request Handdler
 * @param app
 * @param settingService
 */

export function useGlobalNestBuildInAOPHandler(app: NestExpressApplication) {
    // app.useGlobalGuards()
    // app.useGlobalInterceptors()
    // app.useGlobalPipes()
    app.useGlobalFilters(new GlobalExceptionsFilter());
}

export function createServer(app: Express, settingService: SettingService) {
    const { httpPort, protocol, domain, certKey, ca, certFile, rootUrl } = settingService.get(
        SettingSection.SERVER,
    );

    let httpServer: Server;

    const listenOptions: ListenOptions = { port: httpPort, host: domain };

    const loggingAfterServerCreating = () => {
        boostrapLogger.log(`Application is running: ${chalk.greenBright.bold(rootUrl)}`);
    };

    switch (protocol) {
        case Scheme.HTTPS: {
            const httpsOptions: HttpsServerOptions = {
                key: readFileSync(certKey),
                cert: readFileSync(certFile),
            };
            httpsGlobalAgent.options.ca = readFileSync(ca);
            httpServer = createHttpsServer(httpsOptions, app).listen(
                listenOptions,
                loggingAfterServerCreating,
            );
            break;
        }
        default: {
            httpServer = createHttpServer(app).listen(listenOptions, loggingAfterServerCreating);
            break;
        }
    }
    httpServer.addListener('error', (error) => {
        console.error(error);
    });
    return httpServer;

    // 我们监听了 node 信号，所以使用 cross-env-shell 而不是 cross-env
    // 参考：https://github.com/kentcdodds/cross-env#cross-env-vs-cross-env-shell
    // ['SIGINT', 'SIGTERM'].forEach((signal: any) => {
    //     process.on(signal, () => {
    //         // 先关闭 devServer
    //         httpServer.close();
    //         console.info(chalk.greenBright.bold(`\nReact Pro Boilerplate stopped!`));
    //         // 退出 node 进程
    //         process.exit();
    //     });
    // });
}

/**
 * Direct use of the express api should be avoided in all cases, because maybe we change the adapter layer in future for performance.
 * More details about how nest adapt express.
 * @see https://github.com/nestjs/nest/blob/477b6d0d5c9c670f6b37e4cfd84c9bf6f9b3adb3/packages/platform-express/adapters/express-adapter.ts
 */

export default async function boostrap(app: NestExpressApplication, expressApp: Express) {
    /**
     * Get setting service & Get configuration that required in boostrap stage.
     */
    const settingService = app.get(SettingService);
    useLogger(app);
    useViewer(app, settingService);
    useGlobalMiddleware(app, settingService);
    useGlobalNestBuildInAOPHandler(app);
    return createServer(expressApp, settingService);
}
