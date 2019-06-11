import {
	// BarChart,
	// LineChart,
	// PieChart,
	// DonutChart,
	// ComboChart,
	ScatterChart
} from "../src/index";

// Styles
import "./index.scss";
import "./../src/style.scss";

// Interfaces
import { ChartData } from "./../src/interfaces/index";

// Functionality for demo options toolbar
import { initializeDemoOptions } from "./demo-options";

// Chart types
import { chartTypes } from "./chart-types";

// MISC
import { Tools } from "../src/tools";

initializeDemoOptions();

const classyCharts = {};

// TODO - removeADataset shouldn't be used if chart legend is label based
const changeDemoData = (chartType: any, oldData: any, delay?: number) => {
	// Function to be used to randomize a value
	const randomizeValue = currentVal => {
		const firstTry = Math.max(0.5 * currentVal, currentVal * Math.random() * (Math.random() * 5));
		const result = currentVal > 0 ? Math.min(2 * currentVal, firstTry) : Math.max(2 * currentVal, firstTry);

		if (Math.random() > 0.5
			|| chartType.indexOf("stacked") !== -1
			|| chartType.indexOf("pie") !== -1
			|| chartType.indexOf("donut") !== -1) {
			return Math.floor(result);
		} else {
			return Math.floor(result) * -1;
		}
	};

	// Function to be used to randomize all datapoints
	const updateChartData = currentData => {
		const result = Tools.clone(currentData);
		result.datasets = result.datasets.map(dataset => {
			dataset.label = `new dataset ${Math.random()}`
			const datasetNewData = dataset.data.map(dataPoint => randomizeValue(dataPoint));

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

			// Update donut center configurations
			classyChartObject.options.center = {
				label: "New Title",
				number: randomizeValue(classyChartObject.center.configs.number)
			};

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
				// classyCharts[type.id] = new BarChart(
				// 	classyContainer,
				// 	{
				// 		data: type.data,
				// 		options: Object.assign({}, type.options, {type: type.id}),
				// 	}
				// );

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

				// setDemoActionsEventListener(type.id, type.data);

				// break;
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
						options: Object.assign({}, type.options, {type: type.id}),
					}
				);

				setDemoActionsEventListener(type.id, type.data);
				break;
			case "curved-line":
			case "line":
			case "line-step":
					// classyCharts[type.id] = new LineChart(
					// 	classyContainer,
					// 	{
					// 		data: type.data,
					// 		options: Object.assign({}, type.options, {type: type.id}),
					// 	}
					// );

					// setDemoActionsEventListener(type.id, type.data);

					// break;
			case "pie":
				// classyCharts[type.id] = new PieChart(
				// 	classyContainer,
				// 	{
				// 		data: new Promise<ChartData>((resolve, reject) => {
				// 			setTimeout(() => {
				// 				resolve(type.data);
				// 			}, 0);
				// 		}),
				// 		options: Object.assign({}, type.options, {type: type.id})
				// 	}
				// );
				// const pieChartObject = classyCharts[type.id];
				// pieChartObject.events.addEventListener("pie-slice-onClick", e => {
				// 	console.log("Pie chart - Slice clicked", e.detail);
				// });

				// setDemoActionsEventListener(type.id, type.data);

				break;
			case "donut":
				// classyCharts[type.id] = new DonutChart(
				// 	classyContainer,
				// 	{
				// 		data: type.data,
				// 		options: Object.assign({}, type.options, {type: type.id})
				// 	}
				// );

				// setDemoActionsEventListener(type.id, type.data);

				break;
		}
	}
});
