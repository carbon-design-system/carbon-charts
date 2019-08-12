import * as Charts from "../dist/index.umd";

import { createChartHolder } from "./test-tools";

export const data = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [Charts.defaultColors[0]],
			data: [
				2000,
				4200,
				7000,
				4000,
				19000
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [Charts.defaultColors[1]],
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
			backgroundColors: [Charts.defaultColors[2]],
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

export const options = () => ({
	// animations: false,
	accessibility: false,
	axes: {
		bottom: {
			title: "2018 Annual Sales Figures",
			type: "labels"
		},
		y: {
			title: "Dollars (CAD)",
			// yMaxAdjuster: yMax => yMax * 1.2,
			// yMinAdjuster: yMin => yMin * 1.2,
			// formatter: Math.random() > 0.5 ? null : val => `${val} gweg werg weg`,
			thresholds: [
				{
					range: [-20000, 30000],
					theme: "success"
				},
				{
					range: [30000, 40000],
					theme: "danger"
				},
				{
					range: [40000, 70000],
					theme: "warning"
				}
			]
		}
	},
	legendClickable: true,
	containerResizable: true,
	height: 500
});

describe('Array', () => {
	describe('#indexOf()', () => {
		it('should return -1 when the value is not present', () => {
			console.log("ewgewg", createChartHolder)
			const div = createChartHolder("scatter");
			console.log("div", div)
			new Charts.ScatterChart(
				div,
				{
					data: data,
					options: Object.assign({}, options(), {type: "scatter"}),
				}
			);

			expect(document.querySelector("text.title").innerHTML).toEqual("Scatter Chart");
		});
	});
});
