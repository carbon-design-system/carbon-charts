import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import svelte from "rollup-plugin-svelte";

export default [
	{
		input: "./src/index.js",
		output: {
			file: "./dist/bundle.js",
			format: "umd",
			name: "ChartsSvelte",
			globals: {
				"@carbon/charts": "Charts"
			}
		},
		plugins: [
			svelte(),
			resolve(),
			terser()
		],
		external: ["svelte", "@carbon/charts"]
	},
	{
		input: "./src/index.js",
		output: {
			file: "./dist/index.js",
			format: "es"
		},
		plugins: [
			svelte(),
			resolve()
		],
		external: ["svelte", "@carbon/charts"]
	}
];
