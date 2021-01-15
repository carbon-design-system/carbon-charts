import React from 'react';
import { LollipopChart as LC } from '@carbon/charts';
import { ChartConfig, LollipopChartOptions } from '@carbon/charts/interfaces';
import BaseChart from './base-chart';

type LollipopChartProps = ChartConfig<LollipopChartOptions>;

export default class LollipopChart extends BaseChart<LollipopChartOptions> {
	chartRef?: HTMLDivElement;
	props!: LollipopChartProps;
	chart!: LC;

	componentDidMount() {
		this.chart = new LC(this.chartRef!, {
			data: this.props.data as any,
			options: this.props.options!,
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
