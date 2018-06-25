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
			}
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
export const simpleBarData = [
	{
		label: "Qty",
		value: 65000
	},
	{
		label: "More",
		value: 29123,
	},
	{
		label: "Sold",
		value: 35213
	},
	{
		label: "Restocking",
		value: 51213
	},
	{
		label: "Misc",
		value: 16932
	},
	{
		label: "Qty322",
		value: 65000
	},
	{
		label: "Mor213e",
		value: 29123,
	}
];

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
			}
		}
	},
	// yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};
