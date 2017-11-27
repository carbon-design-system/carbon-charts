import {
	BarChart,
	LineChart,
	DoubleAxisLineChart,
	StackedBarChart,
	ComboChart
} from "./../src/index";

import "@peretz/matter/matter.css";

import "./index.scss";

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
	yDomain: ["Sold", "More", "Qty"],
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

const data = [
	{
		"Part number": "2V2N-9KYPM version 1",
		"Qty": 100000,
		"More": 60000,
		"Sold": 90000
	},
	{
		"Part number": "L22I-P66EP-L22I-P66EP-L22I-P66EP",
		"Qty": 200000,
		"More": 50000,
		"Sold": 70000
	},
	{
		"Part number": "JQAI-2M4L1",
		"Qty": 600000,
		"More": 9000,
		"Sold": 6000
	},
	{
		"Part number": "J9DZ-F37AP",
		"Qty": 100000,
		"More": 8000,
		"Sold": 11000
	},
	{
		"Part number": "Q6XK-YEL48",
		"Qty": 400000,
		"More": 4000,
		"Sold": 300000
	},
	{
		"Part number": "773C-XKB5-L6EP-L22I-P66EP-L22I",
		"Qty": 800000,
		"More": 35000,
		"Sold": 390000
	}
];

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


const chartTypes = [
	{
		id: "bar",
		name: "Bar",
		avail: true,
		options: longDataOptions,
		data: longData
	},
	{
		id: "line",
		name: "Line",
		avail: true,
		options,
		data
	},
	{
		id: "stacked-bar",
		name: "Stacked Bar",
		avail: true,
		options,
		data
	},
	{
		id: "double-axis-line",
		name: "Double Axis",
		avail: true,
		options: optionsWithFormatter,
		data: doubleAxisData
	},
	{
		id: "combo",
		name: "Combo",
		avail: true,
		options: doubleYAxisOptions,
		data: longData
	}
];

chartTypes.forEach(type => {
	const classyContainer = document.getElementById(`classy-${type.id}-chart-holder`);
	switch (type.id) {
		default:
		case "bar":
			const classyBarChart = new BarChart(
				classyContainer,
				Object.assign({}, type.options, {type: type.id}),
				type.data
			);
			classyBarChart.drawChart();
			break;
		case "line":
			const classyLineChart = new LineChart(
				classyContainer,
				Object.assign({}, type.options, {type: type.id}),
				type.data
			);
			classyLineChart.drawChart();
			break;
		case "stacked-bar":
			const classyStackedBarChart = new StackedBarChart(
				classyContainer,
				Object.assign({}, type.options, {type: type.id}),
				type.data
			);
			classyStackedBarChart.drawChart();
			break;
		case "double-axis-line":
			const classyDoubleAxisChart = new DoubleAxisLineChart(
				classyContainer,
				Object.assign({}, type.options, {type: type.id}),
				type.data
			);
			classyDoubleAxisChart.drawChart();
			break;
		case "combo":
			const classyComboChart = new ComboChart(
				classyContainer,
				Object.assign({}, type.options, {type: type.id}),
				type.data
			);
			classyComboChart.drawChart();
			break;
	}
});
