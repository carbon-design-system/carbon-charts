import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import domToImage from 'dom-to-image-more/src/dom-to-image-more.js';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    name: 'Charts',
    globals: {
      'd3-scale': 'd3Scale',
      'd3-selection': 'd3Selection',
      'd3-transition': 'd3Transition',
      'd3-shape': 'd3Shape',
      'd3-color': 'd3Color',
      'd3-interpolate': 'd3Interpolate',
      'd3-axis': 'd3Axis',
      'd3-array': 'd3Array',
      'd3-hierarchy': 'd3Hierarchy',
      'd3-time-format': 'd3TimeFormat',
    },
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve(),
    commonjs(),
    json(),
    typescript({
      typescript: require('typescript'),
      tsconfig: './src/tsconfig.json',
    }),
    {
      resolveId(source) {
        if (source === 'dom-to-image-more') {
          return domToImage;
        }
      },
    },
    terser(),
  ]
};
