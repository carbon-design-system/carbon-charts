import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'Sterling Charts - React Wrappers',
  showDownPanel: false,
  showAddonPanel: false,
  sortStoriesByKind: true
});

// load global styles
require("!style-loader!css-loader!sass-loader!./previews.scss");
require("!style-loader!css-loader!@ibm-sterling/charts/dist/styles.css");

const req = require.context("../stories/", true, /.stories.js$/);
function loadStories() {

	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
