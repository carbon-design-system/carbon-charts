import { colors } from "./colors";

export const pieData = {
	labels: ["2V2N 9KYPM version 1", "L22I P66EP L22I P66EP L22I P66EP", "JQAI 2M4L1", "J9DZ F37AP",
		"YEL48 Q6XK YEL48", "P66EP L22I L22I"],
	datasets: [
		{
			label: "Dataset 1",
			data: [75000, 65000, 10000, 25000, 1200, 20000]
		}
	]
};

export const pieOptions = {
	title: "Pie",
	resizable: true
};

export const donutData = pieData;

export const donutOptions = {
	title: "Donut",
	resizable: true,
	donut: {
		center: {
			label: "Browsers"
		}
	}
};
