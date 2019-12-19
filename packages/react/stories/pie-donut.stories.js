import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from "@storybook/addon-knobs";

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
pieStories.addDecorator(withKnobs);

pieStories.add(pieOptions.title, () => (
	<PieChart
		data={object("Data", pieData)}
		options={object("Options", addWidthAndHeight(pieOptions))}
	/>
));

const donutStories = storiesOf("Donut", module);
donutStories.addDecorator(withKnobs);

donutStories.add(donutOptions.title, () => (
	<DonutChart
		data={object("Data", donutData)}
		options={object("Options", addWidthAndHeight(donutOptions))}
	/>
));
