module.exports = {
	mode: "development",
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: ["ts-loader"]
			},
			{
				test: /\.html$/,
				loaders: ["html-loader"]
			},
			{
				test: /\.css$/,
				loader: ["raw-loader"]
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
	}
};
