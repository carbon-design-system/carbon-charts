import React from "react";

import { RadarChart as RC } from "@carbon/charts";
import BaseChart from "./base-chart";

export default class RadarChart extends BaseChart {
	componentDidMount() {
		this.chart = new RC(
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
