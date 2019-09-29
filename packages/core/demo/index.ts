import {
	SimpleBarChart,
	StackedBarChart,
	LineChart,
	ScatterChart,
	PieChart,
	DonutChart
} from "../src/index";

// Styles
import "./index.scss";
import "./../src/styles/styles.scss";

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
		const firstTry = Math.max(0.85 * currentVal, currentVal * Math.random() * (Math.random() * 5));
		let result = currentVal > 0 ? Math.min(3 * currentVal, firstTry) : Math.max(3 * currentVal, firstTry);

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
		case "grouped-bar":
		case "simple-bar":
			newData = updateChartData(oldData);

			if (removeADataset) {
				const randomIndex = Math.floor(Math.random() * (newData.datasets.length - 1));
				newData.datasets.splice(randomIndex, randomIndex);
			}

			break;
		case "stacked-bar":
		case "stacked-bar-time-series":
			newData = updateChartData(oldData);

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

const createChartContainer = chartType => {
	// Chart holder
	const holder = document.createElement("div");
	holder.className = "demo-chart-holder has-actions";
	holder.id = `classy-${chartType.id}-chart-holder`;

	document.body.appendChild(holder);

	// Chart demo actions container
	const chartDemoActions = document.createElement("div");
	chartDemoActions.className = "chart-demo-actions";
	chartDemoActions.id = `actions-${chartType.id}`;
	chartDemoActions.setAttribute("role", "region");
	chartDemoActions.setAttribute("aria-label", `${chartType} chart actions`);

	// Add update data button
	const updateDataButton = document.createElement("button");
	updateDataButton.className = "bx--btn bx--btn--primary";
	updateDataButton.id = `change-data-${chartType.id}`;
	updateDataButton.innerHTML = "Update data";

	chartDemoActions.appendChild(updateDataButton);
	document.body.appendChild(chartDemoActions);

	return holder;
};

chartTypes.forEach(type => {
	const holder = createChartContainer(type);
	if (holder) {
		switch (type.id) {
			case "simple-bar":
			case "simple-bar-time-series":
				classyCharts[type.id] = new SimpleBarChart(
					holder,
					{
						data: type.data,
						options: type.options,
					}
				);

				setDemoActionsEventListener(type.id, classyCharts[type.id]);

				break;
			case "grouped-bar":
			case "stacked-bar":
			case "stacked-bar-time-series":
				classyCharts[type.id] = new StackedBarChart(
					holder,
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
			case "scatter":
				classyCharts[type.id] = new ScatterChart(
					holder,
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
					holder,
					{
						data: type.data,
						options: type.options,
					}
				);

				setDemoActionsEventListener(type.id, classyCharts[type.id]);

				break;
			case "pie":
				classyCharts[type.id] = new PieChart(
					holder,
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
					holder,
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
