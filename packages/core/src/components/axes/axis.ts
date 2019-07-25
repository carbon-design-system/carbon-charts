// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { ModelStateKeys } from "../../interfaces";

// D3 Imports
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import { min, max } from "d3-array";

var margins = {
	top: 20,
	right: 45,
	bottom: 20,
	left: 45
};

export class Axis extends Component {
	options: any;

	constructor(options?: any) {
		super();

		this.options = options;
	}

	render() {
		this.renderPrimaryAxis();
		this.renderSecondaryAxis();
		this.renderThirdAxis();
		this.renderFourthAxis();
	}

	// Render left y-axis
	renderPrimaryAxis() {
		const svg = this.getContainerSVG();
		const { height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		let primaryScale = this._model.get(ModelStateKeys.AXIS_PRIMARY) || scaleLinear();
		primaryScale
			.domain([0, this.getYMax()])
			.range([height - margins.bottom, margins.top]);

		// If scale doesn't exist in the model, store it
		if (!this._model.get(ModelStateKeys.AXIS_PRIMARY)) {
			this._model.set({
				[ModelStateKeys.AXIS_PRIMARY]: primaryScale
			});
		}

		// Initialize axis object
		const primaryAxis = axisLeft(primaryScale)
			.ticks(5);

		// Add axis into the parent
		this._services.domUtils.appendOrSelect(svg, "g.axis.primary")
			.attr("transform", "translate(" + margins.left + ",0)")
			.call(primaryAxis);
	}

	// Render bottom x-axis
	renderSecondaryAxis() {
		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		let secondaryScale = this._model.get(ModelStateKeys.AXIS_SECONDARY) || scaleBand();

		let startPosition = this.options.axes[ModelStateKeys.AXIS_PRIMARY] ? margins.left : 0;
		let endPosition = this.options.axes[ModelStateKeys.AXIS_THIRD] ? width - margins.right : width;
		secondaryScale.rangeRound([startPosition, endPosition])
			.domain(this._model.getData().labels);

		// If scale doesn't exist in the model, store it
		if (!this._model.get(ModelStateKeys.AXIS_SECONDARY)) {
			this._model.set({
				[ModelStateKeys.AXIS_SECONDARY]: secondaryScale
			});
		}

		// Initialize axis object
		const secondaryAxis = axisBottom(secondaryScale)
			.ticks(5);
 
		// Add axis into the parent
		this._services.domUtils.appendOrSelect(svg, "g.axis.secondary")
			.attr("transform", "translate(0," + (height - margins.bottom) + ")")
			.call(secondaryAxis);
	}

	// Render right y-axis
	renderThirdAxis() {
		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		let thirdScale = this._model.get(ModelStateKeys.AXIS_THIRD) || scaleLinear();
		thirdScale
			.domain([0, this.getYMax()])
			.range([height - margins.bottom, margins.top]);

		// If scale doesn't exist in the model, store it
		if (!this._model.get(ModelStateKeys.AXIS_THIRD)) {
			this._model.set({
				[ModelStateKeys.AXIS_THIRD]: thirdScale
			});
		}

		// Initialize axis object
		const thirdAxis = axisRight(thirdScale)
			.ticks(5);

		// Add axis into the parent
		this._services.domUtils.appendOrSelect(svg, "g.axis.third")
			.attr("transform", "translate(" + (width - margins.right) + ",0)")
			.call(thirdAxis);
	}

	// Render top x-axis
	renderFourthAxis() {
		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		let fourthScale = this._model.get(ModelStateKeys.AXIS_SECONDARY) || scaleBand();

		let startPosition = this.options.axes[ModelStateKeys.AXIS_PRIMARY] ? margins.left : 0;
		let endPosition = this.options.axes[ModelStateKeys.AXIS_FOURTH] ? width - margins.right : width;
		fourthScale.rangeRound([startPosition, endPosition])
			.domain(this._model.getData().labels);

		// If scale doesn't exist in the model, store it
		if (!this._model.get(ModelStateKeys.AXIS_FOURTH)) {
			this._model.set({
				[ModelStateKeys.AXIS_FOURTH]: fourthScale
			});
		}

		// Initialize axis object
		const fourthAxis = axisTop(fourthScale)
			.ticks(5);
 
		// Add axis into the parent
		this._services.domUtils.appendOrSelect(svg, "g.axis.fourth")
			.attr("transform", "translate(0," + (margins.top) + ")")
			.call(fourthAxis);
	}

	getYMax() {
		const { datasets } = this._model.getData();
		const { scales } = this._model.getOptions();
		let yMax;

 		if (datasets.length === 1) {
			yMax = max(datasets[0].data);
		} else {
			yMax = max(datasets, (d: any) => (max(d.data)));
		}

 		if (scales.y.yMaxAdjuster) {
			yMax = scales.y.yMaxAdjuster(yMax);
		}

 		return yMax;
	}

 	getYMin() {
		const { datasets } = this._model.getData();
		const { scales } = this._model.getOptions();
		let yMin;

 		if (datasets.length === 1) {
			yMin = min(datasets[0].data);
		} else {
			yMin = min(datasets, (d: any) => (min(d.data)));
		}

 		if (scales.y.yMinAdjuster) {
			yMin = scales.y.yMinAdjuster(yMin);
		}

 		return yMin;
	}
}
