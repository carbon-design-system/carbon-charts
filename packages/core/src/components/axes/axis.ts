// Internal Imports
import { Component } from "../component";
import { AxisPositions, ScaleTypes, AxisTypes } from "../../interfaces";
import { Tools } from "../../tools";
import { ChartModel } from "../../model";
import { DOMUtils } from "../../services";
const englishLocale = require("d3-time-format/locale/en-US.json");

// D3 Imports
import { scaleBand, scaleLinear, scaleTime, scaleLog, scaleOrdinal } from "d3-scale";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import { min, extent } from "d3-array";
import { timeFormatDefaultLocale } from "d3-time-format";

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

	createOrGetScale() {
		const { position } = this.configs;
		const axisOptions = Tools.getProperty(this.model.getOptions(), "axes", position);
		this.scaleType = (axisOptions && axisOptions.scaleType) ? axisOptions.scaleType : ScaleTypes.LINEAR;

		let scaleFunction;
		if (this.scaleType === ScaleTypes.TIME) {
			scaleFunction = scaleTime();
		} else if (this.scaleType === ScaleTypes.LOG) {
			scaleFunction = scaleLog().base(axisOptions.base || 10);
		} else if (this.scaleType === ScaleTypes.LABELS) {
			scaleFunction = scaleBand();
		} else {
			scaleFunction = scaleLinear();
		}

		// If scale doesn't exist in the model, store it
		if (!this.model.get(position)) {
			const modelUpdates = {
				[position]: this
			};

			if (axisOptions) {
				if (axisOptions.primary === true) {
					modelUpdates[AxisTypes.PRIMARY] = this;
				}

				if (axisOptions.secondary === true) {
					modelUpdates[AxisTypes.SECONDARY] = this;
				}
			}

			this.model.set(modelUpdates, true);
		}

		this.scale = scaleFunction;

		return scaleFunction;
	}

	getScale() {
		return !this.scale ? this.createOrGetScale() : this.scale;
	}

	getScaleDomain() {
		const options = this.model.getOptions();
		const { position } = this.configs;
		const axisOptions = Tools.getProperty(options, "axes", position);

		const { datasets, labels } = this.model.getDisplayData();

		// If scale is a LABELS scale, return some labels as the domain
		if (axisOptions && axisOptions.scaleType === ScaleTypes.LABELS) {
			if (labels) {
				return labels;
			} else {
				return this.model.getDisplayData().datasets[0].data.map((d, i) => i + 1);
			}
		}

		// Get the extent of the domain
		let domain;
		// If the scale is stacked
		if (axisOptions.stacked) {
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
			let allDataValues = datasets.reduce((dataValues, dataset: any) => {
				dataset.data.forEach((datum: any) => {
					if (axisOptions.scaleType === ScaleTypes.TIME) {
						dataValues = dataValues.concat(datum.date);
					} else {
						dataValues = dataValues.concat(isNaN(datum) ? datum.value : datum);
					}
				});

				return dataValues;
			}, []);

			if (axisOptions.scaleType !== ScaleTypes.TIME) {
				allDataValues = allDataValues.concat(0);
			}

			domain = extent(allDataValues);
		}

		if (axisOptions.scaleType === ScaleTypes.TIME) {
			if (Tools.getProperty(options, "timeScale", "addSpaceOnEdges")) {
				// TODO - Need to account for non-day incrementals as well
				const [startDate, endDate] = domain;
				startDate.setDate(startDate.getDate() - 1);
				endDate.setDate(endDate.getDate() + 1);
			}

			return [
				new Date(domain[0]),
				new Date(domain[1])
			];
		}

		// TODO - Work with design to improve logic
		domain[1] = domain[1] * 1.1;
		return domain;
	}

	render(animate = true) {
		const { position: axisPosition } = this.configs;
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes", axisPosition);

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
		const scale = this.createOrGetScale().domain(this.getScaleDomain());

		if (this.scaleType === ScaleTypes.LABELS) {
			scale.rangeRound([startPosition, endPosition]);
		} else {
			scale.range([startPosition, endPosition]);
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

		// Set the date/time locale
		if (this.scaleType === ScaleTypes.TIME) {
			const timeLocale = Tools.getProperty(options, "locale", "time");
			if (timeLocale) {
				timeFormatDefaultLocale(timeLocale);
			} else {
				timeFormatDefaultLocale(englishLocale);
			}
		}

		// Initialize axis object
		const axis = axisFunction(scale)
			.tickSizeOuter(0)
			.tickFormat(Tools.getProperty(axisOptions, "ticks", "formatter"));

		if (scale.ticks) {
			const numberOfTicks = 7;
			axis.ticks(numberOfTicks);

			if (this.scaleType === ScaleTypes.TIME) {
				let tickValues = scale.ticks(numberOfTicks).concat(scale.domain())
					.map(date => +date).sort();
				tickValues = Tools.removeArrayDuplicates(tickValues);

				// Remove labels on the edges
				// If there are more than 2 labels to show
				if (Tools.getProperty(options, "timeScale", "addSpaceOnEdges") && tickValues.length > 2) {
					tickValues.splice(tickValues.length - 1, 1);
					tickValues.splice(0, 1);
				}

				axis.tickValues(tickValues);
			}
		}

		// Add axis into the parent
		const container = DOMUtils.appendOrSelect(svg, `g.axis.${axisPosition}`);
		const axisRefExists = !container.select(`g.ticks`).empty();
		let axisRef = DOMUtils.appendOrSelect(container, `g.ticks`);

		// Position and transition the axis
		switch (axisPosition) {
			case AxisPositions.LEFT:
				axisRef.attr("transform", `translate(${this.margins.left}, 0)`);
				break;
			case AxisPositions.BOTTOM:
				axisRef.attr("transform", `translate(0, ${height - this.margins.bottom})`);
				break;
			case AxisPositions.RIGHT:
				axisRef.attr("transform", `translate(${width - this.margins.right}, 0)`);
				break;
			case AxisPositions.TOP:
				axisRef.attr("transform", `translate(0, ${this.margins.top})`);
				break;
		}

		// Position the axis title
		if (axisOptions.title) {
			const axisTitleRef = DOMUtils.appendOrSelect(container, `text.axis-title`)
				.text(axisOptions.title);

			switch (axisPosition) {
				case AxisPositions.LEFT:
					axisTitleRef.attr("transform", "rotate(-90)")
						.attr("y", 0)
						.attr("x", -(scale.range()[0] / 2))
						.attr("dy", "1em")
						.style("text-anchor", "middle");
					break;
				case AxisPositions.BOTTOM:
					axisTitleRef.attr("transform", `translate(${this.margins.left / 2 + scale.range()[1] / 2}, ${height})`)
						.style("text-anchor", "middle");
					break;
				case AxisPositions.RIGHT:
					axisTitleRef.attr("transform", "rotate(90)")
						.attr("y", -width)
						.attr("x", scale.range()[0] / 2)
						.attr("dy", "1em")
						.style("text-anchor", "middle");
					break;
				case AxisPositions.TOP:
					const { height: titleHeight } = DOMUtils.getSVGElementSize(axisTitleRef, { useBBox: true });
					axisTitleRef.attr("transform", `translate(${this.margins.left / 2 + scale.range()[1] / 2}, ${titleHeight / 2})`)
						.style("text-anchor", "middle");
					break;
			}
		}

		// Apply new axis to the axis element
		if (!animate || !axisRefExists) {
			axisRef = axisRef.call(axis);
		} else {
			axisRef = axisRef.transition(this.services.transitions.getTransition("axis-update"))
				.call(axis);
		}

		if (axisPosition === AxisPositions.BOTTOM || axisPosition === AxisPositions.TOP) {
			if (scale.step) {
				const textNodes = axisRef.selectAll("g.tick text").nodes();

				// If any ticks are any larger than the scale step size
				if (textNodes.some(textNode => DOMUtils.getSVGElementSize(textNode, { useBBox: true }).width >= scale.step())) {
					axisRef.selectAll("g.tick text")
						.attr("transform", `rotate(45)`)
						.style("text-anchor", axisPosition === AxisPositions.TOP ? "end" : "start");

					return;
				}
			} else {
				const estimatedTickSize = width / scale.ticks().length / 2;

				if (estimatedTickSize < 30) {
					axisRef.selectAll("g.tick text")
						.attr("transform", `rotate(45)`)
						.style("text-anchor", axisPosition === AxisPositions.TOP ? "end" : "start");

					return;
				}
			}

			axisRef.selectAll("g.tick text")
				.attr("transform", null)
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
		}

		return this.scale(value);
	}

	getAxisRef() {
		const { position: axisPosition } = this.configs;

		return this.getContainerSVG()
			.select(`g.axis.${axisPosition} g.ticks`);
	}

	getTitleRef() {
		const { position: axisPosition } = this.configs;

		return this.getContainerSVG()
			.select(`g.axis.${axisPosition} text.axis-title`);
	}
}
