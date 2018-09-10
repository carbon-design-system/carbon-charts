const webpack = require("webpack");
const ExtractText = require("extract-text-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [{
	mode: "production",
	devtool: "source-map",
	entry: {
		charts: [
			"babel-polyfill",
			"./src/index.ts"
		]
	},
	output: {
		path: __dirname + '/dist',
		filename: "bundle.js",
		libraryTarget: "umd",
    library: "Charts"
	},
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all'
	// 	}
	// },
	module: {
		rules: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{ test: /\.ts$/, loader: "ts-loader" },
			{ test: /\.html?$/, loader: "html-loader" },
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},
			{
				test: /\.svg?$/,
				loader: "raw-loader"
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js", ".json"]
	},
	plugins: [
		new BundleAnalyzerPlugin()
	],
}];
