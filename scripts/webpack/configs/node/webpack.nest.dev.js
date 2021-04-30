const { resolve } = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = function (options, webpack) {
    return {
        ...options,
        devtool: 'cheap-module-source-map',
        output: {
            filename: 'server.js',
            path: resolve(process.cwd(), 'dist'),
        },
        entry: ['webpack/hot/poll?1000', options.entry],
        externals: [
            nodeExternals({
                allowlist: ['webpack/hot/poll?1000'],
            }),
        ],
        plugins: [
            ...options.plugins,
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['/*.hot-update.*'],
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/],
            }),
            new RunScriptWebpackPlugin({ name: 'server.js' }),
        ],
    };
};
