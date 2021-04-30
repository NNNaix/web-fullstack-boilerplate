import webpack from 'webpack';
import { Express } from 'express';
import historyFallback from 'connect-history-api-fallback';
import WebpackOpenBrowser from 'webpack-open-browser';
import { argv } from 'yargs';
import { SettingService } from '@server/infra/setting/setting.service';
import { SettingSection } from '@server/infra/setting/setting.constants';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createProxyMiddleware } from 'http-proxy-middleware';
import chalk from 'chalk';
import cors from 'cors';
import { generateDevConfig } from '../configs/web/webpack.dev';

function link(str: string) {
    return chalk.magenta.underline(str);
}

export async function useWebDevMiddleware(
    app: Express,
    settingService: SettingService,
    devRootUrl: string,
    createServer: () => Promise<any>,
) {
    const openBrowser = argv.open as any;
    const serverSectionSetting = settingService.get(SettingSection.SERVER);

    const devConfig = generateDevConfig(serverSectionSetting);
    // may true or a url address
    if (openBrowser) {
        const openAddress = openBrowser === true ? devRootUrl : openBrowser;
        devConfig.plugins!.push(new WebpackOpenBrowser({ url: openAddress }));
    }

    // load webpack config and get compiler
    const compiler = webpack(devConfig);

    console.log(`proxy ${link('*')} ${chalk.green('->')} ${link(serverSectionSetting.rootUrl)}\n`);
    app.use(
        /** ignore the HMR path */
        createProxyMiddleware([`!${serverSectionSetting.dev.hmrPath}`], {
            target: serverSectionSetting.rootUrl,
            changeOrigin: true,
            ws: true,
            logLevel: 'warn',
        }),
    );

    // when use browserRouter ，need to redirect all the html page to home
    app.use(historyFallback());

    app.use(cors());

    app.use([
        webpackDevMiddleware(compiler, {
            // 保持和 webpack 中配置一致
            publicPath: devConfig!.output!.publicPath,
            // 只在发生错误或有新的编译时输出
            stats: 'minimal',
            // 需要输出文件到磁盘可以开启
            writeToDisk: true,
        }),
        webpackHotMiddleware(compiler, {}),
    ]);

    app.addListener('error', (error) => {
        console.error(error);
    });

    await createServer();
}
