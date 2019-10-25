import React from "react";

export default class BaseChart extends React.Component {
	constructor(props) {
		super(props);

		const { options, data } = props;
		if (!options) {
			console.error("Missing options!");
		}

		if (!data) {
			console.error("Missing data!");
		}

		this.data = props.data || {};
		this.options = props.options || {};

		// Width prop is mandatory for the wrappers
		if (props.width) {
			this.options.width = props.width;
		}

		// Height prop is mandatory for the wrappers
		if (props.height) {
			this.options.height = props.height;
		}

		Object.assign(this, this.chart);
	}

	componentDidUpdate() {
		this.chart.model.setData(this.props.data);
		this.chart.model.setOptions(this.props.options);
	}
}
