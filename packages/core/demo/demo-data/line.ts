import { colors } from "./colors";

export const curvedLineData = {
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

export const curvedLineOptions = {
	accessibility: false,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			yMaxAdjuster: yMax => yMax * 1.2,
			yMinAdjuster: yMin => yMin * 1.2,
			formatter: axisValue => `${axisValue / 1000}k`
		},
		y2: {
			ticks: {
				max: 1,
				min: 0
			}
		}
	},
	curve: {
		name: "curveNatural"
	},
	legendClickable: true,
	containerResizable: true
};


export const lineData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
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

export const lineOptions = {
	accessibility: false,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			yMaxAdjuster: yMax => yMax * 1.2,
			yMinAdjuster: yMin => yMin * 1.2,
			formatter: axisValue => `${axisValue / 1000}k`,
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
	containerResizable: true
};
