import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from "@storybook/addon-knobs";

import {
	SimpleBarChart,
	GroupedBarChart,
	StackedBarChart
} from "../src/index";

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
barStories.addDecorator(withKnobs);
barStories.add(simpleBarOptions.title, () => (
	<SimpleBarChart
		data={object("Data", simpleBarData)}
		options={object("Options", addWidthAndHeight(simpleBarOptions))}
	/>
));

barStories.add(groupedBarOptions.title, () => (
	<GroupedBarChart
		data={object("Data", groupedBarData)}
		options={object("Options", addWidthAndHeight(groupedBarOptions))}
	/>
));

barStories.add(simpleBarTimeSeriesOptions.title, () => (
	<SimpleBarChart
		data={object("Data", simpleBarTimeSeriesData)}
		options={object("Options", addWidthAndHeight(simpleBarTimeSeriesOptions))}
	/>
));

barStories.add(stackedBarOptions.title, () => (
	<StackedBarChart
		data={object("Data", stackedBarData)}
		options={object("Options", addWidthAndHeight(stackedBarOptions))}
	/>
));

barStories.add(stackedBarTimeSeriesOptions.title, () => (
	<StackedBarChart
		data={object("Data", stackedBarTimeSeriesData)}
		options={object("Options", addWidthAndHeight(stackedBarTimeSeriesOptions))}
	/>
));
