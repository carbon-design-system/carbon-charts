import React from "react";

import { AreaChart as AC } from "@carbon/charts";
import BaseChart from "./base-chart";

export default class AreaChart extends BaseChart {
	componentDidMount() {
		this.chart = new AC(
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
