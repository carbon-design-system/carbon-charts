import React from "react";

import { ComboChart as CC } from "@carbon/charts";
import BaseChart from "./base-chart";

export default class ComboChart extends BaseChart {
	componentDidMount() {
		this.chart = new CC(
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
