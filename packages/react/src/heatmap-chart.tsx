import React from 'react';
import { HeatmapChart as HMC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, HeatmapChartOptions } from '@carbon/charts/interfaces';
import { hasChartBeenInitialized } from './utils';

type HeatmapChartProps = ChartConfig<HeatmapChartOptions>;

export default class HeatmapChart extends BaseChart<HeatmapChartOptions> {
	chartRef!: HTMLDivElement;
	props!: HeatmapChartProps;
	chart!: HMC;

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new HMC(this.chartRef, {
				data: this.props.data,
				options: this.props.options,
			});
		}
	}

	render() {
		return (
			<div
				ref={(chartRef) => (this.chartRef = chartRef!)}
				className="chart-holder"></div>
		);
	}
}
