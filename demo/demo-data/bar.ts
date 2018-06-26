import { colors } from "./colors";

const generateRandomRatio = (num) => Math.max(0.2 * num, Math.floor(Math.random() * num));

export const barOptions = {
	accessibility: false,
	axis: {
		x: {
			domain: "Part number",
			title: "2017 Sales per Model"
		},
		y: {
			domain: ["Sold", "More", "Qty"],
			formatter: axisValue => {
				return `${axisValue / 1000000}mil`;
			},
			numberOfTicks: 3
		}
	},
	// yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};

export const barData = [];
for (let i = 1; i < 7; i++) {
	barData.push({
		"Part number": `773C-${ i * 2 }-L6EP-L22I-${ i * 8 }-L22I`,
		"Qty": i * generateRandomRatio(3000000),
		"More": i * generateRandomRatio(4000000),
		"Sold": i * generateRandomRatio(5000000)
	});
}

// Simple bar
export const simpleBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				65000,
				29123,
				35213,
				51213,
				16932
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				32432,
				21312,
				56456,
				21312,
				34234
			]
		},
		{
			label: "Dataset 3",
			backgroundColors: [colors[2]],
			data: [
				12312,
				23232,
				34232,
				12312,
				34234
			]
		},
		{
			label: "Dataset 4",
			backgroundColors: [colors[3]],
			data: [
				32423,
				21313,
				64353,
				24134,
				32423
			]
		}
	]
};

export const simpleBarOptions = {
	accessibility: false,
	axis: {
		x: {
			domain: "label"
		},
		y: {
			domain: ["Qty", "More", "Sold", "Restocking", "Misc"]
		}
	},
	// yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};

// Stacked bar
export const stackedBarData = [
	{
		label: "Q1",
		Qty: 12313,
		More: 34234,
		Sold: 12312,
		Restocking: 32523,
		Misc: 21312
	},
	{
		label: "Q2",
		Qty: 35213,
		More: 10031,
		Sold: 21321,
		Restocking: 12312,
		Misc: 12311
	},
	{
		label: "Q3",
		Qty: 13212,
		More: 23123,
		Sold: 43222,
		Restocking: 21412,
		Misc: 5322
	},
	{
		label: "Q4",
		Qty: 12312,
		More: 34233,
		Sold: 32111,
		Restocking: 21313,
		Misc: 43223
	},
];

export const stackedBarOptions = {
	accessibility: false,
	axis: {
		x: {
			domain: "label",
			title: "2017 Financials"
		},
		y: {
			domain: ["Qty", "More", "Sold", "Restocking", "Misc"],
			formatter: axisValue => {
				return `${axisValue / 1000}k`;
			},
			numberOfTicks: 10
		}
	},
	// yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};
