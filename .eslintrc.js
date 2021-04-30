const { resolve } = require;

const OFF = 0;
const ERROR = 2;

module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:eslint-comments/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:unicorn/recommended',
        'plugin:promise/recommended',
        'prettier',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                // import 模块时，不写后缀将尝试导入的后缀，出现频率高的文件类型放前面
                extensions: ['.tsx', '.ts', '.js', '.json', 'scss'],
            },
            typescript: {
                project: [
                    resolve('./tsconfig.base.json'),
                    resolve('./client/app/tsconfig.json'),
                    resolve('./scripts/tsconfig.json'),
                    resolve('./server/tsconfig.json'),
                ],
            },
        },
    },
    plugins: ['react', '@typescript-eslint', 'unicorn', 'promise'],
    rules: {
        'eslint-comments/disable-enable-pair': [ERROR, { allowWholeFile: true }],
        'import/extensions': [
            ERROR,
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                // json: 'never',
                js: 'never',
            },
        ],
        'import/prefer-default-export': OFF,
        'unicorn/prevent-abbreviations': OFF,
        'unicorn/filename-case': [
            ERROR,
            {
                cases: {
                    // 中划线
                    kebabCase: true,
                    // 小驼峰
                    camelCase: true,
                    // 下划线
                    snakeCase: true,
                    // 大驼峰
                    pascalCase: true,
                },
            },
        ],
        'unicorn/no-process-exit': OFF,
        'unicorn/explicit-length-check': OFF,

        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/no-useless-constructor': ERROR,
        '@typescript-eslint/camelcase': OFF,
        '@typescript-eslint/no-use-before-define': [ERROR],
        '@typescript-eslint/no-shadow': [ERROR],

        'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx'] }],
        'react/jsx-indent-props': [ERROR, 4],
        'react/jsx-indent': [ERROR, 4],
        'react/state-in-constructor': OFF,
        'react/jsx-props-no-spreading': OFF,
        'react/prop-types': OFF,
        'react/require-default-props': OFF,

        'promise/always-return': OFF,

        'func-names': OFF,
        'lines-between-class-members': OFF,
        'max-classes-per-file': OFF,
        'class-methods-use-this': OFF,
        'no-console': OFF,
        'no-empty': OFF,
        'no-param-reassign': OFF,
        'no-plusplus': OFF,
        'no-underscore-dangle': OFF,
        'no-unused-expressions': OFF,
        'no-useless-constructor': OFF,
        'no-bitwise': OFF,
        'consistent-return': OFF,
        'no-unsafe-finally': OFF,
        'no-restricted-syntax': OFF,
        'no-use-before-define': OFF,
        'no-return-assign': OFF,
        'no-shadow': OFF,
    },
    overrides: [
        {
            files: ['**/*.d.ts'],
            rules: {
                'import/no-duplicates': OFF,
            },
        },
        {
            files: [
                'scripts/**/*.*s',
                'Gulpfile.ts',
                '**/test/**/*.ts',
                '**/*.test.js',
                '**/*.spec.js',
            ],
            rules: {
                'import/no-extraneous-dependencies': OFF,
            },
        },
        {
            files: ['scripts/**/*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': OFF,
            },
        },
        {
            files: ['server/**/*.ts', 'scripts/**/*.ts'],
            rules: {
                'react-hooks/rules-of-hooks': OFF,
            },
        },
    ],
};
