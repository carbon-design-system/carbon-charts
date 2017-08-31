module.exports = function (config) {
  config.set({
    plugins: ['karma-webpack', 'karma-jasmine', 'karma-phantomjs-launcher'],
    autoWatch: false,
    browsers: ['PhantomJS'],
    files: [{
      pattern: './karma-test-shim.js',
      watched: false
    }],
    frameworks: ['jasmine'],
    phantomJsLauncher: {
      exitOnResourceError: true
    },
    preprocessors: {
      './karma-test-shim.js': ['webpack']
    },
		browserConsoleLogOptions: {
				terminal: true,
				level: ""
		},
		browserConsoleLogOptions: {
				terminal: true,
				level: ""
		},
    reporters: ['dots'],
    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    singleRun: true,
    webpack: require('./webpack.test'),
    webpackMiddleware: {
      stats: 'errors-only'
    },
    webpackServer: {
      noInfo: true
    }
  });
};
