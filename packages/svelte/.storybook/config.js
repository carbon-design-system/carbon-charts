import { configure } from "@storybook/svelte";
import { withOptions } from "@storybook/addon-options";

withOptions({
	name: "Carbon Charts - Svelte Wrappers",
	panelPosition: "bottom",
	showDownPanel: true,
	showAddonPanel: true,
	sortStoriesByKind: true
});

// load global styles
require("!style-loader!css-loader!@carbon/charts/demo/styles.css");

const req = require.context("../stories/", true, /.stories.js$/);
function loadStories() {
	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
