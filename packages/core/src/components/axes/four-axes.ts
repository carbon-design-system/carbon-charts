// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { ModelStateKeys, AxisPositions } from "../../interfaces";
import { Tools } from "../../tools";
import { Axis } from "./axis";

// D3 Imports
import { scaleBand, scaleLinear, scaleTime } from "d3-scale";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import { min, max } from "d3-array";
import { timeFormat } from "d3-time-format";

export class FourAxes extends Component {
	type = "four-axes";

	options: any;

	margins: any;

	children: Array<Axis> = [];

	constructor(options?: any) {
		super();

		this.options = options;

		// Check the configs to know which axes need to be rendered
		const axisPositions = Object.keys(AxisPositions).map(axisPositionKey => AxisPositions[axisPositionKey]);
		axisPositions.forEach(axisPosition => {
			if (this.options.axes[axisPosition]) {
				const axisComponent = new Axis({
					position: axisPosition,
					axes: this.options.axes
				});

				this.children.push(axisComponent);
			}
		});
	}

	render() {
		this.children.forEach(child => {
			child.render();
		});
	}

	setParent(parent: any) {
		super.setParent(parent);

		this.children.forEach(child => {
			child.setParent(this._parent);
		});
	}


	// Pass on model to children as well
	setModel(newObj) {
		super.setModel(newObj);

		this.children.forEach(child => {
			child.setModel(newObj);
		});
	}

	// Pass on essentials to children as well
	setServices(newObj) {
		super.setServices(newObj);

		this.children.forEach(child => {
			child.setServices(newObj);
		});
	}
}
