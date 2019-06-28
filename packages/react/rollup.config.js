import babel from "rollup-plugin-babel";

module.exports = {
	input: "./src/index.js",
	output: {
		name: "chartsReact",
		file: "./dist/bundle/bundle.js",
		format: "umd",
		globals: {
			"react": "React",
			"@carbon/charts": "charts"
		}
	},
	plugins: [
		babel({
			exclude: "node_modules/**",
			plugins: ["external-helpers"]
		})
	],
	external: ["react", "react-dom", "@carbon/charts"]
};
