import { configure } from "@storybook/html";
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "Carbon Charts - Vanilla",
  showAddonPanel: true,
  sortStoriesByKind: true,
  panelPosition: 'bottom',
  showDownPanel: true
});

const req = require.context("../stories", true, /.stories.ts$/);
function loadStories() {
	req.keys().forEach(filename => {
		req(filename);
	});
}

configure(loadStories, module);
