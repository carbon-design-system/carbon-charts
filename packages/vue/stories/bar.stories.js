import { storiesOf } from '@storybook/vue';

import CcvSimpleBarChart from '../src/ccv-simple-bar-chart.vue';
import CcvGroupedBarChart from '../src/ccv-grouped-bar-chart.vue';
import CcvStackedBarChart from '../src/ccv-stacked-bar-chart.vue';
import {
	// Bar
	groupedBarOptions,
	groupedBarData,
	simpleBarOptions,
	simpleBarData,
	simpleBarTimeSeriesOptions,
	simpleBarTimeSeriesData,
	stackedBarData,
	stackedBarOptions,
	stackedBarTimeSeriesOptions,
	stackedBarTimeSeriesData
} from "../../core/demo/demo-data/index";

import { addWidthAndHeight } from "./commons";

const stories = storiesOf("Bar", module);
stories.add(simpleBarOptions.title, () => ({
	components: { CcvSimpleBarChart },
	data() {
		return {
			data: simpleBarData,
			options: addWidthAndHeight(simpleBarOptions)
		};
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));

stories.add(simpleBarTimeSeriesOptions.title, () => ({
	components: { CcvSimpleBarChart },
	data() {
		return {
			data: simpleBarTimeSeriesData,
			options: addWidthAndHeight(simpleBarTimeSeriesOptions)
		};
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));

stories.add(groupedBarOptions.title, () => ({
	components: { CcvGroupedBarChart },
	data() {
		return {
			data: groupedBarData,
			options: addWidthAndHeight(groupedBarOptions)
		};
	},
	template: '<ccv-grouped-bar-chart :data="data" :options="options"></ccv-grouped-bar-chart>'
}));

stories.add(stackedBarOptions.title, () => ({
	components: { CcvStackedBarChart },
	data() {
		return {
			data: stackedBarData,
			options: addWidthAndHeight(stackedBarOptions)
		};
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));

stories.add(stackedBarTimeSeriesOptions.title, () => ({
	components: { CcvStackedBarChart },
	data() {
		return {
			data: stackedBarTimeSeriesData,
			options: addWidthAndHeight(stackedBarTimeSeriesOptions)
		};
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));
