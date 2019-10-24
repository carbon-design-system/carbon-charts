import { colors } from "./colors";
import { getTheme } from "./themes";

export const pieData = {
	labels: ["2V2N 9KYPM version 1", "L22I P66EP L22I P66EP L22I P66EP", "JQAI 2M4L1", "J9DZ F37AP",
		"YEL48 Q6XK YEL48", "P66EP L22I L22I"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: colors,
			data: [75000, 65000, 10000, 25000, 1200, 20000]
		}
	]
};

export const pieOptions = {
	title: "Pie",
	accessibility: false,
	legendClickable: true,
	resizable: true,
	colors,
	theme: getTheme()
};

export const donutData = pieData;

export const donutOptions = {
	title: "Donut",
	accessibility: false,
	legendClickable: true,
	resizable: true,
	theme: getTheme(),
	colors,
	donut: {
		center: {
			label: "Browsers"
		}
	}
};
