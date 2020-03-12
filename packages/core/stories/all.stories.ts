import { storiesOf } from "@storybook/html";
import { withKnobs, object } from "@storybook/addon-knobs";

import { storybookDemoGroups } from "../demo/data";
import * as ChartComponents from "../src/charts";
import * as storyUtils from "./utils";

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
			container.setAttribute("class", "container theme--white");

			container.innerHTML = `
<h3>
	<b class="component">Component:</b>
	<span class="bx--tag bx--tag--green component-name">${demo.chartType.vanilla}</span>
</h3>
<p class="props">
	<span><b>Props: </b><span>data, </span><a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></span>
</p>

${storyUtils.generateThemePickerHTML()}

<div class="marginTop-30" id="chart-demo">
</div>

<h3 class="marginTop-30">Code Sample</h3>
<a href="${demo.codesandbox.vanilla}" target="_blank">
	<img class="marginTop" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>
			`;

			storyUtils.addRadioButtonEventListeners(container);

			// Initialize chart
			const chart = new ClassToInitialize(container.querySelector("div#chart-demo"), {
				data: object("Data", demo.data),
				options: object("Options", demo.options),
			});

			return container;
		});
	});
});

// DEV ONLY STORIES
if (process.env.NODE_ENV !== "production") {
	const devStoreis = storiesOf("__DEV__", module).addDecorator(withKnobs);

	// Loop through the demos for the group
	devStoreis.add("All chart types", () => {
		// container creation
		const container = document.createElement("div");
		container.setAttribute("class", "container theme--white");

		container.innerHTML = `
	<h3>
		<b class="component">Collection of all demos</b>
	</h3>

	${storyUtils.generateThemePickerHTML()}
`;

		storyUtils.addRadioButtonEventListeners(container);

		const getNewRow = () => {
			const row = document.createElement("div");
			row.className = "bx--row";

			return row;
		};

		const grid = document.createElement("div");
		grid.setAttribute("class", "bx--grid");
		container.appendChild(grid);

		let i = 0;
		let row = getNewRow();

		storybookDemoGroups.forEach(demoGroup => {
			demoGroup.demos.forEach(demo => {
				if (i % 2 === 0 && i !== 0) {
					grid.appendChild(row);
					row = getNewRow();
				}

				const ClassToInitialize = ChartComponents[demo.chartType.vanilla];

				const column = document.createElement("div");
				column.className = "bx--col-md-12 bx--col-lg-6 chart-demo";
				column.setAttribute("id", demo.title);
				const chart = new ClassToInitialize(column, {
					data: demo.data,
					options: demo.options,
				});

				row.appendChild(column);

				i++;
			});
		});

		return container;
	});
}
