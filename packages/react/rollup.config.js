import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

module.exports = {
    input: "./src/index.js",
    output: {
        file: "./dist/bundle.js",
        format: "cjs" 
    },
    plugins: [
        babel({
            exclude: "node_modules/**",
            plugins: ["external-helpers"]
        }),
        commonjs()
    ],
};