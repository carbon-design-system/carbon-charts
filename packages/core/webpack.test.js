var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractText = require("extract-text-webpack-plugin");
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = [{
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: ["ts-loader", "@peretz/icon-loader"]
			},
			{
				test: /\.html$/,
				loaders: ["html-loader", "@peretz/icon-loader"]
			},
			{
				test: /\.css$/,
				loader: ["raw-loader", "@peretz/icon-loader"]
			},
			{
				test: /\.scss$/,
				loaders: ["raw-loader", "sass-loader", "@peretz/icon-loader"]
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
