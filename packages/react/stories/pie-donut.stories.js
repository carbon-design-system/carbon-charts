import React from 'react';
import { storiesOf } from '@storybook/react';

import {
	PieChart,
	DonutChart
} from "../src/index";

import {
	// Pie & donut
	pieOptions,
	pieData,
	donutOptions,
	donutData
} from "../../core/demo/demo-data/index";

import { addWidthAndHeight } from "./commons";

const pieStories = storiesOf("Pie", module);
pieStories.add(pieOptions.title, () => (
	<PieChart
		data={pieData}
		options={addWidthAndHeight(pieOptions)}
	/>
));

const donutStories = storiesOf("Donut", module);
donutStories.add(donutOptions.title, () => (
	<DonutChart
		data={donutData}
		options={addWidthAndHeight(donutOptions)}
	/>
));
