// Internal Imports
import { Service } from "./service";
import { AxisPositions, AxisTypes, ScaleTypes } from "../interfaces";

export class Axes extends Service {
	// Find the main x-axis out of the 2 x-axis on the chart (when 2D axis is used)
	getMainXAxis() {
		const primaryAxis = this.model.get(AxisTypes.PRIMARY);
		const secondaryAxis = this.model.get(AxisTypes.SECONDARY);

		if (primaryAxis === this.model.get(AxisPositions.TOP) || primaryAxis === this.model.get(AxisPositions.BOTTOM)) {
			return primaryAxis;
		} else if (secondaryAxis === this.model.get(AxisPositions.TOP) || secondaryAxis === this.model.get(AxisPositions.BOTTOM)) {
			return secondaryAxis;
		} else {
			return this.model.get(AxisPositions.BOTTOM);
		}
	}

	// Find the main y-axis out of the 2 y-axis on the chart (when 2D axis is used)
	getMainYAxis() {
		const primaryAxis = this.model.get(AxisTypes.PRIMARY);
		const secondaryAxis = this.model.get(AxisTypes.SECONDARY);

		if (primaryAxis === this.model.get(AxisPositions.LEFT) || primaryAxis === this.model.get(AxisPositions.RIGHT)) {
			return primaryAxis;
		} else if (secondaryAxis === this.model.get(AxisPositions.LEFT) || secondaryAxis === this.model.get(AxisPositions.RIGHT)) {
			return secondaryAxis;
		} else {
			return this.model.get(AxisPositions.LEFT);
		}
	}

	getXValue(d, i) {
		return this.getMainXAxis().getValueFromScale(d, i);
	}

	getYValue(d, i) {
		return this.getMainYAxis().getValueFromScale(d, i);
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
}
