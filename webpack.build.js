var webpack = require("webpack");
var ExtractText = require("extract-text-webpack-plugin");
var nodeExternals = require('webpack-node-externals');
var path = require('path');


function rxjsExternal(context, request, cb) {
    if (/^rxjs\/add\/observable\//.test(request)) {
      return cb(null, {root: ['Rx', 'Observable'], commonjs: request, commonjs2: request, amd: request});
    } else if (/^rxjs\/add\/operator\//.test(request)) {
      return cb(null, {root: ['Rx', 'Observable', 'prototype'], commonjs: request, commonjs2: request, amd: request});
    } else if (/^rxjs\//.test(request)) {
      return cb(null, {root: ['Rx'], commonjs: request, commonjs2: request, amd: request});
    }
    cb();
}

module.exports = [{
	devtool: "source-map",
	entry: {
		charts: "./src/charts/index.ts",
	},
	output: {
		path: __dirname + '/dist/bundle',
		filename: "bundle.js",
		libraryTarget: "umd",
    library: "Charts"
	},
	module: {
		loaders: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{ test: /\.tsx?$/, loader: "ts-loader" },
			{ test: /\.html?$/, loader: "html-loader" },
			{
				test: /\.scss$/,
				loaders: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js", ".json"]
	},
	plugins: [],
}];
