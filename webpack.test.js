var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractText = require("extract-text-webpack-plugin");
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = [{
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loaders: ["angular2-template-loader", "awesome-typescript-loader"]
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
				test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader : 'file-loader'
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