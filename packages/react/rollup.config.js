import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: './dist/index.js',
	output: {
		file: './dist/bundle.js',
		format: 'umd',
		name: 'ChartsReact',
		globals: {
			'@carbon/charts': 'Charts',
			react: 'React',
		},
	},
	plugins: [terser(), resolve(), commonjs()],
	external: ['react', 'react-dom', '@carbon/charts'],
};
