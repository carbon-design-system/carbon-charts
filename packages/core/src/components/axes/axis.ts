// Internal Imports
import { Component } from "../component";
import { AxisPositions, ScaleTypes, AxisTypes } from "../../interfaces";
import { Tools } from "../../tools";
import { ChartModel } from "../../model";
import { DOMUtils } from "../../services";

// D3 Imports
import { scaleBand, scaleLinear, scaleTime, scaleLog, scaleOrdinal } from "d3-scale";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import { min, max, extent } from "d3-array";

export class Axis extends Component {
	type = "axes";

	margins: any;

	scale: any;
	scaleType: ScaleTypes;

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);

		if (configs) {
			this.configs = configs;
		}

		this.margins = this.configs.margins;
	}

	createOrGrabScale() {
		const { position } = this.configs;
		const scaleOptions = Tools.getProperty(this.model.getOptions(), "axes", position);

		let scaleFunction;
		if (scaleOptions && scaleOptions.type === ScaleTypes.TIME) {
			scaleFunction = scaleTime();
		} else if (scaleOptions && scaleOptions.type === ScaleTypes.LOG) {
			scaleFunction = scaleLog().base(scaleOptions.base || 10);
		} else if (scaleOptions && scaleOptions.type === ScaleTypes.LABELS) {
			scaleFunction = scaleBand();
		} else {
			scaleFunction = scaleLinear();
		}

		// If scale doesn't exist in the model, store it
		if (!this.model.get(position)) {
			const modelUpdates = {
				[position]: this
			};

			if (scaleOptions) {
				if (scaleOptions.primary === true) {
					modelUpdates[AxisTypes.PRIMARY] = this;
				}

				if (scaleOptions.secondary === true) {
					modelUpdates[AxisTypes.SECONDARY] = this;
				}
			}

			this.model.set(modelUpdates, true);
		}

		this.scale = scaleFunction;
		this.scaleType = (scaleOptions && scaleOptions.type) ? scaleOptions.type : ScaleTypes.LINEAR;

		return scaleFunction;
	}

	getScale() {
		return this.scale;
	}

	getScaleDomain() {
		const { position } = this.configs;
		const scaleOptions = Tools.getProperty(this.model.getOptions(), "axes", position);

		const { datasets, labels } = this.model.getDisplayData();

		// If scale is a LABELS scale, return some labels as the domain
		if (scaleOptions && scaleOptions.type === ScaleTypes.LABELS) {
			if (labels) {
				return labels;
			} else {
				return this.model.getDisplayData().datasets[0].data.map((d, i) => i + 1);
			}
		}

		// Get the extent of the domain
		let domain;
		// If the scale is stacked
		if (scaleOptions.stacked) {
			domain = extent(
				labels.reduce((m, label: any, i) => {
					const correspondingValues = datasets.map(dataset => {
						return !isNaN(dataset.data[i]) ? dataset.data[i] : dataset.data[i].value;
					});
					const totalValue = correspondingValues.reduce((a, b) => a + b, 0);

					// Save both the total value and the minimum
					return m.concat(totalValue, min(correspondingValues));
				}, [])
				// Currently stack layouts in the library
				// Only support positive values
				.concat(0)
			);
		} else {
			// Get all the chart's data values in a flat array
			let allDataValues = datasets.reduce((m, dataset: any) => {
				dataset.data.forEach((datum: any) => {
					if (scaleOptions.type === ScaleTypes.TIME) {
						m = m.concat(datum.date);
					} else {
						m = m.concat(isNaN(datum) ? datum.value : datum);
					}
				});

				return m;
			}, []);

			if (scaleOptions.type !== ScaleTypes.TIME) {
				allDataValues = allDataValues.concat(0);
			}

			domain = extent(
				allDataValues
			);
		}

		if (scaleOptions.type === ScaleTypes.TIME) {
			return [
				new Date(domain[0]),
				new Date(domain[1])
			];
		}

		return domain;
	}

	render(animate = true) {
		const { position: axisPosition } = this.configs;
		const axisOptions = Tools.getProperty(this.model.getOptions(), "axes", axisPosition);

		const svg = this.getContainerSVG();
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });

		let startPosition, endPosition;
		if (axisPosition === AxisPositions.BOTTOM || axisPosition === AxisPositions.TOP) {
			startPosition = this.configs.axes[AxisPositions.LEFT] ? this.margins.left : 0;
	        endPosition = this.configs.axes[AxisPositions.RIGHT] ? width - this.margins.right : width;
		} else {
			startPosition = height - this.margins.bottom;
			endPosition = this.margins.top;
		}

		// Grab the scale off of the model, and initialize if it doesn't exist
		const scale = this.createOrGrabScale()
			.domain(this.getScaleDomain());

		if (axisOptions && axisOptions.type === ScaleTypes.LABELS) {
			scale.rangeRound([startPosition, endPosition]);
		} else {
			scale.range([startPosition, endPosition]);
				// .nice();
		}

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
			.tickSizeOuter(0)
			.tickFormat(axisOptions ? axisOptions.formatter : null);
			// .tickFormat(timeFormat("%b %d, %Y"));

		if (scale.ticks) {
			axis.ticks(5);

			if (this.scaleType === ScaleTypes.TIME) {
				axis.tickValues(scale.ticks(5).concat(scale.domain()));
			}
		}

		// Add axis into the parent
		const axisRefExists = !svg.select(`g.axis.${axisPosition}`).empty();
		const axisRef = DOMUtils.appendOrSelect(svg, `g.axis.${axisPosition}`);

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
		if (!animate || !axisRefExists) {
			axisRef.call(axis);
		} else {
			axisRef.transition(this.services.transitions.getTransition("axis-update"))
				.call(axis);
		}

		if (scale.step &&
			(axisPosition === AxisPositions.BOTTOM || axisPosition === AxisPositions.TOP)) {
			const textNodes = axisRef.selectAll("g.tick text").nodes();

			// If any ticks are any larger than the scale step size
			if (textNodes.some(textNode => DOMUtils.getSVGElementSize(textNode, { useBBox: true }).width >= scale.step())) {
				axisRef.selectAll("g.tick text")
					.attr("transform", `rotate(45)`)
					.style("text-anchor", axisPosition === AxisPositions.TOP ? "end" : "start");

				return;
			}

			axisRef.selectAll("g.tick text")
				.attr("transform",  null)
				.style("text-anchor", null);
		}
	}

	getValueFromScale(datum: any, index?: number) {
		const value = isNaN(datum) ? datum.value : datum;
		if (this.scaleType === ScaleTypes.LABELS) {
			const correspondingLabel = this.model.getDisplayData().labels[index];
			return this.scale(correspondingLabel) + this.scale.step() / 2;
		} else if (this.scaleType === ScaleTypes.TIME) {
			return this.scale(new Date(datum.date || datum.label));
		} else {
			return this.scale(value);
		}
	}

	getYMax() {
		const { datasets } = this.model.getDisplayData();
		const { axes } = this.model.getOptions();
		let yMax;

		yMax = max(datasets, (d: any) => {
			return max(d.data, (datum: any) => {
				return isNaN(datum) ? datum.value : datum;
			});
		});

		// if (axes.y.yMaxAdjuster) {
		// 	yMax = axes.y.yMaxAdjuster(yMax);
		// }

		return yMax;
	}

	getYMin() {
		const { datasets } = this.model.getDisplayData();
		const { axes } = this.model.getOptions();
		let yMin;

		yMin = min(datasets, (d: any) => {
			return min(d.data, (datum: any) => {
				return isNaN(datum) ? datum.value : datum;
			});
		});

		// if (axes.y.yMinAdjuster) {
		// 	yMin = axes.y.yMinAdjuster(yMin);
		// }

		return yMin;
	}

	getElementRef() {
		const { position } = this.configs;

		return DOMUtils.appendOrSelect(this.getContainerSVG(), `g.axis.${position}`);
	}
}
