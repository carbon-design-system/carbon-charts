import React from 'react';
import { DonutChart as DC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, DonutChartOptions } from '@carbon/charts/interfaces';

type DonutChartProps = ChartConfig<DonutChartOptions>;

export default class DonutChart extends BaseChart<DonutChartOptions> {
	chartRef!: HTMLDivElement;
	props!: DonutChartProps;
	chart!: DC;

	componentDidMount() {
		this.chart = new DC(this.chartRef, {
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
