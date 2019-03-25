const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	devtool: "sourcemap",
	entry: "./demo/index.ts",
	output: {
		path: __dirname + "/demo/bundle",
		filename: "index.js",
		chunkFilename: "[name].chunk.js",
		libraryTarget: "umd",
    	library: "Charts"
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	resolve: {
		// Add '.ts' and '.tsx' as a resolvable extension.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{ test: /\.ts$/, loader: "ts-loader?configFile=tsconfig-demo.json" },
			{ test: /\.html?$/, loader: "html-loader" },
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(jpg|png|gif|eot|ttf|woff|woff2)$/,
				loader: 'url-loader'
			},
			{
				test: /\.svg?$/,
				loader: 'raw-loader'
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "bundle.css"
		}),
		new HtmlWebpackPlugin({
			template: './demo/index.html'
		}),
		new CopyWebpackPlugin([
            { from: 'demo/assets' }
    	])
	],
	devServer: {
		contentBase: "./demo",
		host: "0.0.0.0",
		port: 9001,
		historyApiFallback: true,
		disableHostCheck: true
	}
};
