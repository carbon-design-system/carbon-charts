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

const pieStories = storiesOf('Pie', module).addDecorator(withKnobs);

pieStories.add(pieOptions.title, () => ({
	components: { CcvPieChart },
	props: {
		data: {
			default: object("Data", pieData)
		},
		options: {
			default: object("Options", addWidthAndHeight(pieOptions))
		}
	},
	template:
		'<ccv-pie-chart :data="data" :options="options"></ccv-pie-chart>',
}));

const donutStories = storiesOf('Donut', module).addDecorator(withKnobs);

donutStories.add(donutOptions.title, () => ({
	components: { CcvDonutChart },
	props: {
		data: {
			default: object("Data", donutData)
		},
		options: {
			default: object("Options", addWidthAndHeight(donutOptions))
		}
	},
	template:
		'<ccv-donut-chart :data="data" :options="options"></ccv-donut-chart>',
}));
