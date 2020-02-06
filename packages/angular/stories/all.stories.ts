import { storiesOf } from "@storybook/angular";
import { withKnobs, object } from "@storybook/addon-knobs";

import { ChartsModule } from "../src/charts.module";

import { demoGroups } from "@carbon/charts/demo/demo-data";

const getTemplate = chartType => `
	<${chartType.angular}
		class="n-chart"
		[data]="data"
		[options]="options"
		#${chartType.vanilla}>
	</${chartType.angular}>
`;

// Loop through all demo groups
demoGroups.forEach(demoGroup => {
	// Create story group for each demo group
	const groupStories = storiesOf(demoGroup.title, module).addDecorator(withKnobs);

	// Loop through the demos for the group
	demoGroup.demos.forEach(demo => {
		groupStories.add(demo.title, () => ({
			template: getTemplate(demo.chartType),
			moduleMetadata: {
				imports: [ChartsModule]
			},
			props: {
				data: object("Data", demo.data),
				options: object("Options", demo.options)
			}
		}));
	});
});
