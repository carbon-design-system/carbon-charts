import { colors } from "./colors";
import { getTheme } from "./themes";

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
			title: "Dollars (CAD)",
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
	containerResizable: true,
	title: "Line Chart",
	theme: getTheme()
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

export const lineOptions = () => ({
	// animations: false,
	accessibility: false,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
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
	containerResizable: true
});


export const lineTimeSeriesOptions = () => ({
	// animations: false,
	accessibility: false,
	scales: {
		bottom: {
			type: "time",
			title: "2018 Annual Sales Figures",
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
	containerResizable: true
});


export const scatterTimeSeriesData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				{
					key: new Date(2019, 0, 1),
					value: 0
				},
				{
					key: new Date(2019, 0, 5),
					value: 65000
				},
				{
					key: new Date(2019, 0, 8),
					value: 10000
				},
				{
					key: new Date(2019, 0, 13),
					value: 49213
				},
				{
					key: new Date(2019, 0, 17),
					value: 51213
				},
				{
					key: new Date(2019, 0, 22),
					value: 0
				}
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				{
					key: new Date(2019, 0, 2),
					value: 0
				},
				{
					key: new Date(2019, 0, 6),
					value: 57312
				},
				{
					key: new Date(2019, 0, 8),
					value: 21432
				},
				{
					key: new Date(2019, 0, 15),
					value: 70323
				},
				{
					key: new Date(2019, 0, 19),
					value: 21300
				},
				{
					key: new Date(2019, 0, 25),
					value: 0
				},
			]
		},
		// {
		// 	label: "Dataset 3",
		// 	backgroundColors: [colors[2]],
		// 	data: [
		// 		41200,
		// 		23400,
		// 		34210,
		// 		1400,
		// 		42100
		// 	]
		// }
	]
};

export const scatterData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				32100,
				23500,
				53100,
				42300,
				12300
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				34200,
				53200,
				42300,
				21400,
				0
			]
		},
		{
			label: "Dataset 3",
			backgroundColors: [colors[2]],
			data: [
				41200,
				23400,
				34210,
				1400,
				42100
			]
		}
	]
};
