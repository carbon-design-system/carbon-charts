import { configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

withOptions({
	theme: {
		brandTitle: 'Carbon Charts - React Wrappers'
	},
	panelPosition: 'bottom',
	sortStoriesByKind: true
});

// load global styles
require("!style-loader!css-loader!sass-loader!./previews.scss");
require("!style-loader!css-loader!@carbon/charts/dist/styles.css");

const req = require.context("../stories/", true, /.stories.js$/);
function loadStories() {

	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
