import React from 'react';
import { GroupedBarChart as GBC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, BarChartOptions } from '@carbon/charts/interfaces';

type GroupedBarChartProps = ChartConfig<BarChartOptions>;

export default class GroupedBarChart extends BaseChart<BarChartOptions> {
	chartRef!: HTMLDivElement;
	props!: GroupedBarChartProps;
	chart!: GBC;

	componentDidMount() {
		this.chart = new GBC(this.chartRef, {
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
