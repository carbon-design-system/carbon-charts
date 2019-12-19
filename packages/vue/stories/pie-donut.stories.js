import { storiesOf } from '@storybook/vue';
import { withKnobs, object } from '@storybook/addon-knobs';

import CcvDonutChart from '../src/ccv-donut-chart';
import CcvPieChart from '../src/ccv-pie-chart';

import {
	// Pie & donut
	pieOptions,
	pieData,
	donutOptions,
	donutData
} from "../../core/demo/demo-data";

import { addWidthAndHeight } from "./commons";

const pieStories = storiesOf('Pie', module);
pieStories.addDecorator(withKnobs);

pieStories.add(pieOptions.title, () => ({
	components: { CcvPieChart },
	data() {
		return {
			data: object("Data", pieData),
			options: object("Options", addWidthAndHeight(pieOptions))
		};
	},
	template:
		'<ccv-pie-chart :data="data" :options="options"></ccv-pie-chart>',
}));

const donutStories = storiesOf('Donut', module);
donutStories.addDecorator(withKnobs);

donutStories.add(donutOptions.title, () => ({
	components: { CcvDonutChart },
	data() {
		return {
			data: object("Data", donutData),
			options: object("Options", addWidthAndHeight(donutOptions))
		};
	},
	template:
		'<ccv-donut-chart :data="data" :options="options"></ccv-donut-chart>',
}));
