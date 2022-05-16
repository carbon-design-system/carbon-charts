import React from 'react';
import { BulletChart as BC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, BulletChartOptions } from '@carbon/charts/interfaces';
import { hasChartBeenInitialized } from './utils';

type BulletChartProps = ChartConfig<BulletChartOptions>;

export default class BulletChart extends BaseChart<BulletChartOptions> {
	chartRef!: HTMLDivElement;
	props!: BulletChartProps;
	chart!: BC;

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new BC(this.chartRef, {
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
