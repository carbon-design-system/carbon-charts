import {
	// BarNewChart,
	BarChart,
	GroupedBarChart,
	// LineChart,
	// DoubleAxisLineChart,
	// StackedBarChart,
	// ComboChart,
	PieChart,
	DonutChart,
	DonutCenter
} from "./../src/index";

// Styles
import "@peretz/matter/matter.css";
import "./index.scss";

import "./demo-matter";

import {
	barOptions,
	barData
} from "./demo-data/index";

const colors = [
	"#009BEF",
	"#95D13C",
	"#785EF0",
	"#F87EAC",
	"#FFB000",
	"#00B6CB",
	"#FF5C49",
	"#047CC0",
	"#FE8500",
	"#5A3EC8",
	"#40D5BB",
	"#FF509E"
];

const dimensionOption = {
	dimension: "Audience name",
	yDomain: ["Open rate (unique)"],
	yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors,
	xDomain: "Mailing name",
	type: "bars",
	yFormatter: {
		"Open rate (unique)"(value) {
			return value + "%";
		}
	},
};

const dimensionData = [
	{
		"Mailing name": "Birthday Discount",
		"Audience name": "Total unique contacts",
		"Open rate (unique)": 32.15
	},
	{
		"Mailing name": "Birthday Discount",
		"Audience name": "AudienceB_WithMediumSizeName",
		"Open rate (unique)": 48.89
	},
	{
		"Mailing name": "Birthday Discount",
		"Audience name": "Couch Potatoes",
		"Open rate (unique)": 41.16
	},
	{
		"Mailing name": "Birthday Discount",
		"Audience name": "Cyclists",
		"Open rate (unique)": 418.42
	},
	{
		"Mailing name": "Birthday Discount",
		"Audience name": "Fit Fanatic Card Member",
		"Open rate (unique)": 32.14
	},
	{
		"Mailing name": "Birthday Discount",
		"Audience name": "Mountain Climbers",
		"Open rate (unique)": 136.94
	},
	{
		"Mailing name": "Birthday Discount",
		"Audience name": "No audience",
		"Open rate (unique)": 99.02
	},
	{
		"Mailing name": "Birthday Discount",
		"Audience name": "Swimmers",
		"Open rate (unique)": 231.87
	},
	{
		"Mailing name": "Birthday Discount",
		"Audience name": "party",
		"Open rate (unique)": 70.64
	},
	{
		"Mailing name": "First Purchase",
		"Audience name": "Total unique contacts",
		"Open rate (unique)": 83.41
	},
	{
		"Mailing name": "First Purchase",
		"Audience name": "AudienceB_WithMediumSizeName",
		"Open rate (unique)": 140
	},
	{
		"Mailing name": "First Purchase",
		"Audience name": "Couch Potatoes",
		"Open rate (unique)": 133.33
	},
	{
		"Mailing name": "First Purchase",
		"Audience name": "Cyclists",
		"Open rate (unique)": 1233.33
	},
	{
		"Mailing name": "First Purchase",
		"Audience name": "Fit Fanatic Card Member",
		"Open rate (unique)": 83.33
	},
	{
		"Mailing name": "First Purchase",
		"Audience name": "Mountain Climbers",
		"Open rate (unique)": 383.33
	},
	{
		"Mailing name": "First Purchase",
		"Audience name": "No audience",
		"Open rate (unique)": 260
	},
	{
		"Mailing name": "First Purchase",
		"Audience name": "Swimmers",
		"Open rate (unique)": 581.82
	},
	{
		"Mailing name": "First Purchase",
		"Audience name": "party",
		"Open rate (unique)": 216.67
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Invite",
		"Audience name": "Total unique contacts",
		"Open rate (unique)": 83.41
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Invite",
		"Audience name": "AudienceB_WithMediumSizeName",
		"Open rate (unique)": 140
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Invite",
		"Audience name": "Couch Potatoes",
		"Open rate (unique)": 133.33
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Invite",
		"Audience name": "Cyclists",
		"Open rate (unique)": 1233.33
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Invite",
		"Audience name": "Fit Fanatic Card Member",
		"Open rate (unique)": 83.33
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Invite",
		"Audience name": "Mountain Climbers",
		"Open rate (unique)": 383.33
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Invite",
		"Audience name": "No audience",
		"Open rate (unique)": 260
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Invite",
		"Audience name": "Swimmers",
		"Open rate (unique)": 581.82
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Invite",
		"Audience name": "party",
		"Open rate (unique)": 216.67
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Reminder",
		"Audience name": "Total unique contacts",
		"Open rate (unique)": 83.85
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Reminder",
		"Audience name": "AudienceB_WithMediumSizeName",
		"Open rate (unique)": 133.33
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Reminder",
		"Audience name": "Couch Potatoes",
		"Open rate (unique)": 66.67
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Reminder",
		"Audience name": "Cyclists",
		"Open rate (unique)": 1150
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Reminder",
		"Audience name": "Fit Fanatic Card Member",
		"Open rate (unique)": 82.28
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Reminder",
		"Audience name": "Mountain Climbers",
		"Open rate (unique)": 311.11
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Reminder",
		"Audience name": "No audience",
		"Open rate (unique)": 266.67
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Reminder",
		"Audience name": "Swimmers",
		"Open rate (unique)": 557.14
	},
	{
		"Mailing name": "First Purchase - Fit Fanatic Card Reminder",
		"Audience name": "party",
		"Open rate (unique)": 200
	}
];

