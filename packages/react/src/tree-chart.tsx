import React from 'react';
import { TreeChart as TC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, TreeChartOptions } from '@carbon/charts/interfaces';
import { hasChartBeenInitialized } from './utils';

type TreeChartProps = ChartConfig<TreeChartOptions>;

export default class TreeChart extends BaseChart<TreeChartOptions> {
	chartRef!: HTMLDivElement;
	props!: TreeChartProps;
	chart!: TC;

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new TC(this.chartRef, {
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
