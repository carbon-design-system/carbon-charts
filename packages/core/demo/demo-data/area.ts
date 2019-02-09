import { colors } from "./colors";

export const areaData = {
	labels: ["2019/01/01", "2019/02/01", "2019/03/01", "2019/04/01", "2019/05/01"],
	// labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				65000,
				79000,
				16932,
				30000,
				40000
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				80000,
				21312,
				56456,
				48484,
				85856
			]
		}
		
	]
};

export const areaOptions = {
	accessibility: false,
	scales: {
		x: {
			title: "2018 Monthly Sales Figures",
		},
		y: {
			yMaxAdjuster: yMax => yMax * 1.2,
			yMinAdjuster: yMin => yMin * 1.2,
			formatter: axisValue => `${axisValue / 1000}k`
		}
	},
	curve: {
		name: "curveLinear"
	},
	legendClickable: false,
	containerResizable: true
};


