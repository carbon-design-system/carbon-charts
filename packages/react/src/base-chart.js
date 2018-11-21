import React from "react";

export default class BaseChart extends React.Component {
	constructor(props) {
		super(props);

		this.data = props.data;
		this.options = props.options;

		Object.assign(this, this.chart);
	}
}
