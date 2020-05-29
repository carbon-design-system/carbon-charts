import { configure } from '@storybook/vue';
import { withOptions } from '@storybook/addon-options';

withOptions({
	name: 'Carbon Charts - Vue Wrappers',
	sortStoriesByKind: true,
	showDownPanel: true,
	showAddonPanel: true,
	panelPosition: 'bottom',
});

// load global styles
require('!style-loader!css-loader!@carbon/charts/demo/styles.css');

const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
