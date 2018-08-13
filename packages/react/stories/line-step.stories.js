import React from 'react';
import { storiesOf } from '@storybook/react';

import LineChart from "../src/line-chart";
import {
	curvedLineData,
	curvedLineOptions,
	lineData,
	lineOptions
} from "./line-demo-data";

const lineStories = storiesOf("Line", module);
lineStories.add("Basic", () => (
	<LineChart
		data={lineData}
		options={lineOptions}
	/>
));

lineStories.add("Natural Curve", () => (
	<LineChart
		data={curvedLineData}
		options={curvedLineOptions}
	/>
));

lineStories.add("Bundle Curve", () => (
	<LineChart
		data={curvedLineData}
		options={Object.assign({}, curvedLineOptions, {curve: "curveBundle"})}
	/>
));

lineStories.add("Monotone Y Curve", () => (
	<LineChart
		data={curvedLineData}
		options={Object.assign({}, curvedLineOptions, {curve: "curveMonotoneY"})}
	/>
));

lineStories.add("Monotone X Curve", () => (
	<LineChart
		data={curvedLineData}
		options={Object.assign({}, curvedLineOptions, {curve: "curveMonotoneX"})}
	/>
));

const stepStories = storiesOf("Step", module);
stepStories.add("Middle", () => (
	<LineChart
		data={lineData}
		options={Object.assign({}, lineOptions, {curve: "curveStep"})}
	/>
));

stepStories.add("Before", () => (
	<LineChart
		data={lineData}
		options={Object.assign({}, lineOptions, {curve: "curveStepBefore"})}
	/>
));
stepStories.add("After (Regular)", () => (
	<LineChart
		data={lineData}
		options={Object.assign({}, lineOptions, {curve: "curveStepAfter"})}
	/>
));
// const donutStories = storiesOf("Donut", module);
// donutStories.add("Basic", () => (
// 	<DonutChart
// 		data={demoPieData}
// 		options={demoDonutOptions}
// 	/>
// ));

// donutStories.add("Accessible", () => (
// 	<DonutChart
// 		data={demoPieData}
// 		options={Object.assign({}, demoDonutOptions, {accessibility: true})}
// 	/>
// ));
