module.exports = function (options, webpack) {
    return {
        ...options,
        devtool: 'cheap-module-source-map',
        plugins: [
            ...options.plugins,
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/],
            }),
        ],
        output: {
            filename: 'server.js',
        },
    };
};
