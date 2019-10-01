import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const outputDir = "./dist";
export default {
	input: "src/index.ts",
	output: [
		{
			file: `${outputDir}/index.js`,
			format: "esm"
		},
		{
			file: `${outputDir}/index.umd.js`,
			format: "umd",
			name: "Charts"
		},
		{
			file: `${outputDir}/index.iife.js`,
			format: "iife",
			name: "Charts"
		}
	],
	external: [
		...Object.keys(pkg.dependencies || {})
	],
	plugins: [
		typescript({
			typescript: require("typescript"),
		}),
		terser()
	]
};
