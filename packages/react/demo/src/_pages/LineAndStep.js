import React from "react";

import { LineChart } from "@peretz/charts-react";

import { randomizeValue, colors } from "../utils";

const curvedLineData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				65000,
				79000,
				49213,
				51213,
				16932
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				80000,
				21312,
				56456,
				21312,
				0
			]
		},
		{
			label: "Dataset 3",
			backgroundColors: [colors[2]],
			data: [
				12312,
				34232,
				39232,
				12312,
				34234
			]
		}
	]
};

const curvedLineOptions = {
	accessibility: false,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			formatter: axisValue => {
				return `${axisValue / 1000}k`;
			},
		},
		y2: {
			ticks: {
				max: 1,
				min: 0
			}
		}
	},
	curve: "curveNatural",
	legendClickable: true,
	containerResizable: true,
};


const lineData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				0,
				0,
				0,
				0,
				0
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				0,
				10000,
				20000,
				30000,
				40000
			]
		},
		{
			label: "Dataset 3",
			backgroundColors: [colors[2]],
			data: [
				0,
				20000,
				40000,
				60000,
				80000
			]
		}
	]
};

const lineOptions = {
	accessibility: false,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			formatter: axisValue => {
				return `${axisValue / 1000}k`;
			},
		}
	},
	legendClickable: true,
	containerResizable: true,
};

export default class LineAndStep extends React.Component {
	changeDemoData(chartType) {
		const chartObject = this[chartType];

		const oldData = chartObject.data;
		const removeADataset = Math.random() > 0.5;

		const newData = Object.assign({}, oldData);
		newData.datasets = oldData.datasets.map(dataset => {
			const datasetNewData = dataset.data.map(dataPoint => randomizeValue(dataPoint));

			const newDataset = Object.assign({}, dataset, { data: datasetNewData });

			return newDataset;
		});

		if (removeADataset) {
			const randomIndex = Math.floor(Math.random() * (newData.datasets.length - 1));
			newData.datasets.splice(randomIndex, randomIndex);
		}

		chartObject.setData(newData);
	}

	render() {
		return (
			<div>
				<h2>Curved Line Chart</h2>

				<LineChart
					data={curvedLineData}
					options={curvedLineOptions}
					ref={curvedLineChart => this.curvedLineChart = curvedLineChart}
				/>

				<button className="btn--primary" onClick={this.changeDemoData.bind(this, "curvedLineChart")}>
					Change Data
				</button>

				<h2 style={{ marginTop: 60 }}>Simple Line Chart</h2>

				<LineChart
					data={lineData}
					options={lineOptions}
					ref={simpleLineChart => this.simpleLineChart = simpleLineChart}
				/>

				<button className="btn--primary" onClick={this.changeDemoData.bind(this, "simpleLineChart")}>
					Change Data
				</button>

				<h2 style={{ marginTop: 60 }}>Step Line Chart</h2>

				<LineChart
					data={lineData}
					options={lineOptions}
					ref={stepLineChart => this.stepLineChart = stepLineChart}
				/>

				<button className="btn--primary" onClick={this.changeDemoData.bind(this, "stepLineChart")}>
					Change Data
				</button>
			</div>
		)
	}
}
