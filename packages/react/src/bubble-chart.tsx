import React from 'react';
import { BubbleChart as BC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, BubbleChartOptions } from '@carbon/charts/interfaces';

type BubbleChartProps = ChartConfig<BubbleChartOptions>;

export default class BubbleChart extends BaseChart<BubbleChartOptions> {
	chartRef!: HTMLDivElement;
	props!: BubbleChartProps;
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
