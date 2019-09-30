import React from 'react';
import { storiesOf } from '@storybook/react';

import LineChart from "../src/line-chart";
import ScatterChart from "../src/scatter-chart";
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
} from "../../core/demo/demo-data/index";

import { addWidthAndHeight } from "./commons";

const lineStories = storiesOf("Line", module);
lineStories.add(lineOptions.title, () => (
	<LineChart
		data={lineData}
		options={addWidthAndHeight(lineOptions)}
	/>
));

lineStories.add(lineTimeSeriesOptions.title, () => (
	<LineChart
		data={lineTimeSeriesData}
		options={addWidthAndHeight(lineTimeSeriesOptions)}
	/>
));

const stepStories = storiesOf("Step", module);
stepStories.add(stepOptions.title, () => (
	<LineChart
		data={stepData}
		options={addWidthAndHeight(stepOptions)}
	/>
));

stepStories.add(stepTimeSeriesOptions.title, () => (
	<LineChart
		data={stepTimeSeriesData}
		options={addWidthAndHeight(stepTimeSeriesOptions)}
	/>
));

const scatterStories = storiesOf("Scatter", module);
scatterStories.add(scatterOptions.title, () => (
	<ScatterChart
		data={scatterData}
		options={addWidthAndHeight(scatterOptions)}
	/>
));

scatterStories.add(scatterTimeSeriesOptions.title, () => (
	<ScatterChart
		data={scatterTimeSeriesData}
		options={addWidthAndHeight(scatterTimeSeriesOptions)}
	/>
));
