import { colors } from "./colors";

export const meterData = {
	label: "Dataset 1",
	fillColor: colors[2],
	data: {
		min: 0,
		max: 1500,
		peak: 1200,
		value: 1000,
		status: [
			{ range: [0, 1000], status: "success" },
			// { range: [500, 1000], status: "custom" },
			{ range: [1000, 1200], status: "warning"},
			{ range: [1200, 1500], status: "danger"}
		],
	}
};

export const meterOptions = {
	title: "Meter Chart"
};
