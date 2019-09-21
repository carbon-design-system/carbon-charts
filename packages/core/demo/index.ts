import {
	StackedBarChart,
	LineChart,
	// PieChart,
	// DonutChart,
	// ComboChart,
	ScatterChart,
	PieChart,
	DonutChart
} from "../src/index";

// Styles
import "./index.scss";
import "./../src/styles/style.scss";

// Functionality for demo options toolbar
import { initializeDemoOptions } from "./demo-options";

// Chart types
import { chartTypes } from "./chart-types";

// MISC
import { Tools } from "../src/tools";

initializeDemoOptions();

const classyCharts = {};

// TODO - removeADataset shouldn't be used if chart legend is label based
const changeDemoData = (chartType: any, chartObj: any, delay?: number) => {
	const oldData = chartObj.model.getData();

	// Function to be used to randomize a value
	const randomizeValue = datum => {
		const currentVal = datum.value !== undefined ? datum.value : datum;
		const firstTry = Math.max(0.5 * currentVal, currentVal * Math.random() * (Math.random() * 5));
		let result = currentVal > 0 ? Math.min(2 * currentVal, firstTry) : Math.max(2 * currentVal, firstTry);

		if (Math.random() > 0.5
			|| chartType.indexOf("stacked") !== -1
			|| chartType.indexOf("pie") !== -1
			|| chartType.indexOf("donut") !== -1) {
			result = Math.floor(result);
		} else {
			result = Math.floor(result) * -1;
		}

		if (datum.value !== undefined) {
			datum.value = result;

			if (datum.date) {
				console.log("datum.date", datum.date)
				datum.date = new Date(datum.date);
				datum.date.setDate(datum.date.getDate() + 2);
			}

			return datum;
		}

		return result;
	};

	// Function to be used to randomize all datapoints
	const updateChartData = currentData => {
		const result = Tools.clone(currentData);
		result.datasets = result.datasets.map(dataset => {
			dataset.label = `new dataset ${Math.random().toFixed(2)}`
			const datasetNewData = dataset.data.map(dataPoint => {
				return randomizeValue(dataPoint)
			});

			const newDataset = Object.assign({}, dataset, { data: datasetNewData });

			return newDataset;
		});

		return result;
	};

	const classyChartObject = classyCharts[chartType];
	let newData;

	const removeADataset = Math.random() > 0.5;

	switch (chartType) {
		case "donut":
			// Randomize old data values
			newData = updateChartData(oldData);
			break;
		case "pie":
			// Randomize old data values
			newData = updateChartData(oldData);
			break;
		default:
		case "grouped-bar":
		case "simple-bar":
		case "simple-bar-accessible":
		case "stacked-bar":
		case "stacked-bar-accessible":
			newData = updateChartData(oldData);

			if (removeADataset && chartType !== "combo") {
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

		// classyChartObject.setData(dataPromise);
	} else {
		classyChartObject.model.setData(newData);
		// classyChartObject.model.setOptions(chartTypes[11].options);
	}
};

const setDemoActionsEventListener = (chartType: any, chartObj: any) => {
	const changeDataButton = document.getElementById(`change-data-${chartType}`);
	if (changeDataButton) {
		changeDataButton.onclick = e => {
			e.preventDefault();

			changeDemoData(chartType, chartObj);
		};

		const actionsElement = document.getElementById(`actions-${chartType}`);
		if (actionsElement) {
			const changeDataPromiseButtons = Array.prototype.slice.call(actionsElement.querySelectorAll(".change-data-promise"));
			changeDataPromiseButtons.forEach(element => {
				element = <HTMLElement>element;
				element.onclick = e => {
					e.preventDefault();

					changeDemoData(chartType, chartObj, parseInt(element.getAttribute("data-promise-delay"), 10));
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
				classyCharts[type.id] = new StackedBarChart(
					classyContainer,
					{
						data: type.data,
						options: type.options,
					}
				);

				// const chartObject = classyCharts[type.id];
				// chartObject.events.addEventListener("bar-onClick", e => {
				// 	console.log("Bar chart - Bar clicked", e.detail);
				// });

				// chartObject.events.addEventListener("load", e => {
				// 	console.log("Bar Chart - LOADED");
				// }, false);

				// chartObject.events.addEventListener("update", e => {
				// 	console.log("Bar Chart - UPDATED");
				// }, false);

				// chartObject.events.addEventListener("data-change", e => {
				// 	console.log("Bar Chart - DATACHANGE");
				// }, false);

				// chartObject.events.addEventListener("data-load", e => {
				// 	console.log("Bar Chart - DATALOAD");
				// }, false);

				// chartObject.events.addEventListener("resize", e => {
				// 	console.log("Bar Chart - RESIZE");
				// }, false);

				setDemoActionsEventListener(type.id, classyCharts[type.id]);

				break;
			case "combo":
				// classyCharts[type.id] = new ComboChart(
				// 	classyContainer,
				// 	{
				// 		data: type.data,
				// 		options: Object.assign({}, type.options, {type: type.id}),
				// 	}
				// );

				// setDemoActionsEventListener(type.id, type.data);

				// break;
			case "scatter":
				classyCharts[type.id] = new ScatterChart(
					classyContainer,
					{
						data: type.data,
						options: type.options,
					}
				);

				setDemoActionsEventListener(type.id, classyCharts[type.id]);
				break;
			case "curved-line":
			case "line":
			case "line-step":
				classyCharts[type.id] = new LineChart(
					classyContainer,
					{
						data: type.data,
						options: type.options,
					}
				);

				setDemoActionsEventListener(type.id, classyCharts[type.id]);

				break;
			case "pie":
				classyCharts[type.id] = new PieChart(
					classyContainer,
					{
						data: type.data,
						options: type.options
					}
				);
				// const pieChartObject = classyCharts[type.id];
				// pieChartObject.events.addEventListener("pie-slice-onClick", e => {
				// 	console.log("Pie chart - Slice clicked", e.detail);
				// });

				setDemoActionsEventListener(type.id, classyCharts[type.id]);

				break;
			case "donut":
				classyCharts[type.id] = new DonutChart(
					classyContainer,
					{
						data: type.data,
						options: type.options
					}
				);

				setDemoActionsEventListener(type.id, classyCharts[type.id]);

				break;
		}
	}
});
