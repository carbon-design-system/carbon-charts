import { storiesOf } from '@storybook/vue';

import CcvAreaChart from '../src/ccv-area-chart.vue';
import {
	// Area
	areaTimeSeriesData,
	areaTimeSeriesOptions
} from "../../core/demo/demo-data/index";

import { addWidthAndHeight } from "./commons";

const stories = storiesOf("Area", module);
stories.add(areaTimeSeriesOptions.title, () => ({
	components: { CcvAreaChart },
	data() {
		return {
			data: areaTimeSeriesData,
			options: addWidthAndHeight(areaTimeSeriesOptions)
		};
	},
	template: '<ccv-area-chart :data="data" :options="options"></ccv-area-chart>'
}));
