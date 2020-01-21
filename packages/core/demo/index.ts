import {
	SimpleBarChart,
	GroupedBarChart,
	StackedBarChart,
	LineChart,
	ScatterChart,
	PieChart,
	DonutChart,
	MeterChart
} from "../src/index";

// Styles
import "./index.scss";

// Functionality for demo options toolbar
import { initializeDemoOptions } from "./demo-options";

// Chart types
import { chartTypes } from "./chart-types";

// MISC
import { Tools } from "../src/tools";

initializeDemoOptions();

const charts = {};

const changeDemoData = (chartType: any, chartObj: any) => {
	const oldData = chartObj.model.getData();

	// Function to be used to randomize a value
	const randomizeValue = (datum, bound?) => {
		// return a bounded value from bound array [lower, upper]
		if (bound) {
			const min = Math.ceil(bound[0]);
			const max = Math.floor(bound[1]);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		const currentVal = datum.value !== undefined ? datum.value : datum;
		let result = Math.random() > 0.5 ? 0.95 * currentVal : 1.05 * currentVal;

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
		if (chartType === "meter") {
			const { value, max, peak } = currentData.data;
			// only randomize a new value that is less than the max
			// keep other values the same so its possible to view the different states of the chart (status ranges)
			const newValue = randomizeValue(value, [0, max]);
			const datasetNewData = {
				value: newValue,
				min: 0,
				max: max,
				peak: randomizeValue(peak, [1000, 1200]), // reassign within the warning/danger status
				//status: dataset.data.status
			};

			result.data = datasetNewData;
			result.label = "Lorem ipsum asdhaskdhkasd";
		} else {
			result.datasets = result.datasets.map(dataset => {
				dataset.label = `new dataset ${Math.random().toFixed(2)}`;
				let datasetNewData;
					datasetNewData = dataset.data.map(dataPoint => {
						return randomizeValue(dataPoint);
					});
				const newDataset = Object.assign({}, dataset, { data: datasetNewData });
				return newDataset;
			});
		}

		return result;
	};

	const chartObject = charts[chartType];
	let newData;

	const removeADataset = Math.random() > 0.5;

	switch (chartType) {
		case "pie":
		case "donut":
		case "meter":
			// Randomize old data values
			newData = updateChartData(oldData);
			break;
		default:
			newData = updateChartData(oldData);

			if (removeADataset) {
				const randomIndex = Math.floor(Math.random() * (newData.datasets.length - 1));
				newData.datasets.splice(randomIndex, randomIndex);
			}

			break;
	}

	// Handle setting the new data
	chartObject.model.setData(newData);
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

					changeDemoData(chartType, chartObj);
				};
			});
		}
	}
};

const createChartContainer = chartType => {
	// Chart holder
	const holder = document.createElement("div");
	holder.className = "demo-chart-holder has-actions";
	// meter need a more compact chart holder
	if (chartType.id === "meter" ) {
		holder.className += " compact";
	}
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

// Initialize all charts
chartTypes.forEach(type => {
	const holder = createChartContainer(type);

	// Add `height` to the chart options
	type.options.height = "500px";

	if (holder) {
		let classToInitialize;
		switch (type.id) {
			case "simple-bar":
			case "simple-horizontal-bar":
			case "simple-bar-time-series":
			case "simple-horizontal-bar-time-series":
				classToInitialize = SimpleBarChart;
				break;
			case "grouped-bar":
			case "grouped-horizontal-bar":
				classToInitialize = GroupedBarChart;
				break;
			case "stacked-bar":
			case "stacked-horizontal-bar":
			case "stacked-bar-time-series":
			case "stacked-horizontal-bar-time-series":
				classToInitialize = StackedBarChart;
				break;
			case "scatter":
			case "scatter-time-series":
				classToInitialize = ScatterChart;
				break;
			case "line":
			case "line-time-series":
			case "line-step":
			case "line-step-time-series":
				classToInitialize = LineChart;
				break;
			case "pie":
				classToInitialize = PieChart;
				break;
			case "donut":
				classToInitialize = DonutChart;
				break;
			case "meter":
				classToInitialize = MeterChart;
				type.options.height = "150px";
		}



		// Initialize chart
		charts[type.id] = new classToInitialize(
			holder,
			{
				data: type.data,
				options: type.options
			}
		);

		setDemoActionsEventListener(type.id, charts[type.id]);
	}
});
