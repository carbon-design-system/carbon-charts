// Internal Imports
import { Service } from "./service";
import { AxisPositions, CartesianOrientations, ScaleTypes } from "../interfaces";
import { Tools } from "../tools";

// D3 Imports
import { scaleBand, scaleLinear, scaleTime, scaleLog, scaleOrdinal } from "d3-scale";
import { min, extent } from "d3-array";

export class CartesianScales extends Service {
	protected scaleTypes = {
		top: null,
		right: null,
		bottom: null,
		left: null
	};

	protected scales = {
		top: null,
		right: null,
		bottom: null,
		left: null
	};

	protected domainAxisPosition: AxisPositions;
	protected rangeAxisPosition: AxisPositions;

	protected orientation: CartesianOrientations;

	update(animate = true) {
		this.determineOrientation();
		const axisPositions = Object.keys(AxisPositions).map(axisPositionKey => AxisPositions[axisPositionKey]);
		axisPositions.forEach(axisPosition => {
			this.scales[axisPosition] = this.createScale(axisPosition);
		});
	}

	determineOrientation() {
		const options = this.model.getOptions();

		// Manually specifying positions here
		// In order to enforce a priority
		[
			AxisPositions.LEFT,
			AxisPositions.BOTTOM,
			AxisPositions.RIGHT,
			AxisPositions.TOP
		].forEach(axisPosition => {
			const axisOptions = Tools.getProperty(options, "axes", axisPosition);

			if (axisOptions) {
				const scaleType = axisOptions.scaleType || ScaleTypes.LINEAR;
				this.scaleTypes[axisPosition] = scaleType;

				if (scaleType === ScaleTypes.LINEAR) {
					this.rangeAxisPosition = axisPosition;
				} else {
					this.domainAxisPosition = axisPosition;
				}
			}
		});

		if (this.rangeAxisPosition === AxisPositions.LEFT && this.domainAxisPosition === AxisPositions.BOTTOM) {
			this.orientation = CartesianOrientations.VERTICAL;
		} else {
			this.orientation = CartesianOrientations.HORIZONTAL;
		}
	}

	getOrientation() {
		return this.orientation;
	}

	getScaleByPosition(axisPosition: AxisPositions) {
		return this.scales[axisPosition];
	}

	getScaleTypeByPosition(axisPosition: AxisPositions) {
		return this.scaleTypes[axisPosition];
	}

	getDomainScale() {
		return this.scales[this.domainAxisPosition];
	}

	getRangeScale() {
		return this.scales[this.rangeAxisPosition];
	}

	// getDomainAxis

	// Find the main x-axis out of the 2 x-axis on the chart (when 2D axis is used)
	getMainXAxis() {
		// const primaryAxis = this.model.get(AxisTypes.PRIMARY);
		// const secondaryAxis = this.model.get(AxisTypes.SECONDARY);

		// if (primaryAxis === this.model.get(AxisPositions.TOP) || primaryAxis === this.model.get(AxisPositions.BOTTOM)) {
		// 	return primaryAxis;
		// } else if (secondaryAxis === this.model.get(AxisPositions.TOP) || secondaryAxis === this.model.get(AxisPositions.BOTTOM)) {
		// 	return secondaryAxis;
		// } else {
		// 	return this.model.get(AxisPositions.BOTTOM);
		// }

		return this.scales.bottom ? this.scales.bottom : this.scales.top;
	}

	// Find the main y-axis out of the 2 y-axis on the chart (when 2D axis is used)
	getMainYAxis() {
		// const primaryAxis = this.model.get(AxisTypes.PRIMARY);
		// const secondaryAxis = this.model.get(AxisTypes.SECONDARY);

		// if (primaryAxis === this.model.get(AxisPositions.LEFT) || primaryAxis === this.model.get(AxisPositions.RIGHT)) {
		// 	return primaryAxis;
		// } else if (secondaryAxis === this.model.get(AxisPositions.LEFT) || secondaryAxis === this.model.get(AxisPositions.RIGHT)) {
		// 	return secondaryAxis;
		// } else {
		// 	return this.model.get(AxisPositions.LEFT);
		// }

		return this.scales.left ? this.scales.left : this.scales.right;
	}

