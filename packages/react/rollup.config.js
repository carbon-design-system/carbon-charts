import babel from "rollup-plugin-babel";

module.exports = {
    input: "./src/index.js",
    output: {
        file: "./dist/bundle/bundle.js",
		format: "umd",
		globals: "charts"
    },
    plugins: [
        babel({
            exclude: "node_modules/**",
            plugins: ["external-helpers"]
        })
	],
	external: ["react", "react-dom"]
};
