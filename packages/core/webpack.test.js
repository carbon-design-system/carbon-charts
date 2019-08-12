module.exports = env => {
	return {
		mode: "development",
		devtool: "source-map",
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
		}
	};
};
