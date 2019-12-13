module.exports = ({ config }) => {
	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		use: [
			{
				loader: "ts-loader?configFile=../../../core/tsconfig-demo.json"
			}
		]
	});
	config.resolve.extensions.push(".ts");

	config.module.rules.push({
		test: /\.stories\.jsx?$/,
		loaders: [require.resolve('@storybook/source-loader')],
		enforce: 'pre'
	});

	return config;
};
