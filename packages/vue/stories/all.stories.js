import { storiesOf } from '@storybook/vue';
import { withKnobs, object } from '@storybook/addon-knobs';

import * as ChartComponents from "../src/index";

import { demoGroups } from "@carbon/charts/demo/demo-data";

// Loop through all demo groups
demoGroups.forEach(demoGroup => {
	// Create story group for each demo group
	const groupStories = storiesOf(demoGroup.title, module).addDecorator(withKnobs);

	// Loop through the demos for the group
	demoGroup.demos.forEach(demo => {
		const component = ChartComponents[`Ccv${demo.chartType.vanilla}`];
		groupStories.add(demo.title, () => ({
			components: {
				[component.name]: component
			},
			props: {
				data: {
					default: object("Data", demo.data)
				},
				options: {
					default: object("Options", demo.options)
				}
			},
			template: `<${demo.chartType.vue} :data="data" :options="options"></${demo.chartType.vue}>`
		}));
	});
});
