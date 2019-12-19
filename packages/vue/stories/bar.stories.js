import { storiesOf } from '@storybook/vue';
import { withKnobs, object } from '@storybook/addon-knobs';

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
stories.addDecorator(withKnobs);

stories.add(simpleBarOptions.title, () => ({
	components: { CcvSimpleBarChart },
	data() {
		return {
			data: object("Data", simpleBarData),
			options: object("Options", addWidthAndHeight(simpleBarOptions))
		};
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));

stories.add(simpleBarTimeSeriesOptions.title, () => ({
	components: { CcvSimpleBarChart },
	data() {
		return {
			data: object("Data", simpleBarTimeSeriesData),
			options: object("Options", addWidthAndHeight(simpleBarTimeSeriesOptions))
		};
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));

stories.add(groupedBarOptions.title, () => ({
	components: { CcvGroupedBarChart },
	data() {
		return {
			data: object("Data", groupedBarData),
			options: object("Options", addWidthAndHeight(groupedBarOptions))
		};
	},
	template: '<ccv-grouped-bar-chart :data="data" :options="options"></ccv-grouped-bar-chart>'
}));

stories.add(stackedBarOptions.title, () => ({
	components: { CcvStackedBarChart },
	data() {
		return {
			data: object("Data", stackedBarData),
			options: object("Options", addWidthAndHeight(stackedBarOptions))
		};
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));

stories.add(stackedBarTimeSeriesOptions.title, () => ({
	components: { CcvStackedBarChart },
	data() {
		return {
			data: object("Data", stackedBarTimeSeriesData),
			options: object("Options", addWidthAndHeight(stackedBarTimeSeriesOptions))
		};
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));