const longDataOptions = {
	xDomain: "Part number",
	yDomain: ["Total", "Returned", "Defects", "This is an extra long long long legend", "Number of sold products"],
	yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};

const doubleYAxisOptions = {
	xDomain: "Part number",
	yDomain: ["Total"],
	y2Domain: ["Returned", "Defects", "This is an extra long long long legend", "Number of sold products"],
	yTicks: 5,
	y2Ticks: 10,
	legendClickable: true,
	containerResizable: true,
	colors
};

const options = {
	xDomain: "Part number",
	yDomain: ["Sofr3frld", "More", "Qty"],
	yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};

const optionsWithFormatter = {
	xDomain: "Day",
	yDomain: ["Clicks"],
	y2Domain: ["Click rate"],
	yFormatter: {
		"Click rate"(value) {
			return value + "%";
		}
	},
	yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};

const simpleBarData = [
	{
		label: "Qty",
		value: 65000
	},
	{
		label: "More",
		value: 29123,
	},
	{
		label: "Sold",
		value: 35213
	},
	{
		label: "Restocking",
		value: 51213
	},
	{
		label: "Misc",
		value: 16932
	}
];

const simpleBarOptions = {
	xDomain: "label",
	yDomain: ["Qty", "More", "Sold", "Restocking", "Misc"],
	yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};

const pieOptions = {
	legendClickable: true,
	containerResizable: true,
	colors
};

const donutOptions = {
	legendClickable: true,
	containerResizable: true,
	colors,
	center: new DonutCenter({
		number: 25423,
		label: "Browsers"
	})
};

const doubleAxisData = [
	{
		"Day": "Monday",
		"Clicks": 60000,
		"Click rate": 9
	},
	{
		"Day": "Tuesday",
		"Clicks": 50000,
		"Click rate": 76
	},
	{
		"Day": "Wednesday",
		"Clicks": 9000,
		"Click rate": 80
	},
	{
		"Day": "Thursday",
		"Clicks": 8000,
		"Click rate": 1
	},
	{
		"Day": "Friday",
		"Clicks": 4000,
		"Click rate": 30
	},
	{
		"Day": "Saturday",
		"Clicks": 35000,
		"Click rate": 59
	},
		{
			"Day": "Sunday",
			"Clicks": 35000,
			"Click rate": 38
		}
];


const longData = [
	{
		"Part number": "2V2N-9KYPM",
		"Total": 100000,
		"Returned": 60000,
		"Defects": 9230,
		"This is an extra long long long legend": 12345,
		"Number of sold products": 90000
	},
	{
		"Part number": "L22I-P66EP",
		"Total": 200000,
		"Returned": 50000,
		"Defects": 9230,
		"This is an extra long long long legend": 12345,
		"Number of sold products": 70000
	},
	{
		"Part number": "JQAI-2M4L1",
		"Total": 100000,
		"Returned": 9000,
		"Defects": 2980,
		"This is an extra long long long legend": 12345,
		"Number of sold products": 6000
	},
	{
		"Part number": "J9DZ-F37AP",
		"Total": 150000,
		"Returned": 8000,
		"Defects": 12230,
		"This is an extra long long long legend": 12345,
		"Number of sold products": 11000
	},
	{
		"Part number": "Q6XK-YEL48",
		"Total": 230000,
		"Returned": 4000,
		"Defects": 8230,
		"This is an extra long long long legend": 12345,
		"Number of sold products": 300000
	},
	{
		"Part number": "773C-XKB5L",
		"Total": 390000,
		"Returned": 35000,
		"Defects": 5230,
		"This is an extra long long long legend": 12345,
		"Number of sold products": 190000
	}
];

