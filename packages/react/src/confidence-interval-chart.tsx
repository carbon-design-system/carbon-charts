import React from "react";
import { ConfidenceIntervalChart as CI } from "@carbon/charts";
import BaseChart from "./base-chart";
import { ChartConfig, ConfidenceIntervalChartOptions } from "@carbon/charts/interfaces";

type ConfidenceIntervalChartProps = ChartConfig<ConfidenceIntervalChartOptions>;

export default class ConfidenceIntervalChart extends BaseChart<ConfidenceIntervalChartOptions> {
  chartRef?: HTMLDivElement;
  props!: ConfidenceIntervalChartProps;
  chart!: CI;

	componentDidMount() {
		this.chart = new CI( this.chartRef!, {
      data: this.props.data,
      options: this.props.options
    });
	}

	render() {
		return (
			<div
				ref={chartRef => (this.chartRef = chartRef!)}
				className="chart-holder">
			</div>
		);
	}
}
