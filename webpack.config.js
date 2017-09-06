var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./demo/index.ts",
	output: {
		path: __dirname + '/demo/bundle',
		filename: "bundle.js",
		libraryTarget: "var",
    library: "Charts"
	},
	resolve: {
		// Add '.ts' and '.tsx' as a resolvable extension.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	module: {
		loaders: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{ test: /\.tsx?$/, loader: "ts-loader" },
			{ test: /\.html?$/, loader: "html-loader" },
			{
				test: /\.s?css$/,
				loaders: [
					"style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
         ]
			},
			{
	      test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
	      loader: 'url-loader'
	    }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './demo/index.html'
		})
	],
	devServer: {
		contentBase: "./demo",
		host: "0.0.0.0",
		port: 9001,
		historyApiFallback: true,
		disableHostCheck: true
	}
}
