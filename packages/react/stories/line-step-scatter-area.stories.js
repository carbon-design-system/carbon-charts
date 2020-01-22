import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from "@storybook/addon-knobs";

import {
	AreaChart,
	LineChart,
	ScatterChart
} from "../src/index";

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
	// Area
	areaTimeSeriesData,
	areaTimeSeriesOptions,
	// Scatter
	scatterTimeSeriesOptions,
	scatterTimeSeriesData,
	scatterOptions,
	scatterData
} from "@carbon/charts/demo/demo-data";

import { addWidthAndHeight } from "./commons";

const lineStories = storiesOf("Line", module);
lineStories.addDecorator(withKnobs);

lineStories.add(lineOptions.title, () => (
	<LineChart
		data={object("Data", lineData)}
		options={object("Options", addWidthAndHeight(lineOptions))}
	/>
));

lineStories.add(lineTimeSeriesOptions.title, () => (
	<LineChart
		data={object("Data", lineTimeSeriesData)}
		options={object("Options", addWidthAndHeight(lineTimeSeriesOptions))}
	/>
));

const stepStories = storiesOf("Step", module);
stepStories.addDecorator(withKnobs);

stepStories.add(stepOptions.title, () => (
	<LineChart
		data={object("Data", stepData)}
		options={object("Options", addWidthAndHeight(stepOptions))}
	/>
));

stepStories.add(stepTimeSeriesOptions.title, () => (
	<LineChart
		data={object("Data", stepTimeSeriesData)}
		options={object("Options", addWidthAndHeight(stepTimeSeriesOptions))}
	/>
));

const scatterStories = storiesOf("Scatter", module);
scatterStories.addDecorator(withKnobs);

scatterStories.add(scatterOptions.title, () => (
	<ScatterChart
		data={object("Data", scatterData)}
		options={object("Options", addWidthAndHeight(scatterOptions))}
	/>
));

scatterStories.add(scatterTimeSeriesOptions.title, () => (
	<ScatterChart
		data={object("Data", scatterTimeSeriesData)}
		options={object("Options", addWidthAndHeight(scatterTimeSeriesOptions))}
	/>
));

const areaStories = storiesOf("Area", module);
areaStories.add(areaTimeSeriesOptions.title, () => (
	<AreaChart
		data={areaTimeSeriesData}
		options={addWidthAndHeight(areaTimeSeriesOptions)}
	/>
));
