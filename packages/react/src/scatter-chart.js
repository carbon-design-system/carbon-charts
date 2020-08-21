import React from "react";

import { ScatterChart as SC } from "@carbon/charts";
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

	shouldComponentUpdate(nextProps, nextState){
		return this.props.data != nextProps.data || this.props.options != nextProps.options;
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
