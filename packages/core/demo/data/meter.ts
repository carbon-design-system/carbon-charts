export const meterData = [
	{
		group: "Dataset asfndksjghfgfdghfdhg  dsfgdfs gsdflg sdg dfsg d d sgfds sdfg sd dasd asdasdasdsadasdsdasdasdasadadads d1",
		value: 56
	}
];

export const meterOptions = {
	title: "Meter Chart",
	meter: {
		peak: 80,
		status: {
			ranges: [
				{ range: [0, 50], status: "success" },
				{ range: [50, 60], status: "warning" },
				{ range: [60, 100], status: "danger" }
			]
		},
		fillColor: "green"
	}
};
