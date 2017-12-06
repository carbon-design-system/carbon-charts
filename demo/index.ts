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

const dimensionOption = {
	"yFormatter": {},
	"dimension": "Audience name",
	"yDomain": [
		"Open rate (unique)"
	],
	"yTicks": 5,
	"legendClickable": true,
	"containerResizable": true,
	colors,
	"xDomain": "Mailing name",
	"type": "bars"
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
	},
	{
		"Mailing name": "Loyalty Deals_Spring 2016",
		"Audience name": "Total unique contacts",
		"Open rate (unique)": 83.35
	},
	{
		"Mailing name": "Loyalty Deals_Spring 2016",
		"Audience name": "AudienceB_WithMediumSizeName",
		"Open rate (unique)": 138.58
	},
	{
		"Mailing name": "Loyalty Deals_Spring 2016",
		"Audience name": "Couch Potatoes",
		"Open rate (unique)": 94.81
	},
	{
		"Mailing name": "Loyalty Deals_Spring 2016",
		"Audience name": "Cyclists",
		"Open rate (unique)": 1167.07
	},
	{
		"Mailing name": "Loyalty Deals_Spring 2016",
		"Audience name": "Fit Fanatic Card Member",
		"Open rate (unique)": 83.34
	},
	{
		"Mailing name": "Loyalty Deals_Spring 2016",
		"Audience name": "Mountain Climbers",
		"Open rate (unique)": 361.18
	},
	{
		"Mailing name": "Loyalty Deals_Spring 2016",
		"Audience name": "No audience",
		"Open rate (unique)": 259.69
	},
	{
		"Mailing name": "Loyalty Deals_Spring 2016",
		"Audience name": "Swimmers",
		"Open rate (unique)": 567.28
	},
	{
		"Mailing name": "Loyalty Deals_Spring 2016",
		"Audience name": "party",
		"Open rate (unique)": 183.52
	},
	{
		"Mailing name": "Loyalty Deals_Summer 2016",
		"Audience name": "Total unique contacts",
		"Open rate (unique)": 83.36
	},
	{
		"Mailing name": "Loyalty Deals_Summer 2016",
		"Audience name": "AudienceB_WithMediumSizeName",
		"Open rate (unique)": 104.29
	},
	{
		"Mailing name": "Loyalty Deals_Summer 2016",
		"Audience name": "Couch Potatoes",
		"Open rate (unique)": 129.35
	},
	{
		"Mailing name": "Loyalty Deals_Summer 2016",
		"Audience name": "Cyclists",
		"Open rate (unique)": 1116.84
	},
	{
		"Mailing name": "Loyalty Deals_Summer 2016",
		"Audience name": "Fit Fanatic Card Member",
		"Open rate (unique)": 83.34
	},
	{
		"Mailing name": "Loyalty Deals_Summer 2016",
		"Audience name": "Mountain Climbers",
		"Open rate (unique)": 376.14
	},
	{
		"Mailing name": "Loyalty Deals_Summer 2016",
		"Audience name": "No audience",
		"Open rate (unique)": 252.48
	},
	{
		"Mailing name": "Loyalty Deals_Summer 2016",
		"Audience name": "Swimmers",
		"Open rate (unique)": 507.28
	},
	{
		"Mailing name": "Loyalty Deals_Summer 2016",
		"Audience name": "party",
		"Open rate (unique)": 175.45
	},
	{
		"Mailing name": "Loyalty Deals_Winter 2016",
		"Audience name": "Total unique contacts",
		"Open rate (unique)": 83.23
	},
	{
		"Mailing name": "Loyalty Deals_Winter 2016",
		"Audience name": "AudienceB_WithMediumSizeName",
		"Open rate (unique)": 142.11
	},
	{
		"Mailing name": "Loyalty Deals_Winter 2016",
		"Audience name": "Couch Potatoes",
		"Open rate (unique)": 100
	},
	{
		"Mailing name": "Loyalty Deals_Winter 2016",
		"Audience name": "Cyclists",
		"Open rate (unique)": 1191.67
	},
	{
		"Mailing name": "Loyalty Deals_Winter 2016",
		"Audience name": "Fit Fanatic Card Member",
		"Open rate (unique)": 83.44
	},
	{
		"Mailing name": "Loyalty Deals_Winter 2016",
		"Audience name": "Mountain Climbers",
		"Open rate (unique)": 361.22
	},
	{
		"Mailing name": "Loyalty Deals_Winter 2016",
		"Audience name": "No audience",
		"Open rate (unique)": 255
	},
	{
		"Mailing name": "Loyalty Deals_Winter 2016",
		"Audience name": "Swimmers",
		"Open rate (unique)": 561.36
	},
	{
		"Mailing name": "Loyalty Deals_Winter 2016",
		"Audience name": "party",
		"Open rate (unique)": 185.19
	},
	{
		"Mailing name": "Opt-in Welcome",
		"Audience name": "Total unique contacts",
		"Open rate (unique)": 83.55
	},
	{
		"Mailing name": "Opt-in Welcome",
		"Audience name": "AudienceB_WithMediumSizeName",
		"Open rate (unique)": 142.86
	},
	{
		"Mailing name": "Opt-in Welcome",
		"Audience name": "Couch Potatoes",
		"Open rate (unique)": 100
	},
	{
		"Mailing name": "Opt-in Welcome",
		"Audience name": "Cyclists",
		"Open rate (unique)": 588.89
	},
	{
		"Mailing name": "Opt-in Welcome",
		"Audience name": "Fit Fanatic Card Member",
		"Open rate (unique)": 82.89
	},
	{
		"Mailing name": "Opt-in Welcome",
		"Audience name": "Mountain Climbers",
		"Open rate (unique)": 352.63
	},
	{
		"Mailing name": "Opt-in Welcome",
		"Audience name": "No audience",
		"Open rate (unique)": 271.43
	},
	{
		"Mailing name": "Opt-in Welcome",
		"Audience name": "Swimmers",
		"Open rate (unique)": 1212.5
	},
	{
		"Mailing name": "Opt-in Welcome",
		"Audience name": "party",
		"Open rate (unique)": 190
	},
	{
		"Mailing name": "Purchase Confirmation",
		"Audience name": "Total unique contacts",
		"Open rate (unique)": 83.34
	},
	{
		"Mailing name": "Purchase Confirmation",
		"Audience name": "AudienceB_WithMediumSizeName",
		"Open rate (unique)": 121.74
	},
	{
		"Mailing name": "Purchase Confirmation",
		"Audience name": "Couch Potatoes",
		"Open rate (unique)": 109.38
	},
	{
		"Mailing name": "Purchase Confirmation",
		"Audience name": "Cyclists",
		"Open rate (unique)": 868.59
	},
	{
		"Mailing name": "Purchase Confirmation",
		"Audience name": "Fit Fanatic Card Member",
		"Open rate (unique)": 83.33
	},
	{
		"Mailing name": "Purchase Confirmation",
		"Audience name": "Mountain Climbers",
		"Open rate (unique)": 361.54
	},
	{
		"Mailing name": "Purchase Confirmation",
		"Audience name": "No audience",
		"Open rate (unique)": 204.28
	},
	{
		"Mailing name": "Purchase Confirmation",
		"Audience name": "Swimmers",
		"Open rate (unique)": 685.71
	},
	{
		"Mailing name": "Purchase Confirmation",
		"Audience name": "party",
		"Open rate (unique)": 230.35
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
		id: "multi-bar",
		name: "Bar",
		avail: true,
		data: dimensionData,
		options: dimensionOption
	},
	{
		id: "bar",
		name: "Bar",
		avail: true,
		options,
		data
	},
	{
		id: "line",
		name: "Line",
		avail: true,
		data: dimensionData,
		options: dimensionOption
		// options,
		// data
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
