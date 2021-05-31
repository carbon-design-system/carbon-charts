import { configure } from "@storybook/angular";
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "Carbon Charts - Angular",
  showAddonPanel: true,
  sortStoriesByKind: true,
  panelPosition: 'bottom',
  showDownPanel: true
});

// load global styles
require('!style-loader!css-loader!sass-loader!../../core/src/styles/styles-white.scss');

const req = require.context('../', true, /.stories.ts$/);
function loadStories() {
	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
