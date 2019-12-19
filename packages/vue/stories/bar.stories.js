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

const stories = storiesOf("Bar", module).addDecorator(withKnobs);

stories.add(simpleBarOptions.title, () => ({
	components: { CcvSimpleBarChart },
	props: {
		data: {
			default: object("Data", simpleBarData)
		},
		options: {
			default: object("Options", addWidthAndHeight(simpleBarOptions))
		}
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));


stories.add(simpleBarTimeSeriesOptions.title, () => ({
	components: { CcvSimpleBarChart },
	props: {
		data: {
			default: object("Data", simpleBarTimeSeriesData)
		},
		options: {
			default: object("Options", addWidthAndHeight(simpleBarTimeSeriesOptions))
		}
	},
	template: '<ccv-simple-bar-chart :data="data" :options="options"></ccv-simple-bar-chart>'
}));

stories.add(groupedBarOptions.title, () => ({
	components: { CcvGroupedBarChart },
	props: {
		data: {
			default: object("Data", groupedBarData)
		},
		options: {
			default: object("Options", addWidthAndHeight(groupedBarOptions))
		}
	},
	template: '<ccv-grouped-bar-chart :data="data" :options="options"></ccv-grouped-bar-chart>'
}));

stories.add(stackedBarOptions.title, () => ({
	components: { CcvStackedBarChart },
	props: {
		data: {
			default: object("Data", stackedBarData)
		},
		options: {
			default: object("Options", addWidthAndHeight(stackedBarOptions))
		}
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));

stories.add(stackedBarTimeSeriesOptions.title, () => ({
	components: { CcvStackedBarChart },
	props: {
		data: {
			default: object("Data", stackedBarTimeSeriesData)
		},
		options: {
			default: object("Options", addWidthAndHeight(stackedBarTimeSeriesOptions))
		}
	},
	template: '<ccv-stacked-bar-chart :data="data" :options="options"></ccv-stacked-bar-chart>'
}));
