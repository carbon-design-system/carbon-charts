import { colors } from "./colors";

import { DonutCenter } from "../../src/index";

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
	center: new DonutCenter({
		number: 25423,
		label: "Browsers"
	})
};

export const pieData = {
	labels: ["john", "illiad", "nezar", "my"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: colors,
			data: [100000, 200000, 600000, 100000]
		}
	]
};
