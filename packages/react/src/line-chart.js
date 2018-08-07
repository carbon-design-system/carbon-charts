import React from 'react';

import { LineChart as LC } from "@peretz/charts/dist/bundle/bundle.js";
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
			style={{ height: 500 }}
		>
		</div>
      )
    }
}
