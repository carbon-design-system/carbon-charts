import React from "react";

import { ScatterChart as SC } from "@ibm-sterling/charts";
import BaseChart from "./base-chart";

export default class ScatterChart extends BaseChart {
	componentDidMount() {
		this.chart = new SC(
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
