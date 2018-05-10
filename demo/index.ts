import {
	BarChart,
	LineChart,
	DoubleAxisLineChart,
	StackedBarChart,
	ComboChart,
	PieChart,
	DonutChart
} from "./../src/index";

// Styles
import "./index.scss";
import "@peretz/matter/matter.css";

import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";
import { html } from "d3";
loadLanguages(["haml", "javascript"]);

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

const optionsNoXAxis = {
	yDomain: ["Sold", "More", "Qty"],
	yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};

const dataNoXAxis = [
	{
		"Qty": 100000,
		"More": 50000,
		"Sold": 0
	}
];

const pieOptions = {
	legendClickable: true,
	containerResizable: true,
	colors
};

const donutOptions = {
	legendClickable: true,
	containerResizable: true,
	colors,
	figure: 15250,
	title: "Browsers"
};

const data = [];
for (let i = 0; i < 10; i++) {
	data.push({
	"Part number": `773C-${ i * 2 }-L6EP-L22I-${ i * 8 }-L22I`,
	"Qty": i * 10,
	"More": i * 20,
	"Sold": i * 0
	});
}

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
		id: "simplest-bar",
		name: "Bar",
		avail: true,
		options: optionsNoXAxis,
		data: dataNoXAxis
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
	},
	{
		id: "pie",
		name: "pie",
		avail: true,
		options: pieOptions,
		data: pieData
	},
	{
		id: "donut",
		name: "donut",
		avail: true,
		options: donutOptions,
		data: pieData
	}
];

chartTypes.forEach(type => {
	const classyContainer = document.getElementById(`classy-${type.id}-chart-holder`);
	if (classyContainer) {
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
			case "pie":
				const classyPieChart = new PieChart(
					classyContainer,
					Object.assign({}, type.options, {type: type.id}),
					type.data
				);
				classyPieChart.drawChart();
				break;
			case "donut":
				const classyDonutChart = new DonutChart(
					classyContainer,
					Object.assign({}, type.options, {type: type.id}),
					type.data
				);
				classyDonutChart.drawChart();
				break;
		}
	}
});


/*
///
///	Sample code for demos, as well as syntax highlighting
///
*/
window["switchTabs"] = (e, chartType, tabID) => {
	e.preventDefault();

	const disable = tabID === "html" ? "js" : "html";
	const tab = document.getElementById(`code-${chartType}`);

	tab.querySelector(`a.tabs-anchor.${disable}`).setAttribute("aria-selected", "false");
	tab.querySelector(`a.tabs-anchor.${tabID}`).setAttribute("aria-selected", "true");

	tab.querySelector(`div.tabs-panel.${disable}`).setAttribute("hidden", "true");
	tab.querySelector(`div.tabs-panel.${tabID}`).removeAttribute("hidden");
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const formatChartName = (name) => name.split(" ").map(item => capitalizeFirstLetter(item)).join("") + "Chart";

chartTypes.forEach(type => {
	const classyContainer = document.getElementById(`classy-${type.id}-chart-holder`);
	if (classyContainer) {
		const formattedChartName = formatChartName(type.name);

		const htmlCode = `<div id="${classyContainer.id}"></div>`
			, htmlHighlightedCode = Prism.highlight(htmlCode, Prism.languages.haml, "haml");

		const jsCode = `
const data = ${JSON.stringify(type.data)};
const options = ${JSON.stringify(type.options)};
const classyContainer = document.getElementById('classy-${type.id}-chart-holder');

const classy${formattedChartName} = new ${formattedChartName}(
	classyContainer,
	Object.assign({}, options, {type: '${type.id}'}),
	data
);

classy${formattedChartName}.drawChart();`
			, jsHighlightedCode = Prism.highlight(jsCode, Prism.languages.javascript, "javascript");

		const el = document.createElement("div");
		el.classList.add("code");
		el.innerHTML = `
<div id="code-${type.id}">
	<div class="tabs">
		<div>
			<ul role="tablist" aria-label="Demo Code">
				<li>
					<a class="tabs-anchor js" href="#" onclick="switchTabs(event, '${type.id}', 'js');" role="tab"
					   aria-selected="true" aria-controls="js-tab-a">
					   JS
					</a>
				</li>

				<li>
					<a class="tabs-anchor html" href="#" onclick="switchTabs(event, '${type.id}', 'html');" role="tab"
					   aria-selected="false" aria-controls="html-tab-a">
						HTML
					</a>
				</li>
			</ul>
		</div>
	</div>

	<div class="tabs-panel js" role="tabpanel" aria-labelledby="js-a">
		<pre class="demo-code">
			${jsHighlightedCode}
		</pre>
	</div>

	<div class="tabs-panel html" role="tabpanel" aria-labelledby="html-a" hidden="">
		<pre class="demo-code">
			${htmlHighlightedCode}
		</pre>
	</div>
</div>
		`;
		classyContainer.parentNode.insertBefore(el, classyContainer.nextSibling);
	}
});
