import { Component, ViewChild } from "@angular/core";

import { colors, randomizeValue } from "../helpers/commons";
import { Input } from "@angular/core";

@Component({
	selector: "app-scatter",
	templateUrl: "./scatter.component.html"
})
export class ScatterComponent {
	@ViewChild("scatterChart") scatterChart;

	@Input() scatterOptions = {};
	@Input() scatterData = {};

	changeDemoData() {
		const oldData = this.scatterChart.data;

		// Randomize old data values
		const newData = Object.assign({}, oldData);
		newData.datasets = oldData.datasets.map(dataset => {
			const datasetNewData = dataset.data.map(dataPoint => randomizeValue(dataPoint, false));

			const newDataset = Object.assign({}, dataset, { data: datasetNewData });

			return newDataset;
		});

		this.scatterData = newData;
	}
}
