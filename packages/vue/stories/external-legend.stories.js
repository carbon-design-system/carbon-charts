import { storiesOf } from '@storybook/vue';
import { withKnobs, object } from '@storybook/addon-knobs';
import { merge } from 'lodash';

import { donutData, donutData2, donutOptions } from '@carbon/charts/demo/data';
import { CcvLegendChart, CcvDonutChart } from '../src/index';

storiesOf('External Legend', module)
	.addDecorator(
		withKnobs({
			escapeHTML: false,
		})
	)
	.add('Multiple charts with same legend', () => ({
		name: 'legend-story',
		components: {
			CcvLegendChart: CcvLegendChart,
			CcvDonutChart: CcvDonutChart,
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
				const legendChartRef = this.$refs.legendRef.coreChart;

				// eslint-disable-next-line no-console
				console.log('legendRef', this.$refs.legendRef);

				const legendExternal = {
					legend: {
						external: {
							reference: legendChartRef,
						},
					},
				};

				this.options1 = merge(donutOptions, legendExternal);
				this.options2 = merge(donutOptions, legendExternal);
			});
		},
		template: `
            <div class="container theme--white">
                <h3>
                    <b>Component:</b>
                    <span class="bx--tag bx--tag--green component-name">ccv-legend-chart</span>
                </h3>
                <p class="props"><b>Props:</b> data, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></p>

                <div class="marginTop-30">
					<CcvLegendChart ref="legendRef" :data="legendData" :options="legendOptions"/>

					<div ref="testRef"></div>

                    <CcvDonutChart v-if="options1" :data="data" :options="options1"/>
                    <CcvDonutChart v-if="options2" :data="data2" :options="options2"/>
                </div>
            </div>
        `,
	}));
