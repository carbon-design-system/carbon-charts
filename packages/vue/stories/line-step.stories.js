import { storiesOf } from '@storybook/vue';

import CcvLineChart from '../src/ccv-line-chart';
import {
	curvedLineData,
	curvedLineOptions,
	lineData,
	lineOptions
} from './line-demo-data';

const lineStories = storiesOf('Line', module);

lineStories.add('Basic', () => ({
	components: { CcvLineChart },
	data() {
		return { lineData, lineOptions };
	},
	template:
		'<ccv-line-chart :data="lineData" :options="lineOptions"></ccv-line-chart>',
}));

lineStories.add('Natural Curve', () => ({
	components: { CcvLineChart },
	data() {
		return { curvedLineData, curvedLineOptions };
	},
	template:
		'<ccv-line-chart :data="curvedLineData" :options="curvedLineOptions"></ccv-line-chart>',
}));

lineStories.add('Bundle Curve', () => ({
	components: { CcvLineChart },
	data() {
		return {
			curvedLineData,
			curveBundleOptions: Object.assign({}, curvedLineOptions, {curve: "curveBundle"})
		};
	},
	template:
		'<ccv-line-chart :data="curvedLineData" :options="curveBundleOptions"></ccv-line-chart>',
}));

lineStories.add('Monotone Y Curve', () => ({
	components: { CcvLineChart },
	data() {
		return {
			curvedLineData,
			curveMonotoneYOptions: Object.assign({}, curvedLineOptions, {curve: 'curveMonotoneY'})
		};
	},
	template:
		'<ccv-line-chart :data="curvedLineData" :options="curveMonotoneYOptions"></ccv-line-chart>',
}));

lineStories.add('Monotone X Curve', () => ({
	components: { CcvLineChart },
	data() {
		return {
			curvedLineData,
			curveMonotoneXOptions: Object.assign({}, curvedLineOptions, {curve: "curveMonotoneX"})
		};
	},
	template:
		'<ccv-line-chart :data="curvedLineData" :options="curveMonotoneXOptions"></ccv-line-chart>',
}));


const stepStories = storiesOf("Step", module);

stepStories.add("Middle", () => ({
	components: { CcvLineChart },
	data() {
		return {
			lineData,
			curveStepOptions: Object.assign({}, lineOptions, {curve: "curveStep"})
		}
	},
	template:
		'<ccv-line-chart :data="lineData" :options="curveStepOptions"></ccv-line-chart>',
}));

stepStories.add("Before", () => ({
	components: { CcvLineChart },
	data() {
		return {
			lineData,
			curveStepBeforeOptions: Object.assign({}, lineOptions, {curve: "curveStepBefore"})
		}
	},
	template:
		'<ccv-line-chart :data="lineData" :options="curveStepBeforeOptions"></ccv-line-chart>',
}));

stepStories.add("After (Regular)", () => ({
	components: { CcvLineChart },
	data() {
		return {
			lineData,
			curveStepAfterOptions: Object.assign({}, lineOptions, {curve: "curveStepAfter"})
		}
	},
	template:
		'<ccv-line-chart :data="lineData" :options="curveStepAfterOptions"></ccv-line-chart>',
}));
