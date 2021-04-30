import { resolve } from 'path';
import merge from 'webpack-merge';
import { HotModuleReplacementPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { ServerSectionSetting } from '@server/infra/setting/sections/server';
import { generateCommonConfig } from './webpack.common';

export const generateDevConfig = (serverSectionSetting: ServerSectionSetting) =>
    merge(generateCommonConfig(serverSectionSetting), {
        mode: 'development',
        // 如果觉得还可以容忍更慢的非 eval 类型的 sourceMap，可以搭配 error-overlay-webpack-plugin 使用
        // 需要显示列号可以切换成 eval-source-map
        devtool: 'cheap-module-source-map',
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                memoryLimit: 1024,
                tsconfig: resolve(
                    serverSectionSetting.runtime.appRootPath,
                    './client/app/tsconfig.json',
                ),
                checkSyntacticErrors: true,
            }),
            new HotModuleReplacementPlugin(),
        ],
    });
