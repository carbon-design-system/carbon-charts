module.exports = {
  staticDirs: ['./assets'],
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/angular',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        extensions: ['.js', '.json', '.ts'],
      },
    };
  },
};
