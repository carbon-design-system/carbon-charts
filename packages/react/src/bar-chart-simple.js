import React from "react";

import { SimpleBarChart as SBC } from "@ibm-sterling/charts";
import BaseChart from "./base-chart";

export default class SimpleBarChart extends BaseChart {
	componentDidMount() {
		this.chart = new SBC(
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
