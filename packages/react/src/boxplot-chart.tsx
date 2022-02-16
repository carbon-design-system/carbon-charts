import React from 'react';
import { BoxplotChart as BC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, BoxplotChartOptions } from '@carbon/charts/interfaces';

type BoxplotChartProps = ChartConfig<BoxplotChartOptions>;

export default class BoxplotChart extends BaseChart<BoxplotChartOptions> {
	chartRef!: HTMLDivElement;
	props!: BoxplotChartProps;
	chart!: BC;

	componentDidMount() {
		this.chart = new BC(this.chartRef, {
			data: this.props.data,
			options: this.props.options,
		});
	}

	render() {
		return (
			<div
				ref={(chartRef) => (this.chartRef = chartRef!)}
				className="chart-holder"></div>
		);
	}
}
