import React from 'react';
import { SimpleBarChart as SBC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, BarChartOptions } from '@carbon/charts/interfaces';

type SimpleBarChartProps = ChartConfig<BarChartOptions>;

export default class SimpleBarChart extends BaseChart<BarChartOptions> {
	chartRef!: HTMLDivElement;
	props!: SimpleBarChartProps;
	chart!: SBC;

	componentDidMount() {
		this.chart = new SBC(this.chartRef, {
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
