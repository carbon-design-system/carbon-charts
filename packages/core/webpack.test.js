var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractText = require("extract-text-webpack-plugin");
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = [{
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: "ts-loader"
			},
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			{
				test: /\.css$/,
				loader: "raw-loader"
			},
			{
				test: /\.scss$/,
				loaders: ["raw-loader", "sass-loader"]
			},
			{
				test   : /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader : 'file-loader'
			},
			{
				test: /\.svg?$/,
				loader: 'raw-loader'
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js", ".json"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './demo/index.html'
		})
	],
}];
