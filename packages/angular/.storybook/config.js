import { configure } from "@storybook/angular";
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "Carbon Charts - Angular Wrappers",
  showAddonPanel: false,
  sortStoriesByKind: true
});

// load global styles
require("!style-loader!css-loader!sass-loader!./previews.scss");
require("!style-loader!css-loader!@carbon/charts/dist/styles.css");

const req = require.context("../stories", true, /.stories.ts$/);
function loadStories() {

	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
