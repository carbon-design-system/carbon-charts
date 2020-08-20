import React from "react";

import { LegendChart as LC } from "@carbon/charts";
import BaseChart from "./base-chart";

export default class LegendChart extends BaseChart {
	componentDidMount() {
		this.chart = new LC(
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
