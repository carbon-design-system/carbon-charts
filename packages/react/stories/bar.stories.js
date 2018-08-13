import React from 'react';
import { storiesOf } from '@storybook/react';

import BarChart from "../src/bar-chart";
import {
	groupedBarData,
	groupedBarOptions,
	simpleBarData,
	simpleBarOptions,
	stackedBarOptions
} from "./bar-demo-data";

const barStories = storiesOf("Bar", module);
barStories.add("Label-based legend", () => (
	<BarChart
		data={simpleBarData}
		options={simpleBarOptions}
	/>
));

barStories.add("Label-based legend (Accessible)", () => (
	<BarChart
		data={simpleBarData}
		options={Object.assign({}, simpleBarOptions, {accessibility: true})}
	/>
));

barStories.add("Grouped", () => (
	<BarChart
		data={groupedBarData}
		options={groupedBarOptions}
	/>
));

barStories.add("Grouped (Accessible)", () => (
	<BarChart
		data={groupedBarData}
		options={Object.assign({}, groupedBarOptions, {accessibility: true})}
	/>
));

barStories.add("Stacked", () => (
	<BarChart
		data={groupedBarData}
		options={stackedBarOptions}
	/>
));

barStories.add("Stacked (Accessible)", () => (
	<BarChart
		data={groupedBarData}
		options={Object.assign({}, stackedBarOptions, {accessibility: true})}
	/>
));
