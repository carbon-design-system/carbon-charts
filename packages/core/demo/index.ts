import {
	BarChart,
	LineChart,
	PieChart,
	DonutChart,
	DonutCenter
} from "../src/index";

// Styles
import "./index.scss";

import {
	// Bar
	groupedBarOptions,
	groupedBarData,
	simpleBarOptions,
	simpleBarData,
	stackedBarData,
	stackedBarOptions,
	// Pie & donut
	pieOptions,
	pieData,
	donutOptions,
	// Line
	curvedLineOptions,
	curvedLineData,
	lineData,
	lineOptions
} from "./demo-data/index";

const chartTypes = [
	{
		id: "grouped-bar",
		name: "Grouped Bar",
		options: groupedBarOptions,
		data: groupedBarData
	},
	{
		id: "simple-bar",
		name: "Bar",
		options: simpleBarOptions,
		data: simpleBarData
	},
	{
		id: "stacked-bar",
		name: "Bar",
		options: stackedBarOptions,
		data: stackedBarData
	},
	{
		id: "simple-bar-accessible",
		name: "Accessible Bar",
		options: Object.assign({}, simpleBarOptions, {accessibility: true}),
		data: simpleBarData
	},
	{
		id: "stacked-bar-accessible",
		name: "Bar",
		options: Object.assign({}, stackedBarOptions, {accessibility: true}),
		data: stackedBarData
	},
	{
		id: "curved-line",
		name: "Curved Line",
		options: curvedLineOptions,
		data: curvedLineData
	},
	{
		id: "line",
		name: "Line",
		options: lineOptions,
		data: lineData
	},
	{
		id: "line-step",
		name: "Step",
		options: Object.assign({}, lineOptions, {curve: "curveStepAfter"}),
		data: lineData
	},
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

const classyCharts = {};

// TODO - removeADataset shouldn't be used if chart legend is label based
const changeDemoData = (chartType: any, oldData: any, delay?: number) => {
	const classyChartObject = classyCharts[chartType];
	let newData;

	const removeADataset = Math.random() > 0.5;

	// Function to be used to randomize a value
	const randomizeValue = currentVal => {
		const firstTry = Math.max(0.5 * currentVal, currentVal * Math.random() * (Math.random() * 5));
		const result = currentVal > 0 ? Math.min(2 * currentVal, firstTry) : Math.max(2 * currentVal, firstTry);

		return Math.floor(result);
	};

	switch (chartType) {
		case "donut":
		case "pie":
			// Randomize old data values
			newData = Object.assign({}, oldData);
			newData.datasets = oldData.datasets.map(dataset => {
				const datasetNewData = dataset.data.map(dataPoint => randomizeValue(dataPoint));

				const newDataset = Object.assign({}, dataset, { data: datasetNewData });

				return newDataset;
			});

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
		default:
		case "grouped-bar":
		case "simple-bar":
		case "simple-bar-accessible":
		case "stacked-bar":
		case "stacked-bar-accessible":
			newData = Object.assign({}, oldData);
			newData.datasets = oldData.datasets.map(dataset => {
				const datasetNewData = dataset.data.map(dataPoint => randomizeValue(dataPoint));

				const newDataset = Object.assign({}, dataset, { data: datasetNewData });

				return newDataset;
			});

			if (removeADataset) {
				const randomIndex = Math.floor(Math.random() * (newData.datasets.length - 1));
				newData.datasets.splice(randomIndex, randomIndex);
			}

			break;
	}

	// Handle setting the new data
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
};

const setDemoActionsEventListener = (chartType: any, oldData: any) => {
	const changeDataButton = document.getElementById(`change-data-${chartType}`);
	if (changeDataButton) {
		changeDataButton.onclick = e => {
			e.preventDefault();

			changeDemoData(chartType, oldData);
		};

		const actionsElement = document.getElementById(`actions-${chartType}`);
		if (actionsElement) {
			const changeDataPromiseButtons = Array.prototype.slice.call(actionsElement.querySelectorAll(".change-data-promise"));
			changeDataPromiseButtons.forEach(element => {
				element = <HTMLElement>element;
				element.onclick = e => {
					e.preventDefault();

					changeDemoData(chartType, oldData, parseInt(element.getAttribute("data-promise-delay"), 10));
				};
			});
		}
	}
};

chartTypes.forEach(type => {
	const classyContainer = document.getElementById(`classy-${type.id}-chart-holder`);
	if (classyContainer) {
		switch (type.id) {
			default:
			case "simple-bar":
			case "grouped-bar":
			case "stacked-bar":
			case "stacked-bar-accessible":
				classyCharts[type.id] = new BarChart(
					classyContainer,
					{
						data: type.data,
						options: Object.assign({}, type.options, {type: type.id}),
					}
				);

				const chartObject = classyCharts[type.id];
				chartObject.events.addEventListener("load", e => {
					console.log("Bar Chart - LOADED");
				}, false);

				chartObject.events.addEventListener("update", e => {
					console.log("Bar Chart - UPDATED");
				}, false);

				chartObject.events.addEventListener("data-change", e => {
					console.log("Bar Chart - DATACHANGE");
				}, false);

				chartObject.events.addEventListener("data-load", e => {
					console.log("Bar Chart - DATALOAD");
				}, false);

				chartObject.events.addEventListener("resize", e => {
					console.log("Bar Chart - RESIZE");
				}, false);

				setDemoActionsEventListener(type.id, type.data);

				break;
			case "curved-line":
			case "line":
			case "line-step":
					classyCharts[type.id] = new LineChart(
						classyContainer,
						{
							data: type.data,
							options: Object.assign({}, type.options, {type: type.id}),
						}
					);

					setDemoActionsEventListener(type.id, type.data);

					break;
			case "pie":
				classyCharts[type.id] = new PieChart(
					classyContainer,
					{
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								resolve(type.data);
							}, 0);
						}),
						options: Object.assign({}, type.options, {type: type.id})
					}
				);

				setDemoActionsEventListener(type.id, type.data);

				break;
			case "donut":
				classyCharts[type.id] = new DonutChart(
					classyContainer,
					{
						data: type.data,
						options: Object.assign({}, type.options, {type: type.id})
					}
				);

				setDemoActionsEventListener(type.id, type.data);

				break;
		}
	}
});
