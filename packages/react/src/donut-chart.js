import React from "react";

import { DonutChart as DC } from "@ibm-sterling/charts";
import BaseChart from "./base-chart";

export default class DonutChart extends BaseChart {
	componentDidMount() {
		this.chart = new DC(
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
