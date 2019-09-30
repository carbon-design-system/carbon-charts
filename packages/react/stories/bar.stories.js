import React from 'react';
import { storiesOf } from '@storybook/react';

import SimpleBarChart from "../src/bar-chart-simple";
import GroupedBarChart from "../src/bar-chart-grouped";
import StackedBarChart from "../src/bar-chart-stacked";

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
	stackedBarTimeSeriesData,
} from "../../core/demo/demo-data/index";

import { addWidthAndHeight } from "./commons";

const barStories = storiesOf("Bar", module);
barStories.add(simpleBarOptions.title, () => (
	<SimpleBarChart
		data={simpleBarData}
		options={addWidthAndHeight(simpleBarOptions)}
	/>
));

barStories.add(groupedBarOptions.title, () => (
	<GroupedBarChart
		data={groupedBarData}
		options={addWidthAndHeight(groupedBarOptions)}
	/>
));

barStories.add(simpleBarTimeSeriesOptions.title, () => (
	<SimpleBarChart
		data={simpleBarTimeSeriesData}
		options={addWidthAndHeight(simpleBarTimeSeriesOptions)}
	/>
));

barStories.add(stackedBarOptions.title, () => (
	<StackedBarChart
		data={stackedBarData}
		options={addWidthAndHeight(stackedBarOptions)}
	/>
));

barStories.add(stackedBarTimeSeriesOptions.title, () => (
	<StackedBarChart
		data={stackedBarTimeSeriesData}
		options={addWidthAndHeight(stackedBarTimeSeriesOptions)}
	/>
));
