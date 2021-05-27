import { configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

withOptions({
	name: 'Carbon Charts - React',
	panelPosition: 'bottom',
	showDownPanel: true,
	showAddonPanel: true,
	sortStoriesByKind: true,
});

// load global styles
// require('!style-loader!css-loader!@carbon/charts/demo/styles.css');
// Temporary override for local style testing
require('!style-loader!css-loader!sass-loader!../../core/src/styles/styles-g10.scss');

const req = require.context('../', true, /.stories.js$/);
function loadStories() {
	req.keys().forEach((filename) => {
		req(filename);
	});
}

configure(loadStories, module);
