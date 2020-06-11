import React from "react";

import { StackedAreaChart as SAC } from "@carbon/charts";
import BaseChart from "./base-chart";

export default class StackedAreaChart extends BaseChart {
	componentDidMount() {
		this.chart = new SAC(
			this.chartRef,
			{
				data: this.props.data,
				options: this.props.options
			}
		);
	}

	render() {
		return (
			<div
				ref={chartRef => this.chartRef = chartRef}
				className="chart-holder">
			</div>
		);
	}
}
