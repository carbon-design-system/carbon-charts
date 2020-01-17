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

const lineStories = storiesOf("Line", module).addDecorator(withKnobs);

lineStories.add(lineOptions.title, () => ({
	components: { CcvLineChart },
	props: {
		data: {
			default: object("Data", lineData)
		},
		options: {
			default: object("Options", addWidthAndHeight(lineOptions))
		}
	},
	template
}));

lineStories.add(lineTimeSeriesOptions.title, () => ({
	components: { CcvLineChart },
	props: {
		data: {
			default: object("Data", lineTimeSeriesData)
		},
		options: {
			default: object("Options", addWidthAndHeight(lineTimeSeriesOptions))
		}
	},
	template
}));

const stepStories = storiesOf("Step", module).addDecorator(withKnobs);

stepStories.add(stepOptions.title, () => ({
	components: { CcvLineChart },
	props: {
		data: {
			default: object("Data", stepData)
		},
		options: {
			default: object("Options", addWidthAndHeight(stepOptions))
		}
	},
	template
}));

stepStories.add(stepTimeSeriesOptions.title, () => ({
	components: { CcvLineChart },
	props: {
		data: {
			default: object("Data", stepTimeSeriesData)
		},
		options: {
			default: object("Options", addWidthAndHeight(stepTimeSeriesOptions))
		}
	},
	template
}));

const scatterStories = storiesOf("Scatter", module).addDecorator(withKnobs);

scatterStories.add(scatterOptions.title, () => ({
	components: { CcvScatterChart },
	props: {
		data: {
			default: object("Data", scatterData)
		},
		options: {
			default: object("Options", addWidthAndHeight(scatterOptions))
		}
	},
	template: '<ccv-scatter-chart :data="data" :options="options"></ccv-scatter-chart>'
}));

scatterStories.add(scatterTimeSeriesOptions.title, () => ({
	components: { CcvScatterChart },
	props: {
		data: {
			default: object("Data", scatterTimeSeriesData)
		},
		options: {
			default: object("Options", addWidthAndHeight(scatterTimeSeriesOptions))
		}
	},
	template: '<ccv-scatter-chart :data="data" :options="options"></ccv-scatter-chart>'
}));
