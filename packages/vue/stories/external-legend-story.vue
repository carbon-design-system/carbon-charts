<template>
	<div class="ccv-legend-story">
		<CcvLegendChart
			ref="legendRef"
			:data="legendData"
			:options="legendOptions"
		/>

		<CcvDonutChart v-if="options1" :data="data" :options="options1" />
		<CcvDonutChart v-if="options2" :data="data2" :options="options2" />
	</div>
</template>

<script>
import { merge } from 'lodash';
import CcvLegendChart from '../src/ccv-legend-chart.vue';
import CcvDonutChart from '../src/ccv-donut-chart.vue';
import { donutData, donutData2, donutOptions } from '@carbon/charts/demo/data';

export default {
	name: 'CcvLegendStory',
	components: {
		CcvLegendChart,
		CcvDonutChart,
	},
	data() {
		return {
			legendData: donutData.concat(donutData2),
			legendOptions: {
				axes: {},
				height: '50px',
			},
			data: donutData,
			data2: donutData2,
			options1: null,
			options2: null,
			loaded: false,
		};
	},
	props: {},
	mounted() {
		this.$nextTick(() => {
			const legendChart = this.$refs.legendRef.coreChart;

			const legendExternal = {
				legend: {
					external: {
						reference: legendChart,
					},
				},
			};

			// eslint-disable-next-line no-console
			console.log('legendExternal', legendExternal);

			//   this.options1 = merge(donutOptions, legendExternal);

			// eslint-disable-next-line no-console
			console.log(this.options1);
		});

		// this.options1 = merge(donutOptions, legendExternal);
		// this.options2 = merge(donutOptions, legendExternal);

		// this.loaded = true;
	},
};
</script>
