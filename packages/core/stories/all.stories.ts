import { storiesOf } from "@storybook/html";
import { withKnobs, object } from "@storybook/addon-knobs";
import { demoGroups } from "../demo/demo-data";
import * as ChartComponents from "../src/charts";

demoGroups.forEach(demoGroup => {
	// Create story group for each demo group
	const groupStories = storiesOf(demoGroup.title, module).addDecorator(withKnobs);

	demoGroup.demos.forEach(demo => {
		const DemoComponent = ChartComponents[demo.chartType.vanilla];

		groupStories.add(demo.title, () =>
			`
				<div className="container">
					<h3>
						<b>Component:</b>
						<span className="bx--tag bx--tag--green component-name">${demo.chartType.vanilla}</span>
					</h3>
					<p className="props">
						<b>Props:</b> data, 
						<a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a>
					</p>

					<div className="marginTop-30">
						${"something"}
					</div>

					<h3 className="marginTop-30">Code sample</h3>
					<a href={demo.codesandbox.react} target="_blank">
						<img src="https://codesandbox.io/static/img/play-codesandbox.svg" className="marginTop" />
					</a>

					<div className="bx--snippet bx--snippet--multi bx--snippet--expand marginTop-30" data-code-snippet>
						${"snippets"}
					</div>
				</div>
			`
		);
	});
});
