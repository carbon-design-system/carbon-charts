import React from 'react';
import { PieChart as PC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, PieChartOptions } from '@carbon/charts/interfaces';

type PieChartProps = ChartConfig<PieChartOptions>;

export default class PieChart extends BaseChart<PieChartOptions> {
	chartRef!: HTMLDivElement;
	props!: PieChartProps;
	chart!: PC;

	componentDidMount() {
		this.chart = new PC(this.chartRef, {
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
