import { configure } from "@storybook/html";
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "Carbon Charts - Vanilla",
  showAddonPanel: true,
  sortStoriesByKind: true,
  panelPosition: 'bottom',
  showDownPanel: true
});

// load global styles
require("!style-loader!css-loader!sass-loader!../demo/styles.scss");
// require("!style-loader!css-loader!sass-loader!../src/styles/styles.scss");

const req = require.context("../stories", true, /.stories.ts$/);
function loadStories() {
	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
