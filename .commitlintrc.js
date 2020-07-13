// We have referenced angular commit
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            // 比默认值多了个 deps，用于表示依赖升级，降级，新增等提交
            [
                'build', // Changes to the build process
                'chore', //⛏️ Changes to the auxiliary tools and libraries such as documentation generation
                'deps', // Changes of dependencies(⬆️ upgrade, ⬇️ downgrade, 📦 add, 🗑 remove, etc)
                'release', // 🚀 Changes of version bump for releasing
                'docs', // 📝 Documentation only changes
                'feat', // ✨ a new feature
                'fix', // 🐛 a bug fix, 🚑 a hotfix, ✏️ a typo
                'perf', // ⚡️ A code change that improves performance
                'refactor', // ♻️ A code change that neither fixes a bug nor adds a feature,🔍 Improving SEO
                'revert', // ⏪ Change reverts a previous commit
                'style', // 🎨 Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
                'test', // ✅ Adding missing or correcting existing tests
            ],
        ],
    },
};
