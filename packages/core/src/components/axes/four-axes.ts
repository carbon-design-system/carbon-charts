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
	type = "cc-four-axes";

	options: any;

	margins: any;

	children: Array<Axis> = [];

	constructor(options?: any) {
		super();

		this.options = options;

		this.margins = {
			top: this.options.axes[AxisPositions.TOP] ? 51 : 0,
			right: this.options.axes[AxisPositions.RIGHT] ? 45 : 0,
			bottom: this.options.axes[AxisPositions.BOTTOM] ? 50 : 0,
			left: this.options.axes[AxisPositions.LEFT] ? 45 : 0
		};

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
		//         if (this.options.axes[AxisPositions.LEFT]) {
		//             this.renderLeftAxis();
		//         }

		//         if (this.options.axes[AxisPositions.BOTTOM]) {
		//             this.renderBottomAxis();
		//         }

		//         if (this.options.axes[AxisPositions.RIGHT]) {
		//             this.renderRightAxis();
		//         }

		//         if (this.options.axes[AxisPositions.TOP]) {
		//             this.renderTopAxis();
		//         }
	}

	createOrGrabScale(scaleT, scaleFunction: any = scaleLinear) {
		// Grab the scale off of the model, and initialize if it doesn't exist
		const scale = this._model.get(scaleT) || scaleFunction();

		// If scale doesn't exist in the model, store it
		if (!this._model.get(scaleT)) {
			this._model.set({
				[scaleT]: scale
			});
		}

		return scale;
	}

	// Render left y-axis
	renderLeftAxis() {

	}

	// Render bottom x-axis
	renderBottomAxis() {
		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		// const scale = this.createOrGrabScale(ModelStateKeys.AXIS_SECONDARY, scaleBand);

		const scale = this.createOrGrabScale(AxisPositions.BOTTOM);

		const startPosition = this.options.axes[AxisPositions.LEFT] ? this.margins.left : 0;
		const endPosition = this.options.axes[AxisPositions.RIGHT] ? width - this.margins.right : width;
		// scale.rangeRound([startPosition, endPosition])
		//  .domain(this._model.getDisplayData().labels);
		scale.domain([this.getYMin(), this.getYMax()]).range([startPosition, endPosition]);

		// Initialize axis object
		const secondaryAxis = axisBottom(scale)
			.ticks(width > 400 ? 8 : 3)
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

		console.log("scale", scale.domain());
	}

	// Render right y-axis
	renderRightAxis() {
		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		const scale = this.createOrGrabScale(AxisPositions.RIGHT, scaleLinear);
		scale
			.domain([0, this.getYMax()])
			.range([height - this.margins.bottom, this.margins.top]);

		// Initialize axis object
		const thirdAxis = axisRight(scale)
			.ticks(5)
			.tickSizeOuter(0);

		// Add axis into the parent
		this._services.domUtils.appendOrSelect(svg, "g.axis.third")
			.attr("transform", "translate(" + (width - this.margins.right) + ",0)")
			.transition(this._services.transitions.getDefaultTransition())
			.call(thirdAxis);
	}

	// Render top x-axis
	renderTopAxis() {
		const svg = this.getContainerSVG();
		const { width, height } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// Grab the scale off of the model, and initialize if it doesn't exist
		const scale = this.createOrGrabScale(AxisPositions.TOP, scaleBand);

		const startPosition = this.options.axes[AxisPositions.LEFT] ? this.margins.left : 0;
		const endPosition = this.options.axes[AxisPositions.TOP] ? width - this.margins.right : width;
		scale.rangeRound([startPosition, endPosition])
			.domain(this._model.getDisplayData().labels);

		// Initialize axis object
		const fourthAxis = axisTop(scale)
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
			if (Tools.getProperty(scales, "bottom", "type") === "time") {
				yMax = max(datasets[0].data, (d: any) => d.value);
			} else {
				yMax = max(datasets[0].data);
			}
		} else {
			if (Tools.getProperty(scales, "bottom", "type") === "time") {
				yMax = max(datasets, (d: any) => {
					return max(d.data, (datum: any) => datum.value);
				});
			} else {
				yMax = max(datasets, (d: any) => (max(d.data)));
			}
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
			if (Tools.getProperty(scales, "bottom", "type") === "time") {
				yMin = min(datasets[0].data, (d: any) => d.value);
			} else {
				yMin = min(datasets[0].data);
			}
		} else {
			if (Tools.getProperty(scales, "bottom", "type") === "time") {
				yMin = min(datasets, (d: any) => {
					return min(d.data, (datum: any) => datum.value);
				});
			} else {
				yMin = min(datasets, (d: any) => (min(d.data)));
			}
		}

		if (scales.y.yMinAdjuster) {
			yMin = scales.y.yMinAdjuster(yMin);
		}

		return yMin;
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
