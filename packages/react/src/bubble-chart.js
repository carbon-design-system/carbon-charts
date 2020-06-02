import React from "react";

import { BubbleChart as BC } from "@carbon/charts";
import BaseChart from "./base-chart";

export default class BubbleChart extends BaseChart {
	componentDidMount() {
		this.chart = new BC(
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
