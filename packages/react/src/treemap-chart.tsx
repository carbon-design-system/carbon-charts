import React from 'react';
import { TreemapChart as TC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, TreemapChartOptions } from '@carbon/charts/interfaces';

type TreemapChartProps = ChartConfig<TreemapChartOptions>;

export default class TreemapChart extends BaseChart<TreemapChartOptions> {
	chartRef!: HTMLDivElement;
	props!: TreemapChartProps;
	chart!: TC;

	componentDidMount() {
		this.chart = new TC(this.chartRef, {
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
