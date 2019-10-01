import { addDecorator, configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';

setOptions({
  name: 'Carbon Charts - React Wrappers',
  showDownPanel: false,
  showAddonPanel: false,
  sortStoriesByKind: true
});

addDecorator(
  withInfo()
);

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
