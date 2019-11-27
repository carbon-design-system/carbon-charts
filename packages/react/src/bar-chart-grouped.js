import React from "react";

import { GroupedBarChart as GBC } from "@ibm-sterling/charts";
import BaseChart from "./base-chart";

export default class GroupedBarChart extends BaseChart {
	componentDidMount() {
		this.chart = new GBC(
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
