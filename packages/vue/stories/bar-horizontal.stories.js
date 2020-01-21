import { storiesOf } from '@storybook/vue';
import { withKnobs, object } from '@storybook/addon-knobs';

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

const stories = storiesOf("Bar (Horizontal)", module).addDecorator(withKnobs);
stories.add(simpleHorizontalBarOptions.title, () => ({
	components: { CcvSimpleBarChart },
	props: {
		data: {
			default: object("Data", simpleHorizontalBarData)
		},
		options: {
			default: object("Options", addWidthAndHeight(simpleHorizontalBarOptions))
		}
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));

stories.add(simpleHorizontalBarTimeSeriesOptions.title, () => ({
	components: { CcvSimpleBarChart },
	props: {
		data: {
			default: object("Data", simpleHorizontalBarTimeSeriesData)
		},
		options: {
			default: object("Options", addWidthAndHeight(simpleHorizontalBarTimeSeriesOptions))
		}
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));

stories.add(groupedHorizontalBarOptions.title, () => ({
	components: { CcvGroupedBarChart },
	props: {
		data: {
			default: object("Data", groupedHorizontalBarData)
		},
		options: {
			default: object("Options", addWidthAndHeight(groupedHorizontalBarOptions))
		}
	},
	template: '<ccv-grouped-bar-chart :data="data" :options="options"></ccv-grouped-bar-chart>'
}));

stories.add(stackedHorizontalBarOptions.title, () => ({
	components: { CcvStackedBarChart },
	props: {
		data: {
			default: object("Data", stackedHorizontalBarData)
		},
		options: {
			default: object("Options", addWidthAndHeight(stackedHorizontalBarOptions))
		}
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));

stories.add(stackedHorizontalBarTimeSeriesOptions.title, () => ({
	components: { CcvStackedBarChart },
	props: {
		data: {
			default: object("Data", stackedHorizontalBarTimeSeriesData)
		},
		options: {
			default: object("Options", addWidthAndHeight(stackedHorizontalBarTimeSeriesOptions))
		}
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));
