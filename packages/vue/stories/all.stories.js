import { storiesOf } from '@storybook/vue';
import { withKnobs, object } from '@storybook/addon-knobs';

import * as ChartComponents from '../src/index';

import { storybookDemoGroups } from '@carbon/charts/demo/data';

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
		const component = ChartComponents[`Ccv${demo.chartType.vanilla}`];
		groupStories.add(demo.title, () => ({
			components: {
				[component.name]: component,
			},
			props: {
				data: {
					default: object('Data', demo.data),
				},
				options: {
					default: object('Options', demo.options),
				},
			},
			template: `
				<div class="container theme--white">
					<h3>
						<b>Component:</b>
						<span class="bx--tag bx--tag--green component-name">${demo.chartType.vue}</span>
					</h3>
					<p class="props"><b>Props:</b> data, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></p>

					<div class="marginTop-30">
						<${demo.chartType.vue} :data="data" :options="options"></${demo.chartType.vue}>
					</div>

					<h3 class="marginTop-30">Code sample</h3>
					<a href="${demo.codesandbox.vue}" target="_blank">
						<img src="https://codesandbox.io/static/img/play-codesandbox.svg" class="marginTop" />
					</a>
				</div>
			`,
		}));
	});
});
