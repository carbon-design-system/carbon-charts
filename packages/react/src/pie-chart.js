import React from 'react';

import { PieChart as PC } from "@peretz/charts";
import BaseChart from "./base-chart";

export default class PieChart extends BaseChart {
	componentDidMount() {
		this.chart = new PC(
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
			style={{ height: 500 }}
		>
		</div>
      )
    }
}
