import { storiesOf } from "@storybook/html";
import { withKnobs, object } from "@storybook/addon-knobs";
import { storybookDemoGroups } from "../demo/demo-data";
import * as ChartComponents from "../src/charts";

// Loop through all demo groups
storybookDemoGroups.forEach(demoGroup => {
	// Create story group for each demo group
	const groupStories = storiesOf(demoGroup.title, module).addDecorator(withKnobs);

	demoGroup.demos.forEach(demo => {
		const ClassToInitialize = ChartComponents[demo.chartType.vanilla];

		// Loop through the demos for the group
		groupStories.add(demo.title, () => {
			// container creation
			const container = document.createElement("div");
			container.setAttribute("class", "container");

			// title
			const titleH3 = document.createElement("h3");
			const titleB = document.createElement("b");
			titleB.innerHTML = "Component:";
			const span = document.createElement("span");
			span.setAttribute("class", "bx--tag bx--tag--green component-name");
			span.innerHTML = demo.chartType.vanilla;
			titleH3.appendChild(titleB);
			titleH3.appendChild(span);
			container.appendChild(titleH3);

			// props subtitle
			const propsP = document.createElement("p");
			propsP.setAttribute("class", "props");
			const propsB = document.createElement("b");
			propsB.innerHTML = "Props: ";
			const dataSpan = document.createElement("span");
			dataSpan.innerHTML = "data, ";
			const spanProp = document.createElement("span");
			spanProp.appendChild(propsB);
			spanProp.appendChild(dataSpan);
			const propsA = document.createElement("a");
			propsA.setAttribute("href", "https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html");
			propsA.setAttribute("target", "_blank");
			propsA.innerHTML = "options";
			propsP.appendChild(propsA);
			spanProp.appendChild(propsA);
			propsP.appendChild(spanProp);
			container.appendChild(propsP);

			// chart area
			const marginTopDiv = document.createElement("div");
			marginTopDiv.setAttribute("class", "marginTop-30");
			const titleDiv = document.createElement("div");
			titleDiv.setAttribute("id", demo.title);
			const chart = new ClassToInitialize(titleDiv, {
				data: object("Data", demo.data),
				options: object("Options", demo.options),
			});
			marginTopDiv.appendChild(titleDiv);
			container.appendChild(marginTopDiv);

			// sandbox button area
			const codeSampleH3 = document.createElement("h3");
			codeSampleH3.setAttribute("class", "marginTop-30");
			codeSampleH3.innerHTML = "Code Sample";
			container.appendChild(codeSampleH3);
			const codesandboxA = document.createElement("a");
			codesandboxA.setAttribute("href", demo.codesandbox.vanilla);
			codesandboxA.setAttribute("target", "_blank");
			const sandboxButtonImg = document.createElement("img");
			sandboxButtonImg.setAttribute("class", "marginTop");
			sandboxButtonImg.setAttribute("src", "https://codesandbox.io/static/img/play-codesandbox.svg");
			codesandboxA.appendChild(sandboxButtonImg);
			container.appendChild(codeSampleH3);
			container.appendChild(codesandboxA);

			return container;
		});
	});
});
