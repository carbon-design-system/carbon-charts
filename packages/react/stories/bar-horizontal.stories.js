import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from "@storybook/addon-knobs";

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
	stackedHorizontalBarTimeSeriesData,
	stackedHorizontalBarOptions,
	stackedHorizontalBarData
} from "../../core/demo/demo-data/index";

import { addWidthAndHeight } from "./commons";

const horizontalBarStories = storiesOf("Bar (Horizontal)", module);
horizontalBarStories.addDecorator(withKnobs);
horizontalBarStories.add(simpleHorizontalBarOptions.title, () => (
	<SimpleBarChart
		data={object("Data", simpleHorizontalBarData)}
		options={object("Options", addWidthAndHeight(simpleHorizontalBarOptions))}
	/>
));

horizontalBarStories.add(groupedHorizontalBarOptions.title, () => (
	<GroupedBarChart
		data={object("Data", groupedHorizontalBarData)}
		options={object("Options", addWidthAndHeight(groupedHorizontalBarOptions))}
	/>
));

horizontalBarStories.add(simpleHorizontalBarTimeSeriesOptions.title, () => (
	<SimpleBarChart
		data={object("Data", simpleHorizontalBarTimeSeriesData)}
		options={object("Options", addWidthAndHeight(simpleHorizontalBarTimeSeriesOptions))}
	/>
));

horizontalBarStories.add(stackedHorizontalBarOptions.title, () => (
	<StackedBarChart
		data={object("Data", stackedHorizontalBarData)}
		options={object("Options", addWidthAndHeight(stackedHorizontalBarOptions))}
	/>
));

horizontalBarStories.add(stackedHorizontalBarTimeSeriesOptions.title, () => (
	<StackedBarChart
		data={object("Data", stackedHorizontalBarTimeSeriesData)}
		options={object("Options", addWidthAndHeight(stackedHorizontalBarTimeSeriesOptions))}
	/>
));

horizontalBarStories.add(stackedHorizontalBarTimeSeriesOptions.title, () => (
	<StackedBarChart
		data={object("Data", stackedHorizontalBarTimeSeriesData)}
		options={object("Options", addWidthAndHeight(stackedHorizontalBarTimeSeriesOptions))}
	/>
));
