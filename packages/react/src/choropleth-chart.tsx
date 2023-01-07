import React from 'react';
import { EXPERIMENTAL_ChoroplethChart as CC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, ThematicChartOptions } from '@carbon/charts/interfaces';
import { hasChartBeenInitialized } from './utils';

type ChoroplethChartProps = ChartConfig<ThematicChartOptions>;

export default class EXPERIMENTAL_ChoroplethChart extends BaseChart<ThematicChartOptions> {
	chartRef!: HTMLDivElement;
	props!: ChoroplethChartProps;
	chart!: CC;

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new CC(this.chartRef, {
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
