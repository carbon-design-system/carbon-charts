// Internal Imports
import * as Configuration from "./configuration";
import { ChartModel } from "./model";
import { Tools } from "./tools";
import * as colorPalettes from "./services/colorPalettes";

// D3 Imports
import { scaleOrdinal } from "d3-scale";

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class PieChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	// sanitize(data) {
	// 	// Sort data based on value
	// 	// and sort labels based on the data value order
	// 	const dataset = Tools.getProperty(data, "datasets", 0);
	// 	if (dataset) {
	// 		const sortedLabelsAndValues = data.labels.map((label, i) => {
	// 			return {
	// 				label,
	// 				value: dataset.data[i],
	// 				fillColor: dataset.fillColors ? dataset.fillColors[i] : undefined
	// 			};
	// 		}).sort((a: any, b: any) => b.value - a.value);

	// 		dataset.data = sortedLabelsAndValues.map(d => d.value);
	// 		data.labels = sortedLabelsAndValues.map(d => d.label);

	// 		if (dataset.fillColors) {
	// 			dataset.fillColors = sortedLabelsAndValues.map(d => d.fillColor);
	// 		}
	// 	}

	// 	return data;
	// }
}
