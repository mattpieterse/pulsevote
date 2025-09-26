// eslint.config.js
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: ["node_modules/", "coverage/", "dist/", "build/", ".circleci/", "ssl/"]
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.es2021,
                process: "readonly",
                __dirname: "readonly",
                __filename: "readonly"
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": "off"
        }
    },
    {
        files: ["test/**/*.test.js", "**/__tests__/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.jest
            }
        }
    }
];