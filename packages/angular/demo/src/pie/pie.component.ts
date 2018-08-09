import { Component, ViewChild } from "@angular/core";

import { colors, randomizeValue } from "../helpers/commons";
import { Input } from "@angular/core";

@Component({
	selector: "app-pie-donut",
	templateUrl: "./pie.component.html"
})
export class PieComponent {
	@ViewChild("pieChart") pieChart;

	pieOptions = {
		accessibility: false,
		legendClickable: true,
		containerResizable: true,
		colors
	};

	@Input() pieData = {};

	changeDemoData() {
		const oldData = this.pieChart.data;

		// Randomize old data values
		const newData = Object.assign({}, oldData);
		newData.datasets = oldData.datasets.map(dataset => {
			const datasetNewData = dataset.data.map(dataPoint => randomizeValue(dataPoint));

			const newDataset = Object.assign({}, dataset, { data: datasetNewData });

			return newDataset;
		});

		this.pieData = newData;
	}
}
