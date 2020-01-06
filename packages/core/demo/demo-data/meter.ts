import { colors } from "./colors";

export const meterData = {
	labels: ["CPU"],
	datasets: [
		{
			label: "CPU",
			fillColors: [colors[0]],
			data: {
				min: 0,
				max: 1500,
				peak: 1200,
				value: 550,
				status: [
					{ range: [0, 1000], status: "success" },
					// { range: [500, 1000], status: "custom" },
					{ range: [1000, 1200], status: "warning"},
					{ range: [1200, 1500], status: "danger"}
				],
			}
		}
	]
};

export const meterOptions = {
	meter: {
		title: {
			percentageIndicator: {
				enabled: true
			}
		},
		status: {
			enabled: true,
		}
	},
	title: "Meter Chart"
};
