export const gaugeData = [
	{ group: "value", value: 42 },
	{ group: "delta", value: -13.37 }
];

export const gaugeOptionsSemi = {
	title: "Gauge semicircular",
	resizable: true,
	height: "250px",
	width: "400px",
	gauge: {
		type: "semi",
		arrowColor: "tomato"
	}
};

export const gaugeOptionsCircular = {
	title: "Gauge circular",
	resizable: true,
	height: "250px",
	gauge: {
		type: "full",
		arrowColor: "tomato"
	}
};
