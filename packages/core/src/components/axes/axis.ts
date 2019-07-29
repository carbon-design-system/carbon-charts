// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { ModelStateKeys } from "../../interfaces";

// D3 Imports
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import { min, max } from "d3-array";

export class Axis extends Component {
	type = "cc-axes";

	options: any;

	margins: any;

	constructor(options?: any) {
		super();

		this.options = options;

		this.margins = {
			top: this.options.axes[ModelStateKeys.AXIS_FOURTH] ? 51 : 0,
			right: this.options.axes[ModelStateKeys.AXIS_THIRD] ? 45 : 0,
			bottom: this.options.axes[ModelStateKeys.AXIS_SECONDARY] ? 50 : 0,
			left: this.options.axes[ModelStateKeys.AXIS_PRIMARY] ? 45 : 0
		};
	}

	render() {
		if (this.options.axes[ModelStateKeys.AXIS_PRIMARY]) {
			this.renderPrimaryAxis();
		}

		if (this.options.axes[ModelStateKeys.AXIS_SECONDARY]) {
			this.renderSecondaryAxis();
		}

		if (this.options.axes[ModelStateKeys.AXIS_THIRD]) {
			this.renderThirdAxis();
		}

		if (this.options.axes[ModelStateKeys.AXIS_FOURTH]) {
			this.renderFourthAxis();
		}
	}

	// Render left y-axis
	renderPrimaryAxis() {
		const svg = this.getContainerSVG();
		const { height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		const primaryScale = this._model.get(ModelStateKeys.AXIS_PRIMARY) || scaleLinear();
		primaryScale
			.domain([this.getYMin(), this.getYMax()])
			.range([height - this.margins.bottom, this.margins.top]);

		// If scale doesn't exist in the model, store it
		if (!this._model.get(ModelStateKeys.AXIS_PRIMARY)) {
			this._model.set({
				[ModelStateKeys.AXIS_PRIMARY]: primaryScale
			});
		}

		// Initialize axis object
		const primaryAxis = axisLeft(primaryScale)
			.ticks(5)
			.tickSizeOuter(0);
			// .tickFormat(this._model.getOptions().scales.y.formatter);

		// Add axis into the parent
		this._services.domUtils.appendOrSelect(svg, "g.axis.primary")
			.attr("transform", "translate(" + this.margins.left + ",0)")
			.transition(this._services.transitions.getDefaultTransition())
			.call(primaryAxis);
	}

	// Render bottom x-axis
	renderSecondaryAxis() {
		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		const secondaryScale = this._model.get(ModelStateKeys.AXIS_SECONDARY) || scaleBand();

		const startPosition = this.options.axes[ModelStateKeys.AXIS_PRIMARY] ? this.margins.left : 0;
		const endPosition = this.options.axes[ModelStateKeys.AXIS_THIRD] ? width - this.margins.right : width;
		secondaryScale.rangeRound([startPosition, endPosition])
			.domain(this._model.getDisplayData().labels);

		// If scale doesn't exist in the model, store it
		if (!this._model.get(ModelStateKeys.AXIS_SECONDARY)) {
			this._model.set({
				[ModelStateKeys.AXIS_SECONDARY]: secondaryScale
			});
		}

		// Initialize axis object
		const secondaryAxis = axisBottom(secondaryScale)
			.ticks(5)
			.tickSizeOuter(0);

		// Add axis into the parent
		const axisRef = this._services.domUtils.appendOrSelect(svg, "g.axis.secondary");
		axisRef.attr("transform", "translate(0," + (height - this.margins.bottom) + ")")
			.transition(this._services.transitions.getDefaultTransition())
			.call(secondaryAxis);

		// Update the position of the pieces of text inside x-axis
		axisRef.selectAll("g.tick text")
			.attr("y", Configuration.scales.magicY1)
			.attr("x", Configuration.scales.magicX1)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.scales.xAxisAngle})`)
			.style("text-anchor", "end");
			// .call(text => this.wrapTick(text));
	}

	// Render right y-axis
	renderThirdAxis() {
		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		const thirdScale = this._model.get(ModelStateKeys.AXIS_THIRD) || scaleLinear();
		thirdScale
			.domain([0, this.getYMax()])
			.range([height - this.margins.bottom, this.margins.top]);

		// If scale doesn't exist in the model, store it
		if (!this._model.get(ModelStateKeys.AXIS_THIRD)) {
			this._model.set({
				[ModelStateKeys.AXIS_THIRD]: thirdScale
			});
		}

		// Initialize axis object
		const thirdAxis = axisRight(thirdScale)
			.ticks(5)
			.tickSizeOuter(0);

		// Add axis into the parent
		this._services.domUtils.appendOrSelect(svg, "g.axis.third")
			.attr("transform", "translate(" + (width - this.margins.right) + ",0)")
			.transition(this._services.transitions.getDefaultTransition())
			.call(thirdAxis);
	}

	// Render top x-axis
	renderFourthAxis() {
		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		const fourthScale = this._model.get(ModelStateKeys.AXIS_SECONDARY) || scaleBand();

		const startPosition = this.options.axes[ModelStateKeys.AXIS_PRIMARY] ? this.margins.left : 0;
		const endPosition = this.options.axes[ModelStateKeys.AXIS_FOURTH] ? width - this.margins.right : width;
		fourthScale.rangeRound([startPosition, endPosition])
			.domain(this._model.getDisplayData().labels);

		// If scale doesn't exist in the model, store it
		if (!this._model.get(ModelStateKeys.AXIS_FOURTH)) {
			this._model.set({
				[ModelStateKeys.AXIS_FOURTH]: fourthScale
			});
		}

		// Initialize axis object
		const fourthAxis = axisTop(fourthScale)
			.ticks(5)
			.tickSizeOuter(0);

		// Add axis into the parent
		const axisRef = this._services.domUtils.appendOrSelect(svg, "g.axis.fourth");
		axisRef.attr("transform", "translate(0," + (this.margins.top) + ")")
			.transition(this._services.transitions.getDefaultTransition())
			.call(fourthAxis);

		// Update the position of the pieces of text inside x-axis
		axisRef.selectAll("g.tick text")
			.attr("y", Configuration.scales.magicY2)
			.attr("x", Configuration.scales.magicX2)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.scales.xAxisAngle})`)
			.style("text-anchor", "start");
	}

	getYMax() {
		const { datasets } = this._model.getDisplayData();
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
		const { datasets } = this._model.getDisplayData();
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
