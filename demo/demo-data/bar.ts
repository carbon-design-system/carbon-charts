import { colors } from "./colors";

const generateRandomRatio = (num) => Math.max(0.2 * num, Math.floor(Math.random() * num));

export const barOptions = {
	accessibility: false,
	xDomain: "Part number",
	yDomain: ["Sold", "More", "Qty"],
	yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};

export const barData = [];
for (let i = 1; i < 7; i++) {
	barData.push({
		"Part number": `773C-${ i * 2 }-L6EP-L22I-${ i * 8 }-L22I`,
		"Qty": i * generateRandomRatio(3000),
		"More": i * generateRandomRatio(4000),
		"Sold": i * generateRandomRatio(5000)
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
	xDomain: "label",
	yDomain: ["Qty", "More", "Sold", "Restocking", "Misc"],
	yTicks: 5,
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
		Sold: 12312
	},
	{
		label: "Q2",
		Qty: 35213,
		More: 10031,
		Sold: 21321
	},
	{
		label: "Q3",
		Qty: 13212,
		More: 23123,
		Sold: 43222
	},
	{
		label: "Q4",
		Qty: 12312,
		More: 34233,
		Sold: 32111
	},
];

export const stackedBarOptions = {
	accessibility: false,
	xDomain: "label",
	yDomain: ["Qty", "More", "Sold"],
	yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};