const pieData = [
	{
		label: "2V2N-9KYPM version 1",
		value: 100000
	},
	{
		label: "L22I-P66EP-L22I-P66EP-L22I-P66EP",
		value: 200000
	},
	{
		label: "JQAI-2M4L1",
		value: 600000
	},
	{
		label: "J9DZ-F37AP",
		value: 100000
	},
	{
		label: "YEL48-Q6XK-YEL48",
		value: 400000
	},
	{
		label: "P66EP-L22I-L22I",
		value: 450000
	},
	{
		label: "Q6XK-YEL48",
		value: 300000
	},
	{
		label: "XKB5-L6EP",
		value: 70000
	},
	{
		label: "YEL48-Q6XK",
		value: 20000
	},
	{
		label: "L22I-P66EP-L22I",
		value: 120000
	}
];

const chartTypes = [
	// {
	// 	id: "multi-bar",
	// 	name: "Bar",
	// 	data: dimensionData,
	// 	options: dimensionOption
	// },
	{
		id: "grouped-bar",
		name: "Bar",
		options: barOptions,
		data: barData
	},
	// {
	// 	id: "simplest-bar",
	// 	name: "Bar",
	// 	options: optionsNoXAxis,
	// 	data: dataNoXAxis
	// },
	{
		id: "simple-bar",
		name: "Bar New",
		options: simpleBarOptions,
		data: simpleBarData
	},
	// {
	// 	id: "line",
	// 	name: "Line",
	// 	options: barOptions,
	// 	data: barData
	// },
	// {
	// 	id: "stacked-bar",
	// 	name: "Stacked Bar",
	// 	options: barOptions,
	// 	data: barData
	// },
	// {
	// 	id: "double-axis-line",
	// 	name: "Double Axis",
	// 	options: optionsWithFormatter,
	// 	data: doubleAxisData
	// },
	// {
	// 	id: "combo",
	// 	name: "Combo",
	// 	options: doubleYAxisOptions,
	// 	data: longData
	// },
	{
		id: "pie",
		name: "pie",
		options: pieOptions,
		data: pieData
	},
	{
		id: "donut",
		name: "donut",
		options: donutOptions,
		data: pieData
	}
];

const setDemoActionsEventListener = (chartType: any, oldData: any) => {
	const changeDataButton = document.getElementById(`change-data-${chartType}`);
	if (changeDataButton) {
		changeDataButton.onclick = e => {
			e.preventDefault();

			changeDemoData(chartType, oldData);
		};

		const actionsElement = document.getElementById(`actions-${chartType}`);
		const changeDataPromiseButtons = Array.prototype.slice.call(document.querySelectorAll(".change-data-promise"));
		changeDataPromiseButtons.forEach(element => {
			element = <HTMLElement>element;
			element.onclick = e => {
				console.log("CLICKED");
				e.preventDefault();

				changeDemoData(chartType, oldData, parseInt(element.getAttribute("data-promise-delay"), 10));
			};
		});
	}

	// switch (chartType) {
	// 	case "donut":
	// 		window.onkeydown = (e) => {
	// 			if (e.keyCode === 13) {
	// 				changeDemoData(chartType, oldData);
	// 			}
	// 		};

	// 		break;
	// }
};

