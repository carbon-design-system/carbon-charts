import { storiesOf } from '@storybook/vue';
import { withKnobs, object } from '@storybook/addon-knobs';

import CcvLineChart from '../src/ccv-line-chart';
import CcvScatterChart from '../src/ccv-scatter-chart';
import {
	// Line
	lineTimeSeriesOptions,
	lineTimeSeriesData,
	lineData,
	lineOptions,
	// Step
	stepOptions,
	stepData,
	stepTimeSeriesOptions,
	stepTimeSeriesData,
	// Scatter
	scatterTimeSeriesOptions,
	scatterTimeSeriesData,
	scatterOptions,
	scatterData
} from "../../core/demo/demo-data";

import { addWidthAndHeight } from "./commons";

const template = '<ccv-line-chart :data="data" :options="options"></ccv-line-chart>';

const lineStories = storiesOf("Line", module);
lineStories.addDecorator(withKnobs);

lineStories.add(lineOptions.title, () => ({
	components: { CcvLineChart },
	data() {
		return {
			data: object("Data", lineData),
			options: object("Options", addWidthAndHeight(lineOptions))
		};
	},
	template
}));

lineStories.add(lineTimeSeriesOptions.title, () => ({
	components: { CcvLineChart },
	data() {
		return {
			data: object("Data", lineTimeSeriesData),
			options: object("Options", addWidthAndHeight(lineTimeSeriesOptions))
		};
	},
	template
}));

const stepStories = storiesOf("Step", module);
stepStories.add(stepOptions.title, () => ({
	components: { CcvLineChart },
	data() {
		return {
			data: object("Data", stepData),
			options: object("Options", addWidthAndHeight(stepOptions))
		};
	},
	template
}));

stepStories.add(stepTimeSeriesOptions.title, () => ({
	components: { CcvLineChart },
	data() {
		return {
			data: object("Data", stepTimeSeriesData),
			options: object("Options", addWidthAndHeight(stepTimeSeriesOptions))
		};
	},
	template
}));

const scatterStories = storiesOf("Scatter", module);
scatterStories.add(scatterOptions.title, () => ({
	components: { CcvScatterChart },
	data() {
		return {
			data: object("Data", scatterData),
			options: object("Options", addWidthAndHeight(scatterOptions))
		};
	},
	template: '<ccv-scatter-chart :data="data" :options="options"></ccv-scatter-chart>'
}));

scatterStories.add(scatterTimeSeriesOptions.title, () => ({
	components: { CcvScatterChart },
	data() {
		return {
			data: object("Data", scatterTimeSeriesData),
			options: object("Options", addWidthAndHeight(scatterTimeSeriesOptions))
		};
	},
	template: '<ccv-scatter-chart :data="data" :options="options"></ccv-scatter-chart>'
}));
