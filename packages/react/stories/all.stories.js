import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from "@storybook/addon-knobs";

import * as ChartComponents from "../src/index";

import { demoGroups } from "@carbon/charts/demo/demo-data";

// Loop through all demo groups
demoGroups.forEach(demoGroup => {
	// Create story group for each demo group
	const groupStories = storiesOf(demoGroup.title, module).addDecorator(withKnobs);

	// Loop through the demos for the group
	demoGroup.demos.forEach(demo => {
		const DemoComponent = ChartComponents[demo.chartType.vanilla];
		groupStories.add(demo.title, () => (
			<DemoComponent
				data={object("Data", demo.data)}
				options={object("Options", demo.options)}
			/>
		));
	});
});
