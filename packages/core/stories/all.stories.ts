import { storiesOf } from "@storybook/html";
import { withKnobs, object } from "@storybook/addon-knobs";
import { storybookDemoGroups } from "../demo/data";
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
			container.setAttribute("class", "container theme--g100");

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

			const themePicker = document.createElement("div");
			themePicker.innerHTML = `
			<fieldset class="bx--fieldset marginTop-30">
			  <div class="bx--form-item">
				<div class="bx--radio-button-group ">
					<div class="bx--radio-button-wrapper">
					  <input id="radio-button-abfeuherm2f-1" class="bx--radio-button" type="radio" value="white" name="radio-button" tabindex="0" checked>
					  <label for="radio-button-abfeuherm2f-1" class="bx--radio-button__label">
						<span class="bx--radio-button__appearance"></span>
						<span class="bx--radio-button__label-text">White</span>
					  </label>
					</div>
					<div class="bx--radio-button-wrapper">
					  <input id="radio-button-abfeuherm2f-2" class="bx--radio-button" type="radio" value="g10" name="radio-button" tabindex="0">
					  <label for="radio-button-abfeuherm2f-2" class="bx--radio-button__label">
						<span class="bx--radio-button__appearance"></span>
						<span class="bx--radio-button__label-text">G10</span>
					  </label>
					</div>
					<div class="bx--radio-button-wrapper">
					  <input id="radio-button-abfeuherm2f-3" class="bx--radio-button" type="radio" value="g90" name="radio-button" tabindex="0">
					  <label for="radio-button-abfeuherm2f-3" class="bx--radio-button__label">
						<span class="bx--radio-button__appearance"></span>
						<span class="bx--radio-button__label-text">G90</span>
					  </label>
					</div>
					<div class="bx--radio-button-wrapper">
					  <input id="radio-button-abfeuherm2f-4" class="bx--radio-button" type="radio" value="g100" name="radio-button" tabindex="0">
					  <label for="radio-button-abfeuherm2f-4" class="bx--radio-button__label">
						<span class="bx--radio-button__appearance"></span>
						<span class="bx--radio-button__label-text">G100</span>
					  </label>
					</div>
				</div>
			  </div>
			</fieldset>`;
			container.appendChild(themePicker);
			const radioButtons = themePicker.querySelectorAll("input.bx--radio-button");
			radioButtons.forEach(radioButton => {
				radioButton.addEventListener("click", (e: any) => {
					const theme = e.target.value;
					container.setAttribute("class", `container theme--${theme}`);
				});
			});

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

if (process.env.NODE_ENV !== "production") {
	const devStoreis = storiesOf("__DEV__", module).addDecorator(withKnobs);

	// Loop through the demos for the group
	devStoreis.add("All chart types", () => {
		// container creation
		const container = document.createElement("div");
		container.setAttribute("class", "container");

		const getNewRow = () => {
			const row = document.createElement("div");
			row.className = "bx--row chart-demo";

			return row;
		};

		let i = 0;
		let row = getNewRow();

		storybookDemoGroups.forEach(demoGroup => {
			demoGroup.demos.forEach(demo => {
				if (i % 2 === 0 && i !== 0) {
					container.appendChild(row);
					row = getNewRow();
				}

				const ClassToInitialize = ChartComponents[demo.chartType.vanilla];

				const column = document.createElement("div");
				column.className = "bx--col";
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
