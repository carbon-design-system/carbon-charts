import { colors } from "./colors";
import {
	isRTL,
	demoDatasetLabels,
	demoPieDonutLabels,
	demoDonutCenterLabel,
	demoPieDonutOtherLabel
} from "./commons";

export const pieOptions = {
	accessibility: false,
	legendClickable: true,
	containerResizable: true,
	rtl: isRTL,
	colors
};

export const donutOptions = {
	accessibility: false,
	legendClickable: true,
	containerResizable: true,
	rtl: isRTL,
	colors,
	center: {
		label: demoDonutCenterLabel,
		number: 300000
	},
	otherLabel: demoPieDonutOtherLabel
};

export const pieData = {
	labels: demoPieDonutLabels,
	datasets: [
		{
			label: demoDatasetLabels[0],
			backgroundColors: colors,
			data: [70000, 40000, 90000, 50000, 60000, 45000, 90000, 70000, 80000, 120000]
		}
	]
};
