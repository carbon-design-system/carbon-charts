import React from "react";

export default class BaseChart extends React.Component {
	constructor(props) {
		super(props);

		this.data = props.data;
		this.options = props.options;

		// Width prop is mandatory for the wrappers
		if (props.width) {
			this.options.width = props.width;
		} else if (!this.options.width) {
			console.error("Missing `width` prop!");
		}

		// Height prop is mandatory for the wrappers
		if (props.height) {
			this.options.height = props.height;
		} else if (!this.options.height) {
			console.error("Missing `height` prop!");
		}

		Object.assign(this, this.chart);
	}

	componentDidUpdate(newProps) {
		const { data } = newProps;

		this.chart.setData(data);
	}
}
