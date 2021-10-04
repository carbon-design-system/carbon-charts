import { configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import theme from './theme';

withOptions({
	name: 'Carbon Charts - React',
	panelPosition: 'bottom',
	showDownPanel: true,
	showAddonPanel: true,
	sortStoriesByKind: true,
	theme,
});

// load global styles
require('!style-loader!css-loader!@carbon/charts/demo/styles.css');

const req = require.context('../', true, /.stories.js$/);
function loadStories() {
	req.keys().forEach((filename) => {
		req(filename);
	});
}

configure(loadStories, module);
