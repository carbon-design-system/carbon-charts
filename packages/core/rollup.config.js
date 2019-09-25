import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

const outputDir = "./dist";
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
		terser()
	]
};
