import { storiesOf } from "@storybook/angular";
import { withKnobs, object } from "@storybook/addon-knobs";

import { ChartsModule } from "../src/charts.module";

import { storybookDemoGroups } from "@carbon/charts/demo/data";

const getTemplate = demo => `
	<div class="container theme--white">
		<h3>
			<b>Component:</b>
			<span class="bx--tag bx--tag--green component-name">${demo.chartType.angular}</span>
		</h3>
		<p class="props"><b>Props:</b> data, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></p>

		<div class="marginTop-30">
			<${demo.chartType.angular}
				class="n-chart"
				[data]="data"
				[options]="options"
				#${demo.chartType.vanilla}>
			</${demo.chartType.angular}>
		</div>


		<h3 class="marginTop-30">Code sample</h3>

		<div class="marginTop-30" *ngFor="let codeFile of codeFiles;">
			<h5>{{codeFile}}</h5>

			<div class="bx--snippet bx--snippet--multi bx--snippet--expand marginTop-15" data-code-snippet>
				<div class="bx--snippet-container" aria-label="Code Snippet Text">
					<pre><code>{{code[codeFile]}}</code></pre>
				</div>
			</div>
		</div>
	</div>
`;

// Loop through all demo groups
storybookDemoGroups.forEach(demoGroup => {
	// Create story group for each demo group
	const groupStories = storiesOf(demoGroup.title, module).addDecorator(
		withKnobs({ escapeHTML: false })
	);

	// Loop through the demos for the group
	demoGroup.demos.forEach(demo => {
		if (demo.isHighScale) {
			return;
		}
		groupStories.add(demo.title, () => ({
			template: getTemplate(demo),
			moduleMetadata: {
				imports: [ChartsModule]
			},
			props: {
				data: object("Data", demo.data),
				options: object("Options", demo.options),
				codeFiles: Object.keys(demo.code.angular),
				code: demo.code.angular
			}
		}));
	});
});
