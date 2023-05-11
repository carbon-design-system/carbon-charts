/* eslint-env node */
module.exports = {
	chainWebpack: (config) => config.resolve.symlinks(false)
}
