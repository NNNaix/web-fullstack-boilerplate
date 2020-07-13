import fs from 'fs';
import { resolve } from 'path';
import { Configuration, IgnorePlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackBar from 'webpackbar';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import { rootPath } from '@scripts/utils/envConfig';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const nodeModules: { [key: string]: string } = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return !['.bin'].includes(x);
    })
    .forEach(function (mod: string) {
        nodeModules[mod] = `commonjs ${mod}`;
    });

const config: Configuration = {
    mode: 'production',
    context: rootPath,
    entry: resolve(rootPath, './server/index.ts'),
    target: 'node',
    output: {
        path: resolve(rootPath, './dist'),
        filename: 'server.js',
    },
    resolve: {
        // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
        extensions: ['.ts', '.js'],
        alias: {
            // '@': rootPath,
            // '@public': resolve(rootPath, '/public'),
            '@server': resolve(rootPath, './server'),
            // '@scripts': resolve(rootPath, './scripts/webpack'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: false },
                exclude: /node_modules/,
            },
        ],
    },
    node: false,
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['server.js', 'config'],
        }),
        new WebpackBar({
            name: '[Node] React-Pro-Boilerplate',
            // react 蓝
            color: '#61dafb',
        }),
        new IgnorePlugin(/\.(css|less)$/),
        new FriendlyErrorsPlugin(),
        new ForkTsCheckerWebpackPlugin({
            // 生产环境打包并不频繁，可以适当调高允许使用的内存，加快类型检查速度
            memoryLimit: 1024 * 2,
            tsconfig: resolve(rootPath, './server/tsconfig.json'),
            measureCompilationTime: true,
            checkSyntacticErrors: true,
        }),
        new CopyPlugin([
            {
                context: resolve(rootPath, './config'),
                from: '*',
                to: resolve(rootPath, './dist/config'),
                toType: 'dir',
            },
        ]),
    ],
    externals: nodeModules,
};

export default config;
