import React from "react";

import { LineChart as LC } from "@carbon/charts/dist/index.umd.js";
import BaseChart from "./base-chart";

export default class LineChart extends BaseChart {
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
      )
    }
}
