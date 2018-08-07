import React from 'react';

import { PieChart as PC } from "@peretz/charts/dist/bundle/bundle.js";

export default class PieChart extends React.Component {
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

// PieChart.defaultProps = {
//     onUpdate: function () {}
// }
