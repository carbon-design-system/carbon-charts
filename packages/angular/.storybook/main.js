module.exports = {
  stories: ['../stories/**/*.stories.ts'],
  logLevel: 'debug',
  core: {
    builder: 'webpack4',
  },
  angularOptions: {
    enableIvy: true,
  },
};
