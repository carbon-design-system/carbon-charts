import { storiesOf } from '@storybook/vue';

import CcvDonutChart from '../src/ccv-donut-chart';
import CcvPieChart from '../src/ccv-pie-chart';

import {
	basicPieData,
	basicDonutOptions,
	basicPieOptions,
} from './pie-donut-demo-data';

const donutStories = storiesOf('Donut', module);

donutStories.add('Basic', () => ({
	components: { CcvDonutChart },
	data() {
		return { basicPieData, basicDonutOptions };
	},
	template:
		'<ccv-donut-chart :data="basicPieData" :options="basicDonutOptions"></ccv-donut-chart>',
}));

donutStories.add('Accessible', () => ({
	components: { CcvDonutChart },
	data() {
		return { basicPieData, basicDonutOptions };
	},
	template:
		'<ccv-donut-chart :data="basicPieData" :options="Object.assign({}, basicDonutOptions, {accessibility: true})"></ccv-donut-chart>',
}));

const pieStories = storiesOf('Pie', module);

pieStories.add('Basic', () => ({
	components: { CcvPieChart },
	data() {
		return { basicPieData, basicPieOptions };
	},
	template:
		'<ccv-pie-chart :data="basicPieData" :options="basicPieOptions"></ccv-pie-chart>',
}));

pieStories.add('Accessible', () => ({
	components: { CcvPieChart },
	data() {
		return { basicPieData, basicPieOptions };
	},
	template:
		'<ccv-pie-chart :data="basicPieData" :options="Object.assign({}, basicPieOptions, {accessibility: true})"></ccv-pie-chart>',
}));
