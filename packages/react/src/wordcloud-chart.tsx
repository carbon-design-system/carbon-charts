import React from 'react';
import { WordCloudChart as WCC } from '@carbon/charts';
import BaseChart from './base-chart';
import { ChartConfig, WorldCloudChartOptions } from '@carbon/charts/interfaces';
import { hasChartBeenInitialized } from './utils';

type WordCloudChartProps = ChartConfig<WorldCloudChartOptions>;

export default class WordCloudChart extends BaseChart<WorldCloudChartOptions> {
	chartRef!: HTMLDivElement;
	props!: WordCloudChartProps;
	chart!: WCC;

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new WCC(this.chartRef, {
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
