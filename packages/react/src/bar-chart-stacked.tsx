import React from 'react';
import { StackedBarChart as SBC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, StackedBarChartOptions } from '@carbon/charts/interfaces';
import { hasChartBeenInitialized } from './utils';

type StackedBarChartProps = ChartConfig<StackedBarChartOptions>;

export default class StackedBarChart extends BaseChart<StackedBarChartOptions> {
	chartRef!: HTMLDivElement;
	props!: StackedBarChartProps;
	chart!: SBC;

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new SBC(this.chartRef, {
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
