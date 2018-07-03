import { colors } from "./colors";

export const lineData = {
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

export const lineOptions = {
	accessibility: false,
	axis: {
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
