import { configure } from "@storybook/angular";
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "Carbon Charts - Angular Wrappers",
  showAddonPanel: true,
  sortStoriesByKind: true,
  panelPosition: 'bottom',
  showDownPanel: true
});

// load global styles
require("!style-loader!css-loader!@carbon/charts/demo/styles.css");

const req = require.context("../stories", true, /.stories.ts$/);
function loadStories() {
	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
