const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
	const plugins = [];
	if (env && env.bundleAnalyzer) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return {
		mode: "production",
		devtool: "source-map",
		entry: "./src/index.ts",
		output: {
			path: __dirname + "/dist",
			filename: "index.umd.js",
			chunkFilename: "[name].chunk.js",
			libraryTarget: "umd",
			library: "Charts"
		},
		optimization: {
			minimize: true
		},
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
		plugins
	};
};
