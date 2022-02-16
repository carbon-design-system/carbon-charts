import { configure } from '@storybook/angular';
import { setOptions } from '@storybook/addon-options';
import theme from './theme';

setOptions({
	name: 'Carbon Charts - Angular',
	showAddonPanel: true,
	sortStoriesByKind: true,
	panelPosition: 'bottom',
	showDownPanel: true,
	theme,
});

// load global styles
require('!style-loader!css-loader!@carbon/charts/demo/styles.css');

const req = require.context('../stories', true, /.stories.ts$/);
function loadStories() {
	req.keys().forEach((filename) => {
		req(filename);
	});
}

configure(loadStories, module);
