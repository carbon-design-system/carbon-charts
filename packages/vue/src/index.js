const ctx = require.context(
	'./',
	true,
	/^(?!.*(?:\/_|-story\.vue|-test\.vue)).*\.vue$/
);
const components = ctx.keys().map(ctx);

export default {
	// options is an array of components to be registered
	// e.g. ['c-button', 'c-modal']
	install(Vue, options) {
		if (typeof options === 'undefined') {
			for (let c of components) {
				Vue.component(c.default.name, c.default);
			}
		} else {
			if (!(options instanceof Array)) {
				throw new TypeError('options must be an array');
			}

			for (let c of components) {
				// register only components specified in the options
				if (options.includes(c.default.name)) {
					Vue.component(c.default.name, c.default);
				}
			}
		}
	},
};
