import { storiesOf } from "@storybook/html";
import { withKnobs, object } from "@storybook/addon-knobs";
import { demoGroups } from "../demo/demo-data";
import * as ChartComponents from "../src/charts";

// Loop through all demo groups
demoGroups.forEach(demoGroup => {
	// Create story group for each demo group
	const groupStories = storiesOf(demoGroup.title, module).addDecorator(withKnobs);

	demoGroup.demos.forEach(demo => {
		const ClassToInitialize = ChartComponents[demo.chartType.vanilla];

		// Loop through the demos for the group
		groupStories.add(demo.title, () => {
			const container = document.createElement("div");
			container.setAttribute("class", "container");

			const h3 = document.createElement("h3");
			const b1 = document.createElement("b");
			b1.innerHTML = "Component:";
			const span = document.createElement("span");
			span.setAttribute("class", "bx--tag bx--tag--green component-name");
			span.innerHTML = demo.chartType.vanilla;
			h3.appendChild(b1);
			h3.appendChild(span);
			container.appendChild(h3);

			const p = document.createElement("p");
			p.setAttribute("class", "props");
			const b2 = document.createElement("b");
			b2.innerHTML = "Props: ";
			const dataSpan = document.createElement("span");
			dataSpan.innerHTML = "data, ";
			const spanProp = document.createElement("span");
			spanProp.appendChild(b2);
			spanProp.appendChild(dataSpan);
			const a = document.createElement("a");
			a.setAttribute("href", "https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html");
			a.setAttribute("target", "_blank");
			a.innerHTML = "options";
			p.appendChild(a);
			spanProp.appendChild(a);
			p.appendChild(spanProp);
			container.appendChild(p);

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

			const codeSampleH3 = document.createElement("h3");
			codeSampleH3.setAttribute("class", "marginTop-30");
			codeSampleH3.innerHTML = "Code Sample (React)";
			container.appendChild(codeSampleH3);
			const codesandboxA = document.createElement("a");
			codesandboxA.setAttribute("href", demo.codesandbox.react);
			codesandboxA.setAttribute("target", "_blank");
			const img = document.createElement("img");
			img.setAttribute("class", "marginTop");
			img.setAttribute("src", "https://codesandbox.io/static/img/play-codesandbox.svg");
			codesandboxA.appendChild(img);
			container.appendChild(codeSampleH3);
			container.appendChild(codesandboxA);

			return container;
		}
		);
	});
});
