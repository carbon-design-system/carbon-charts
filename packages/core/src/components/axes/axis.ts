// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { ModelStateKeys, AxisPositions, ScaleTypes } from "../../interfaces";
import { Tools } from "../../tools";

// D3 Imports
import { scaleBand, scaleLinear, scaleTime, scaleLog } from "d3-scale";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import { min, max } from "d3-array";
import { timeFormat } from "d3-time-format";

const labelIdentifiers = ["label", "key", "date"];
const valueIdentifiers = ["value"];

export class Axis extends Component {
	type = "cc-axes";

	options: any;

	margins: any;

	scale: any;
	scaleType: ScaleTypes;

	constructor(options?: any) {
		super();

		if (options) {
			this.options = options;
		}

		this.margins = {
			top: 51,
			right: 45,
			bottom: 50,
			left: 45
		};
	}

	createOrGrabScale() {
		const { position } = this.options;
		const scaleOptions = Tools.getProperty(this._model.getOptions(), "axes", position);

		let scaleFunction;
		if (scaleOptions && scaleOptions.type === ScaleTypes.TIME) {
			scaleFunction = scaleTime();
		} else if (scaleOptions && scaleOptions.type === ScaleTypes.LOG) {
			scaleFunction = scaleLog().base(scaleOptions.base || 10);
		} else {
			scaleFunction = scaleLinear();
		}

		// If scale doesn't exist in the model, store it
		if (!this._model.get(position)) {
			this._model.set({
				[position]: this
			});
		}

		this.scale = scaleFunction;
		this.scaleType = (scaleOptions && scaleOptions.type) ? scaleOptions.type : ScaleTypes.LINEAR;

		return scaleFunction;
	}

	getScale() {
		return this.scale;
	}

	getScaleDomain() {
		const { position } = this.options;
		const scaleOptions = Tools.getProperty(this._model.getOptions(), "axes", position);

		if (scaleOptions && scaleOptions.type === ScaleTypes.TIME) {
			return [
				new Date(2019, 0, 1),
				new Date(2019, 0, 25)
			];
		} else if (scaleOptions && scaleOptions.type === ScaleTypes.LOG) {
			return [16, 2 ** 20];
		} else {
			return [this.getYMin(), this.getYMax()];
		}
	}

	render() {
		const { position: axisPosition } = this.options;

		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		let startPosition, endPosition;
		if (axisPosition === AxisPositions.BOTTOM || axisPosition === AxisPositions.TOP) {
			startPosition = this.options.axes[AxisPositions.LEFT] ? this.margins.left : 0;
	        endPosition = this.options.axes[AxisPositions.RIGHT] ? width - this.margins.right : width;
		} else {
			startPosition = height - this.margins.bottom;
			endPosition = this.margins.top;
		}

		// Grab the scale off of the model, and initialize if it doesn't exist
		const scale = this.createOrGrabScale();
		scale.domain(this.getScaleDomain())
			.range([startPosition, endPosition])
			.nice();

		// Identify the corresponding d3 axis function
		let axisFunction;
		switch (axisPosition) {
			case AxisPositions.LEFT:
				axisFunction = axisLeft;
				break;
			case AxisPositions.BOTTOM:
				axisFunction = axisBottom;
				break;
			case AxisPositions.RIGHT:
				axisFunction = axisRight;
				break;
			case AxisPositions.TOP:
				axisFunction = axisTop;
				break;
		}

		// Initialize axis object
		const axis = axisFunction(scale)
			.ticks(5)
			.tickSizeOuter(0)
			// .tickFormat(this._model.getOptions().scales.y.formatter);
			// .tickFormat(timeFormat("%b %d, %Y"));

		// Add axis into the parent
		const axisRef = this._services.domUtils.appendOrSelect(svg, `g.axis.${axisPosition}`);

		// Position and transition the axis
		switch (axisPosition) {
			case AxisPositions.LEFT:
				axisRef.attr("transform", "translate(" + this.margins.left + ",0)");
				break;
			case AxisPositions.BOTTOM:
				axisRef.attr("transform", "translate(0," + (height - this.margins.bottom) + ")");
				break;
			case AxisPositions.RIGHT:
				axisRef.attr("transform", "translate(" + (width - this.margins.right) + ",0)");
				break;
			case AxisPositions.TOP:
		        axisRef.attr("transform", "translate(0," + (this.margins.top) + ")");
				break;
		}

		// Apply new axis to the axis element
		axisRef.transition(this._services.transitions.getDefaultTransition())
			.call(axis);
	}

	getValueFromScale(datum: any) {
		console.log("get val", this.scale(datum.label))

		if (this.scaleType === ScaleTypes.TIME) {
			return this.scale(datum.label);
		} else {
			return this.scale(datum.value);
		}
	}

	getYMax() {
		const { datasets } = this._model.getDisplayData();
		const { axes } = this._model.getOptions();
		let yMax;

		yMax = max(datasets, (d: any) => {
			return max(d.data, (datum: any) => {
				return isNaN(datum) ? datum.value : datum;
			});
		});

		if (axes.y.yMaxAdjuster) {
			yMax = axes.y.yMaxAdjuster(yMax);
		}

		return yMax;
	}

	getYMin() {
		const { datasets } = this._model.getDisplayData();
		const { axes } = this._model.getOptions();
		let yMin;

		yMin = min(datasets, (d: any) => {
			return min(d.data, (datum: any) => {
				return isNaN(datum) ? datum.value : datum;
			});
		});

		if (axes.y.yMinAdjuster) {
			yMin = axes.y.yMinAdjuster(yMin);
		}

		return yMin;
	}
}