let classyBarChart;
let classyGroupedBarChart;
let classyDonutChart;
let classyPieChart;
chartTypes.forEach(type => {
	const classyContainer = document.getElementById(`classy-${type.id}-chart-holder`);
	if (classyContainer) {
		switch (type.id) {
			case "grouped-bar":
				classyGroupedBarChart = new GroupedBarChart(
					classyContainer,
					Object.assign({}, type.options, {type: type.id}),
					type.data
				);
				break;
			case "simple-bar":
				classyBarChart = new BarChart(
					classyContainer,
					Object.assign({}, type.options, {type: type.id}),
					type.data
				);

				// classyBarChart.events.addEventListener("load", e => {
				// 	console.log("Bar Chart - LOADED");
				// }, false);

				// classyBarChart.events.addEventListener("update", e => {
				// 	console.log("Bar Chart - UPDATED");
				// }, false);

				// classyBarChart.events.addEventListener("data-change", e => {
				// 	console.log("Bar Chart - DATACHANGE");
				// }, false);

				// classyBarChart.events.addEventListener("data-load", e => {
				// 	console.log("Bar Chart - DATALOAD");
				// }, false);

				// classyBarChart.events.addEventListener("resize", e => {
				// 	console.log("Bar Chart - RESIZE");
				// }, false);

				// classyBarNewChart.setData(type.data);

				setDemoActionsEventListener(type.id, type.data);

				break;
			// case "line":
			// 	const classyLineChart = new LineChart(
			// 		classyContainer,
			// 		Object.assign({}, type.options, {type: type.id}),
			// 		type.data
			// 	);
			// 	classyLineChart.drawChart();
			// 	break;
			// case "stacked-bar":
			// 	const classyStackedBarChart = new StackedBarChart(
			// 		classyContainer,
			// 		Object.assign({}, type.options, {type: type.id}),
			// 		type.data
			// 	);
			// 	classyStackedBarChart.drawChart();
			// 	break;
			// case "double-axis-line":
			// 	const classyDoubleAxisChart = new DoubleAxisLineChart(
			// 		classyContainer,
			// 		Object.assign({}, type.options, {type: type.id}),
			// 		type.data
			// 	);
			// 	classyDoubleAxisChart.drawChart();
			// 	break;
			// case "combo":
			// 	const classyComboChart = new ComboChart(
			// 		classyContainer,
			// 		Object.assign({}, type.options, {type: type.id}),
			// 		type.data
			// 	);
			// 	classyComboChart.drawChart();
			// 	break;
			case "pie":
				classyPieChart = new PieChart(
					classyContainer,
					Object.assign({}, type.options, {type: type.id}),
					new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve(type.data);
						}, 0);
					})
				);

				setDemoActionsEventListener(type.id, type.data);

				break;
			case "donut":
				classyDonutChart = new DonutChart(
					classyContainer,
					Object.assign({}, type.options, {type: type.id}),
					type.data
				);

				setDemoActionsEventListener(type.id, type.data);

				break;
			default:
				// console.log("DEFAULT", type);
		}
	}
});

const changeDemoData = (chartType: any, oldData: any, delay?: number) => {
	let newData;
	// Function to be used to randomize a value
	const randomizeValue = currentVal => Math.max(0.2 * currentVal, Math.floor(currentVal * Math.random() * (Math.random() * 5)));

	switch (chartType) {
		case "donut":
		case "pie":
			const classyChartObject = chartType === "donut" ? classyDonutChart : classyPieChart;

			// Randomize old data values
			newData = oldData.map(dataPoint => {
				return Object.assign({}, dataPoint, {value: randomizeValue(dataPoint.value)});
			});

			if (delay) {
				const dataPromise = new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve(newData);
					}, delay || 0);
				});

				classyChartObject.setData(dataPromise);
			} else {
				classyChartObject.setData(newData);
			}


			if (chartType === "donut") {
				setTimeout(() => {
					// Update DonutCenter values
					const { number: centerNumber } = classyChartObject.center.configs;
					let newCenterNumber = Math.floor(Math.max(0.2 * centerNumber, centerNumber * Math.random() * (Math.random() * 5)));
					if (newCenterNumber <= 10) {
						newCenterNumber = 10000;
					}

					classyChartObject.center.configs.number = newCenterNumber;
					classyChartObject.center.update();
				}, delay || 0);
			}

			break;

		// case "bar":
		// 	// Randomize old data values
		// 	newData = oldData.map(dataPoint => {
		// 		return Object.assign({}, dataPoint, {
		// 			Qty: randomizeValue(dataPoint.Qty),
		// 			More: randomizeValue(dataPoint.More),
		// 			Sold: randomizeValue(dataPoint.Sold)
		// 		});
		// 	});

		// 	classyBarChart.setData(newData);

		// 	break;
		case "bar":
			const keys = ["Qty", "More", "Sold", "Restocking", "Misc"];
			const removeAKey = Math.random() > 0.5;

			newData = oldData.map(dataPoint => Object.assign({}, dataPoint, { value: randomizeValue(dataPoint.value)}));

			if (removeAKey) {
				const randomIndex = Math.random() * (newData.length - 1);
				newData.splice(randomIndex, randomIndex);
			}

			classyBarChart.setData(newData);

			break;
	}
};
