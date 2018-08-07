import React from 'react';

import { BarChart as BC } from "@peretz/charts/dist/bundle/bundle.js";
import BaseChart from "./base-chart";

export default class BarChart extends BaseChart {
	componentDidMount() {
		this.chart = new BC(
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
