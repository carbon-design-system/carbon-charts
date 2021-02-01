import React from 'react';
import { MeterChart as MC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, MeterChartOptions } from '@carbon/charts/interfaces';

type MeterChartProps = ChartConfig<MeterChartOptions>;

export default class MeterChart extends BaseChart<MeterChartOptions> {
	chartRef!: HTMLDivElement;
	props!: MeterChartProps;
	chart!: MC;

	componentDidMount() {
		this.chart = new MC(this.chartRef, {
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
