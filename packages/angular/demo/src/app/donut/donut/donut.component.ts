import { Component, OnInit, ViewChild } from "@angular/core";

// Chart imports
import { DonutCenter } from "@peretz/charts/bundle/bundle.js";
import { colors, randomizeValue } from "../../../helpers/commons";

@Component({
	selector: "app-donut-donut",
	templateUrl: "./donut.component.html"
})
export class DonutComponent implements OnInit {
	@ViewChild("donutChart") donutChart;

	donutOptions = {
		accessibility: false,
		legendClickable: true,
		containerResizable: true,
		colors,
		center: new DonutCenter({
			number: 25423,
			label: "Browsers"
		})
	};

	donutData = {
		labels: ["2V2N-9KYPM version 1", "L22I-P66EP-L22I-P66EP-L22I-P66EP", "JQAI-2M4L1", "J9DZ-F37AP",
			"YEL48-Q6XK-YEL48", "P66EP-L22I-L22I", "Q6XK-YEL48", "XKB5-L6EP", "YEL48-Q6XK", "L22I-P66EP-L22I"],
		datasets: [
			{
				label: "Dataset 1",
				backgroundColors: colors,
				data: [100000, 200000, 600000, 100000, 400000, 450000, 300000, 70000, 20000, 120000]
			}
		]
	};

	constructor() { }

	ngOnInit() { }

	changeDemoData() {
		const oldData = this.donutChart.data;

		// Randomize old data values
		const newData = Object.assign({}, oldData);
		newData.datasets = oldData.datasets.map(dataset => {
			const datasetNewData = dataset.data.map(dataPoint => randomizeValue(dataPoint));

			const newDataset = Object.assign({}, dataset, { data: datasetNewData });

			return newDataset;
		});

		this.donutChart.setData(newData);

		setTimeout(() => {
			// Update DonutCenter values
			const { number: centerNumber } = this.donutChart.center.configs;
			let newCenterNumber = Math.floor(Math.max(0.2 * centerNumber, centerNumber * Math.random() * (Math.random() * 5)));
			if (newCenterNumber <= 10) {
				newCenterNumber = 10000;
			}

			this.donutChart.center.configs.number = newCenterNumber;
			this.donutChart.center.update();
		}, 0);
	}

	// TODO - Remove on destroy
}
