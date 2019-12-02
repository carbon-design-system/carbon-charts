import React from 'react';
import { storiesOf } from '@storybook/react';

import {
	SimpleBarChart,
	GroupedBarChart,
	StackedBarChart
} from "../src/index";

import {
	// Horizontal Bar
	groupedHorizontalBarOptions,
	groupedHorizontalBarData,
	simpleHorizontalBarOptions,
	simpleHorizontalBarData,
	simpleHorizontalBarTimeSeriesOptions,
	simpleHorizontalBarTimeSeriesData,
	stackedHorizontalBarTimeSeriesOptions,
	stackedHorizontalBarTimeSeriesData
} from "../../core/demo/demo-data/index";

import { addWidthAndHeight } from "./commons";

const horizontalBarStories = storiesOf("Bar (Horizontal)", module);
horizontalBarStories.add(simpleHorizontalBarOptions.title, () => (
	<SimpleBarChart
		data={simpleHorizontalBarData}
		options={addWidthAndHeight(simpleHorizontalBarOptions)}
	/>
));

horizontalBarStories.add(groupedHorizontalBarOptions.title, () => (
	<GroupedBarChart
		data={groupedHorizontalBarData}
		options={addWidthAndHeight(groupedHorizontalBarOptions)}
	/>
));

horizontalBarStories.add(simpleHorizontalBarTimeSeriesOptions.title, () => (
	<SimpleBarChart
		data={simpleHorizontalBarTimeSeriesData}
		options={addWidthAndHeight(simpleHorizontalBarTimeSeriesOptions)}
	/>
));

horizontalBarStories.add(stackedHorizontalBarTimeSeriesOptions.title, () => (
	<StackedBarChart
		data={stackedHorizontalBarTimeSeriesData}
		options={addWidthAndHeight(stackedHorizontalBarTimeSeriesOptions)}
	/>
));

horizontalBarStories.add(stackedHorizontalBarTimeSeriesOptions.title, () => (
	<StackedBarChart
		data={stackedHorizontalBarTimeSeriesData}
		options={addWidthAndHeight(stackedHorizontalBarTimeSeriesOptions)}
	/>
));
