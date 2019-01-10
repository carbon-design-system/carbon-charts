module.exports = function(config) {
    config.set({
        baseUrl: ".",
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" },
            { pattern: "demo/**/*.ts" }
        ],
        preprocessors: {
            "**/*.ts": ["webpack", "karma-typescript"]
        },
        webpack: require("./webpack.test"),
        reporters: ["dots", "karma-typescript"],
        browsers: ["ChromeHeadless"],
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json",
            coverageOptions: {
                exclude: [/\.(d|test)\.ts$/i, /.*node_modules.*/, /demo/]
            },
        }
    });
};
