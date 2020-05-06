export const gaugeData = [
	{ group: "Dataset", key: "value", value: 42 },
	{ group: "Dataset", key: "delta", value: -13.37 }
];

export const gaugeOptionsSemi = {
	title: "Gauge semicircular",
	resizable: true,
	height: "250px",
	width: "400px",
	gauge: {
		type: "semi"
	}
};

export const gaugeOptionsCircular = {
	title: "Gauge circular",
	resizable: true,
	height: "250px",
	gauge: {
		type: "full"
	}
};
