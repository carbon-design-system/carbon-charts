import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from "rollup-plugin-terser";
import sass from 'rollup-plugin-sass';

const outputDir = process.env.ENV === "demo" ? "./demo/dist" : "./dist"
export default {
	input: 'src/index.ts',
	output: [
		{
			file: `${outputDir}/${pkg.main}`,
			format: 'es'
		},
		{
			file: `${outputDir}/${pkg.module}`,
			format: 'cjs'
		},
		{
			file: `${outputDir}/${pkg.browser}`,
			format: 'iife',
			name: 'Charts'
		}
	],
	external: [
		...Object.keys(pkg.dependencies || {})
	],
	plugins: [
		typescript({
			typescript: require('typescript'),
		}),
		terser(),
		// CSS plugins
		sass({
			// Write all styles to the bundle destination where .js is replaced by .css
			output: true,
			// Filename to write all styles
			output: `${outputDir}/styles.css`
		})
	]
};
