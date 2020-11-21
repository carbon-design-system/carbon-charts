import React from "react";

import { TreemapChart as TC } from "@carbon/charts";
import BaseChart from "./base-chart";

export default class TreemapChart extends BaseChart {
	componentDidMount() {
		this.chart = new TC(
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
