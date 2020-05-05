import { storiesOf } from "@storybook/html";

import "../demo/styles.scss";

// import tutorial MD strings
import {
	tabularTutorial,
	reactTutorial,
	angularTutorial,
	vanillaTutorial,
	vueTutorial,
	baseChartOptions,
	axisChartOptions
} from "./tutorials/index";

// Syntax highlighting
const hljs = require("highlight.js/lib/highlight.js");
hljs.registerLanguage("js", require("highlight.js/lib/languages/javascript"));
hljs.registerLanguage("bash", require("highlight.js/lib/languages/bash"));
hljs.registerLanguage("typescript", require("highlight.js/lib/languages/typescript"));

const gettingStartedStories = storiesOf("Tutorials/Getting Started", module);
const optionsStories = storiesOf("Tutorials/Options", module);
const tutorialStories = storiesOf("Tutorials", module);

// add vanilla getting started tutorials
gettingStartedStories.add("VanillaJS", () => {
	// container creation
	const container = document.createElement("div");
	container.setAttribute("class", "container tutorial");

	container.innerHTML = vanillaTutorial;

	container.querySelectorAll("pre code").forEach((block) => {
		hljs.highlightBlock(block);
	});

	return container;
});

// add angular getting started tutorials
gettingStartedStories.add("Angular", () => {
	// container creation
	const container = document.createElement("div");
	container.setAttribute("class", "container tutorial");

	container.innerHTML = angularTutorial;

	container.querySelectorAll("pre code").forEach((block) => {
		hljs.highlightBlock(block);
	});

	return container;
});

// add react getting started tutorials
gettingStartedStories.add("React", () => {
	// container creation
	const container = document.createElement("div");
	container.setAttribute("class", "container tutorial");

	container.innerHTML = reactTutorial;

	container.querySelectorAll("pre code").forEach((block) => {
		hljs.highlightBlock(block);
	});

	return container;
});

// add vue getting started tutorials
gettingStartedStories.add("Vue", () => {
	// container creation
	const container = document.createElement("div");
	container.setAttribute("class", "container tutorial");

	container.innerHTML = vueTutorial;

	container.querySelectorAll("pre code").forEach((block) => {
		hljs.highlightBlock(block);
	});

	return container;
});


// Add the tutorial(s) after getting started
tutorialStories.add("Tabular data format", () => {
	// container creation
	const container = document.createElement("div");
	container.setAttribute("class", "container tutorial");

	container.innerHTML = tabularTutorial;

	container.querySelectorAll("pre code").forEach((block) => {
		hljs.highlightBlock(block);
	});

	return container;
});

//  Stories for options for diff charts
optionsStories.add("Base Chart Options", () => {
	// container creation
	const container = document.createElement("div");
	container.setAttribute("class", "container tutorial");

	container.innerHTML = baseChartOptions;

	container.querySelectorAll("pre code").forEach((block) => {
		hljs.highlightBlock(block);
	});

	return container;

});


//  Stories for options for diff charts
optionsStories.add("Axis Chart Options", () => {
	// container creation
	const container = document.createElement("div");
	container.setAttribute("class", "container tutorial");

	container.innerHTML = axisChartOptions;

	container.querySelectorAll("pre code").forEach((block) => {
		hljs.highlightBlock(block);
	});

	return container;

});
