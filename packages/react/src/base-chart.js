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

		Object.assign(this, this.chart);
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.props.data !== nextProps.data || this.props.options !== nextProps.options;
	}

	componentDidUpdate() {
		this.chart.model.setData(this.props.data);
		this.chart.model.setOptions(this.props.options);
	}
}
