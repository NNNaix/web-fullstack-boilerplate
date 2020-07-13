const { resolve } = require;

const OFF = 0;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
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
        'prettier/react',
        'prettier/@typescript-eslint',
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
                directory: [
                    resolve('./tsconfig.base.json'),
                    resolve('./public/app/tsconfig.json'),
                    resolve('./scripts/webpack/tsconfig.json'),
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

        'unicorn/prevent-abbreviations': OFF,
        'unicorn/filename-case': [
            ERROR,
            {
                cases: {
                    // 中划线
                    kebabCase: false,
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

        'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx'] }],
        'react/jsx-indent-props': [ERROR, 4],
        'react/jsx-indent': [ERROR, 4],
        'react/state-in-constructor': OFF,
        'react/jsx-props-no-spreading': OFF,
        'react/prop-types': OFF,

        'func-names': OFF,
        'lines-between-class-members': OFF,
        'max-classes-per-file': OFF,
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
    },
    overrides: [
        {
            files: ['**/*.d.ts'],
            rules: {
                'import/no-duplicates': OFF,
            },
        },
        {
            files: ['scripts/**/*.ts', 'Gulpfile.ts'],
            rules: {
                'import/no-extraneous-dependencies': OFF,
            },
        },
        {
            files: ['server/**/*.ts'],
            rules: {
                'react-hooks/rules-of-hooks': OFF,
            },
        },
    ],
};
