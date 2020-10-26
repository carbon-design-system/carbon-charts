import React from "react";

import { ConfidenceIntervalChart as CI } from "@carbon/charts";
import BaseChart from "./base-chart";

export default class ConfidenceIntervalChart extends BaseChart {
	componentDidMount() {
		this.chart = new CI(
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
