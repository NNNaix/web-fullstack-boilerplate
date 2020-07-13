import { resolve } from 'path';
import { Configuration, ContextReplacementPlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
// import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// eslint-disable-next-line import/no-unresolved
import { Options as HtmlMinifierOptions } from 'html-minifier';
import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { inDev, rootPath, hmrPath } from '@scripts/utils/envConfig';

function getCssLoaders(importLoaders: number) {
    return [
        inDev ? 'style-loader' : MiniCssExtractLoader,
        {
            loader: 'css-loader',
            options: {
                modules: false,
                // 前面使用的每一个 loader 都需要指定 sourceMap 选项
                sourceMap: true,
                // 指定在 css-loader 前应用的 loader 的数量
                importLoaders,
            },
        },
        {
            loader: 'postcss-loader',
            options: { sourceMap: true },
        },
    ];
}

// index.html 压缩选项
const htmlMinifyOptions: HtmlMinifierOptions = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    useShortDoctype: true,
};

const commonConfig: Configuration = {
    cache: true,
    context: rootPath,
    entry: ['react-hot-loader/patch', resolve(rootPath, './public/app/index.tsx')],
    output: {
        publicPath: '',
        path: resolve(rootPath, './dist'),
        filename: 'js/[name]-[hash].bundle.js',
        // chunkFilename: 'js/[name].bundle.js',
        hashSalt: 'dms-webfront',
    },
    resolve: {
        // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            // 替换 react-dom 成 @hot-loader/react-dom 以支持 react hooks 的 hot reload
            'react-dom': '@hot-loader/react-dom',
            '@img': resolve(rootPath, './public/img'),
            '@app': resolve(rootPath, './public/app'),
            // '@server': resolve(rootPath, './server'),
            // '@scripts': resolve(rootPath, './scripts/webpack'),
        },
        modules: ['node_modules', 'public'],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!config', '!config/*', '!server.js'],
        }),
        new WebpackBar({
            name: '[Web] React-Pro-Boilerplate',
            // react 蓝
            color: '#61dafb',
        }),
        new FriendlyErrorsPlugin(),
        // new WebpackBuildNotifierPlugin({ suppressSuccess: true }),
        new HtmlWebpackPlugin({
            // HtmlWebpackPlugin 会调用 HtmlMinifier 对 HTMl 文件进行压缩
            // 只在生产环境压缩
            minify: inDev ? false : htmlMinifyOptions,
            // filename: resolve(__dirname, './public/views/index.html'),
            template: resolve(rootPath, './public/views/index.template.html'),
            templateParameters: (...args: any[]) => {
                const [compilation, assets, assetTags, options] = args;
                // const rawPublicPath = commonConfig.output!.publicPath!;
                return {
                    compilation,
                    webpackConfig: compilation.options,
                    htmlWebpackPlugin: {
                        tags: assetTags,
                        files: assets,
                        options,
                    },
                    // 在 index.html 模板中注入模板参数 PUBLIC_PATH
                    // 移除最后的反斜杠为了让拼接路径更自然，例如：<%= `${PUBLIC_PATH}/favicon.ico` %>
                    // PUBLIC_PATH: rawPublicPath.endsWith('/')
                    //     ? rawPublicPath.slice(0, -1)
                    //     : rawPublicPath,
                };
            },
        }),
        new ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
        new CopyPlugin([
            {
                context: resolve(rootPath, './public/manifest'),
                from: '*',
                to: resolve(rootPath, './dist'),
                toType: 'dir',
            },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: getCssLoaders(0),
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 低于 10 k 转换成 base64
                            limit: 10 * 1024,
                            // 在文件名中插入文件内容 hash，解决强缓存立即更新的问题
                            name: '[name].[contenthash].[ext]',
                            outputPath: 'img',
                        },
                    },
                ],
            },
            {
                test: /\.(svg|ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
};

if (inDev) {
    // 开发环境下注入热更新补丁
    (commonConfig.entry as string[]).unshift(
        `webpack-hot-middleware/client?path=${hmrPath}&reload=true&overlay=true`,
    );
}

export default commonConfig;
