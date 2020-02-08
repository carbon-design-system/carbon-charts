import { colors } from "./colors";

export const meterData = {
	label: "Dataset 1",
	fillColor: colors[2],
	data: 90.7
};

export const meterOptions = {
	title: "Meter Chart",
	meter: {
		peak: 80,
		status: {
			ranges: [
				{ range: [0, 50], status: "success" },
				// { range: [500, 1000], status: "custom" },
				{ range: [50, 60], status: "warning"},
				{ range: [60, 100], status: "danger"}
			]
		}
	}
};
