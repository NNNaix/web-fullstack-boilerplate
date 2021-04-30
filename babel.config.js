const envPreset = [
    '@babel/preset-env',
    {
        // 只导入需要的 polyfill
        useBuiltIns: 'usage',
        // 指定 corjs 版本
        corejs: {
            version: 3,
            proposals: true, // 使用尚在“提议”阶段特性的 polyfill
        },
        modules: false,
    },
    '@babel/typescript',
];

function useNodeConfig() {
    envPreset[1].targets = { node: 'current' };
    envPreset[1].modules = 'auto';
    return {
        presets: [envPreset, '@babel/preset-typescript'],
        plugins: [
            [
                ('import',
                {
                    libraryName: 'lodash',
                    libraryDirectory: '',
                    camel2DashComponentName: false,
                },
                'lodash'),
            ],
            '@babel/plugin-transform-runtime',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            // eq ts-loader set 'emitDecoratorMetadata': true
            'babel-plugin-transform-typescript-metadata',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
    };
}

function useWebConfig() {
    // 禁用模块化方案转换
    envPreset[1].modules = false;
    return {
        presets: ['@babel/preset-typescript', envPreset],
        plugins: [
            [
                'import',
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                },
                'antd',
            ],
            [
                'import',
                {
                    libraryName: 'lodash',
                    libraryDirectory: '',
                    camel2DashComponentName: false,
                },
                'lodash',
            ],
            '@babel/plugin-transform-runtime',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-optional-chaining',
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
        ],
        env: {
            development: {
                presets: [['@babel/preset-react', { development: true }]],
                plugins: ['react-hot-loader/babel'],
            },
            production: {
                presets: ['@babel/preset-react'],
                plugins: [
                    'babel-plugin-dev-expression',
                    '@babel/plugin-transform-react-constant-elements',
                    '@babel/plugin-transform-react-inline-elements',
                ],
            },
        },
    };
}

module.exports = function (api) {
    let target;
    api.caller((caller) => caller && (target = caller.target));

    api.cache(true);

    switch (target) {
        case 'node': {
            return useNodeConfig();
        }
        default: {
            return useWebConfig();
        }
    }
};
