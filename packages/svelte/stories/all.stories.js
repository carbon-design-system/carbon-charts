import { storiesOf } from "@storybook/svelte";
import { withKnobs, object } from "@storybook/addon-knobs";
import { storybookDemoGroups } from "@carbon/charts/demo/data";
import * as ChartComponents from "../src";
import ChartWrapper from "./ChartWrapper.svelte";

storybookDemoGroups.forEach(demoGroup => {
	const groupStories = storiesOf(demoGroup.title, module).addDecorator(
		withKnobs({ escapeHTML: false })
	);

	demoGroup.demos.forEach(demo => {
		if (demo.isHighScale) {
			return;
		}
		let chartType = demo.chartType.vanilla;

		switch (chartType) {
			case "SimpleBarChart":
				chartType = "BarChartSimple";
				break;
			case "GroupedBarChart":
				chartType = "BarChartGrouped";
				break;
			case "StackedBarChart":
				chartType = "BarChartStacked";
				break;
		}

		groupStories.add(demo.title, () => ({
			Component: ChartWrapper,
			props: {
				DemoComponent: ChartComponents[chartType],
				chartType,
				demo
			}
		}));
	});
});
