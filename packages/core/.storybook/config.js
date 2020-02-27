import { configure } from "@storybook/html";
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "Carbon Charts - HTML Wrappers",
  showAddonPanel: true,
  sortStoriesByKind: true,
  panelPosition: 'bottom',
  showDownPanel: true
});

// load global styles
require("!style-loader!css-loader!sass-loader!./previews.scss");
// require("!style-loader!css-loader!sass-loader!../src/styles/styles.scss");

const req = require.context("../stories", true, /.stories.ts$/);
function loadStories() {
	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
