import React from 'react';
import { CirclePackChart as CPC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, CirclePackChartOptions } from '@carbon/charts/interfaces';

type CirclePackChartProps = ChartConfig<CirclePackChartOptions>;

export default class CirclePackChart extends BaseChart<CirclePackChartOptions> {
	chartRef!: HTMLDivElement;
	props!: CirclePackChartProps;
	chart!: CPC;

	componentDidMount() {
		this.chart = new CPC(this.chartRef, {
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