	getValueFromScale(axisPosition: AxisPositions, datum: any, index?: number) {
		const value = isNaN(datum) ? datum.value : datum;
		const scaleType = this.scaleTypes[axisPosition];
		const scale = this.scales[axisPosition];
		if (scaleType === ScaleTypes.LABELS) {
			const correspondingLabel = this.model.getDisplayData().labels[index];
			return scale(correspondingLabel) + scale.step() / 2;
		} else if (scaleType === ScaleTypes.TIME) {
			return scale(new Date(datum.date || datum.label));
		}

		return scale(value);
	}

	getDomainValue(d, i) {
		return this.getValueFromScale(this.domainAxisPosition, d, i);
	}

	getRangeValue(d, i) {
		return this.getValueFromScale(this.rangeAxisPosition, d, i);
	}

	getXValue(d, i) {
		const datum = Object.assign(d, { pos: "bottom" });
		return this.getValueFromScale(datum, i);
	}

	getYValue(d, i) {
		const datum = Object.assign(d, { pos: "left" });
		return this.getValueFromScale(datum, i);
	}

	/** Uses the primary Y Axis to get data items associated with that value.  */
	getDataFromDomain(domainValue) {
		const displayData = this.model.getDisplayData();
		const activePoints = [];
		const scaleType = this.getMainXAxis().scaleType;

		switch (scaleType) {
			case ScaleTypes.LABELS:
				// based on labels we use the index to get the associated data
				const index = displayData.labels.indexOf(domainValue);

				displayData.datasets.forEach(dataset => {
					activePoints.push(
						{
							datasetLabel: dataset.label,
							value: dataset.data[index],
						}
					);
				});
				break;
			case ScaleTypes.TIME:
				// time series we filter using the date
				const domainKey = Object.keys(displayData.datasets[0].data[0]).filter(key =>  key !== "value" )[0];

				displayData.datasets.forEach(dataset => {
					const sharedLabel = dataset.label;

					// filter the items in each dataset for the points associated with the Domain
					const dataItems = dataset.data.filter(item => {
						const date1 = new Date(item[domainKey]);
						const date2 = new Date(domainValue);
						return date1.getTime() === date2.getTime();
					});

					// assign the shared label on the data items and add them to the array
					dataItems.forEach(item => {
						activePoints.push(
							Object.assign({datasetLabel: sharedLabel,
								value: item.value,
							}, item)
						);
					});
				});
				break;
		}
		return activePoints;
	}

	protected getScaleDomain(axisPosition: AxisPositions) {
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes", axisPosition);

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

		// if the lower bound of the domain is less than 0, we want to add padding
		if (domain[0] < 0) {
			domain[0] = domain[0] * 1.1;
		}
		return domain;
	}

	protected createScale(axisPosition: AxisPositions) {
		const axisOptions = Tools.getProperty(this.model.getOptions(), "axes", axisPosition);

		if (!axisOptions) {
			return null;
		}

		const scaleType = Tools.getProperty(axisOptions, "scaleType") || ScaleTypes.LINEAR;
		this.scaleTypes[axisPosition] = scaleType;

		let scale;
		if (scaleType === ScaleTypes.TIME) {
			scale = scaleTime();
		} else if (scaleType === ScaleTypes.LOG) {
			scale = scaleLog().base(axisOptions.base || 10);
		} else if (scaleType === ScaleTypes.LABELS) {
			scale = scaleBand();
		} else {
			scale = scaleLinear();
		}

		// // If scale doesn't exist in the model, store it
		// if (!this.model.get(position)) {
		// 	const modelUpdates = {
		// 		[position]: this
		// 	};

		// 	if (axisOptions) {
		// 		if (axisOptions.primary === true) {
		// 			modelUpdates[AxisTypes.PRIMARY] = this;
		// 		}

		// 		if (axisOptions.secondary === true) {
		// 			modelUpdates[AxisTypes.SECONDARY] = this;
		// 		}
		// 	}

		// 	this.model.set(modelUpdates, true);
		// }

		// this.scale = scale;

		scale.domain(this.getScaleDomain(axisPosition));
		return scale;
	}
}
