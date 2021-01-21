import React from 'react';
import { RadarChart as RC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, RadarChartOptions } from '@carbon/charts/interfaces';

type RadarChartProps = ChartConfig<RadarChartOptions>;

export default class RadarChart extends BaseChart<RadarChartOptions> {
	chartRef!: HTMLDivElement;
	props!: RadarChartProps;
	chart!: RC;

	componentDidMount() {
		this.chart = new RC(this.chartRef, {
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
