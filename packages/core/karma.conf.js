module.exports = function (config) {
	config.set({
		plugins: ['karma-webpack', 'karma-jasmine', 'karma-chrome-launcher'],
		browsers: ['ChromeHeadless'],
		frameworks: ['jasmine'],
		files: [{
			pattern: '**/*.spec.ts',
			watched: false
		}],
		preprocessors: {
			'**/*.spec.ts': ['webpack']
		},
		browserConsoleLogOptions: {
			terminal: true,
			level: "debug"
		},
		reporters: ['dots'],
		port: 9876,
		logLevel: config.LOG_INFO,
		colors: true,
		mime: {
			'text/x-typescript': [
				'ts'
			]
		},
		webpack: require('./webpack.test'),
		webpackMiddleware: {
			stats: 'errors-only'
		},
		webpackServer: {
			noInfo: true
		}
	});
};
