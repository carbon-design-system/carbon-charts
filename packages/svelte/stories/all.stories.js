import { storiesOf } from '@storybook/svelte';
import { withKnobs, object } from '@storybook/addon-knobs';
import { storybookDemoGroups } from '@carbon/charts/demo/data';
import * as ChartComponents from '../src';
import ChartWrapper from './ChartWrapper.svelte';
import Welcome from './Welcome.svelte';

const introStories = storiesOf('Intro', module).addDecorator(withKnobs);

// Loop through the demos for the group
introStories.add('Welcome', () => ({
	Component: Welcome,
}));

storybookDemoGroups.forEach((demoGroup) => {
	const groupStories = storiesOf(
		`${demoGroup.storyGroupTitle}|${demoGroup.title}`,
		module
	).addDecorator(withKnobs({ escapeHTML: false }));

	demoGroup.demos.forEach((demo) => {
		if (demo.isHighScale) {
			return;
		}
		let chartType = demo.chartType.vanilla;

		switch (chartType) {
			case 'SimpleBarChart':
				chartType = 'BarChartSimple';
				break;
			case 'GroupedBarChart':
				chartType = 'BarChartGrouped';
				break;
			case 'StackedBarChart':
				chartType = 'BarChartStacked';
				break;
		}

		groupStories.add(demo.title, () => ({
			Component: ChartWrapper,
			props: {
				DemoComponent: ChartComponents[chartType],
				chartType,
				demo,
			},
		}));
	});
});
