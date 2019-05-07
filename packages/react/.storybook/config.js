import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'Carbon Charts - React Wrappers',
  showDownPanel: false,
  showAddonPanel: false
});

// load global styles
require("!style-loader!css-loader!sass-loader!./previews.scss");

const req = require.context("../stories/", true, /.stories.js$/);
function loadStories() {

	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
