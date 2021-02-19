import React from 'react';
import { ComboChart as CC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, ComboChartOptions } from '@carbon/charts/interfaces';

type ComboChartProps = ChartConfig<ComboChartOptions>;

export default class ComboChart extends BaseChart<ComboChartOptions> {
	chartRef!: HTMLDivElement;
	props!: ComboChartProps;
	chart!: CC;

	componentDidMount() {
		this.chart = new CC(this.chartRef, {
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
