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
				// peak: 700,
				value: 550,
				// threshold: .25
			}
		}
	]
};

export const meterOptions = {};
