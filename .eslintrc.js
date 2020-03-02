module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
        ecmaFeatures: {
            tsx: true
        }
    },
    extends: ["eslint:recommended",
        "plugin:react/recommended",
        "prettier"],
    plugins: ["react",
        "brackets",
        "@typescript-eslint",
        "prettier",
        "react-hooks",
        "cypress",
        "no-only-tests"],
    settings: {
        "import/resolver": {
            "node": {
                "paths": ["./src"],
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        },
        "react": {
            "version": "16.13.0"
        }
    },
    rules: {
        'no-case-declarations': 'error',
        'no-duplicate-imports': 'error',
        'no-console': 'error',
        'no-alert': 'error',
        'new-cap': 'error',
        'prefer-template': 'error',
        'no-shadow': 'error',
        'no-underscore-dangle': 'error',
        'prefer-rest-params': 'error',
        'consistent-return': 'error',
        camelcase: 'error',
        'object-shorthand': 'error',
        'no-param-reassign': ['error', { props: true }],
        'react/no-unused-prop-types': 'error',
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    exceptions: ['-', '+'],
                },
                block: {
                    exceptions: ['*'],
                    balanced: true,
                },
            },
        ],
    },
}
