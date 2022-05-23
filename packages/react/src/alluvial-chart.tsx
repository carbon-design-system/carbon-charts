import React from 'react';
import { AlluvialChart as AC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, AlluvialChartOptions } from '@carbon/charts/interfaces';
import { hasChartBeenInitialized } from './utils';

type AlluvialChartProps = ChartConfig<AlluvialChartOptions>;

export default class AlluvialChart extends BaseChart<AlluvialChartOptions> {
	chartRef!: HTMLDivElement;
	props!: AlluvialChartProps;
	chart!: AC;

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new AC(this.chartRef, {
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
