import React from 'react';
import { HistogramChart as HC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, HistogramChartOptions } from '@carbon/charts/interfaces';
import { hasChartBeenInitialized } from './utils';

type HistogramChartProps = ChartConfig<HistogramChartOptions>;

export default class HistogramChart extends BaseChart<HistogramChartOptions> {
	chartRef!: HTMLDivElement;
	props!: HistogramChartProps;
	chart!: HC;

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new HC(this.chartRef, {
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
