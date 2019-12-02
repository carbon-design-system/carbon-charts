import { storiesOf } from '@storybook/vue';

import CcvSimpleBarChart from '../src/ccv-simple-bar-chart.vue';
import CcvGroupedBarChart from '../src/ccv-grouped-bar-chart.vue';
import CcvStackedBarChart from '../src/ccv-stacked-bar-chart.vue';
import {
	// Horizontal Bar
	groupedHorizontalBarOptions,
	groupedHorizontalBarData,
	simpleHorizontalBarOptions,
	simpleHorizontalBarData,
	simpleHorizontalBarTimeSeriesOptions,
	simpleHorizontalBarTimeSeriesData,
	stackedHorizontalBarTimeSeriesOptions,
	stackedHorizontalBarTimeSeriesData,
	stackedHorizontalBarOptions,
	stackedHorizontalBarData
} from "../../core/demo/demo-data/index";

import { addWidthAndHeight } from "./commons";

const stories = storiesOf("Bar (Horizontal)", module);
stories.add(simpleHorizontalBarOptions.title, () => ({
	components: { CcvSimpleBarChart },
	data() {
		return {
			data: simpleHorizontalBarData,
			options: addWidthAndHeight(simpleHorizontalBarOptions)
		};
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));

stories.add(simpleHorizontalBarTimeSeriesOptions.title, () => ({
	components: { CcvSimpleBarChart },
	data() {
		return {
			data: simpleHorizontalBarTimeSeriesData,
			options: addWidthAndHeight(simpleHorizontalBarTimeSeriesOptions)
		};
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));

stories.add(groupedHorizontalBarOptions.title, () => ({
	components: { CcvGroupedBarChart },
	data() {
		return {
			data: groupedHorizontalBarData,
			options: addWidthAndHeight(groupedHorizontalBarOptions)
		};
	},
	template: '<ccv-grouped-bar-chart :data="data" :options="options"></ccv-grouped-bar-chart>'
}));

stories.add(stackedHorizontalBarOptions.title, () => ({
	components: { CcvStackedBarChart },
	data() {
		return {
			data: stackedHorizontalBarData,
			options: addWidthAndHeight(stackedHorizontalBarOptions)
		};
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));

stories.add(stackedHorizontalBarTimeSeriesOptions.title, () => ({
	components: { CcvStackedBarChart },
	data() {
		return {
			data: stackedHorizontalBarTimeSeriesData,
			options: addWidthAndHeight(stackedHorizontalBarTimeSeriesOptions)
		};
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));
