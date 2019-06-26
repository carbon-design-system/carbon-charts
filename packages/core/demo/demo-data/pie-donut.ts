import { colors } from "./colors";

export const pieOptions = {
	accessibility: false,
	legendClickable: true,
	containerResizable: true,
	colors
};

export const donutOptions = {
	accessibility: false,
	legendClickable: true,
	containerResizable: true,
	colors,
	center: {
		label: "Products",
		number: 300000
	}
};

export const pieData = {
	labels: ["2V2N 9KYPM version 1", "L22I P66EP L22I P66EP L22I P66EP", "JQAI 2M4L1", "J9DZ F37AP",
		"YEL48 Q6XK YEL48", "P66EP L22I L22I"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: colors,
			data: [70000, 60000, 90000, 20000, 25000, 10000]
		}
	]
};
