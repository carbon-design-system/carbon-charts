import * as Charts from "@carbon/charts";

// Styles
import "./index.scss";

// Functionality for demo options toolbar
import { initializeDemoOptions } from "./demo-options";

// Chart types
import { demoGroups } from "./demo-data/index";

// MISC
import { Tools } from "@carbon/charts/tools";

initializeDemoOptions();

const charts = {};

const changeDemoData = (id: any, chartObj: any) => {
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
			|| id.indexOf("stacked") !== -1
			|| id.indexOf("pie") !== -1
			|| id.indexOf("donut") !== -1) {
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

	// Function to be used to randomize all data points
	const updateChartData = currentData => {
		const result = Tools.clone(currentData);
		if (!result.datasets) {
			const value = result.data;
			const newValue = randomizeValue(value, [0, 100]);
			result.data = newValue;
			result.label = `new dataset ${Math.random().toFixed(2)}`;
			return result;
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

	const chartObject = charts[id];

	// get new data for the chart demo
	let newData;
	newData = updateChartData(oldData);

	// randomly remove a dataset
	const removeADataset = Math.random() > 0.5;

	// check if there are multiple datasets before removing one
	if (newData.datasets && removeADataset) {
		const randomIndex = Math.floor(Math.random() * (newData.datasets.length - 1));
		newData.datasets.splice(randomIndex, randomIndex);
	}

	// Handle setting the new data
	chartObject.model.setData(newData);
};

const setDemoActionsEventListener = (id: any, chartObj: any) => {
	const changeDataButton = document.getElementById(`change-data-${id}`);
	if (changeDataButton) {
		changeDataButton.onclick = e => {
			e.preventDefault();

			changeDemoData(id, chartObj);
		};

		const actionsElement = document.getElementById(`actions-${id}`);
		if (actionsElement) {
			const changeDataPromiseButtons = Array.prototype.slice.call(actionsElement.querySelectorAll(".change-data-promise"));
			changeDataPromiseButtons.forEach(element => {
				element = <HTMLElement>element;
				element.onclick = e => {
					e.preventDefault();

					changeDemoData(id, chartObj);
				};
			});
		}
	}
};

const createChartContainer = demo => {
	// Chart holder
	const holder = document.createElement("div");
	holder.id = demo.id;
	holder.className = "demo-chart-holder has-actions";

	// Add a compact class to override height of regular demo charts
	const isCompactChart = demo.chartType.vanilla === "MeterChart";
	if (isCompactChart) {
		holder.className = holder.className.concat(" compact");
	}

	document.body.appendChild(holder);

	// Chart demo actions container
	const chartDemoActions = document.createElement("div");
	chartDemoActions.className = "chart-demo-actions";
	chartDemoActions.id = `actions-${demo.id}`;
	chartDemoActions.setAttribute("role", "region");
	chartDemoActions.setAttribute("aria-label", `${demo.title} chart actions`);

	// Add update data button
	const updateDataButton = document.createElement("button");
	updateDataButton.className = "bx--btn bx--btn--primary";
	updateDataButton.id = `change-data-${demo.id}`;
	updateDataButton.innerHTML = "Update data";

	chartDemoActions.appendChild(updateDataButton);
	document.body.appendChild(chartDemoActions);

	return holder;
};

// Initialize all charts
demoGroups.forEach(demoGroup => {
	demoGroup.demos.forEach(demo => {
		const holder = createChartContainer(demo);
		if (holder) {
			const ClassToInitialize = Charts[demo.chartType.vanilla];

			// Add `height` to the chart options
			demo.options.height = demo.chartType.vanilla === "MeterChart" ? "175px" : "500px";

			// Initialize chart
			charts[demo.id] = new ClassToInitialize(
				holder,
				{
					data: demo.data,
					options: demo.options
				}
			);

			setDemoActionsEventListener(demo.id, charts[demo.id]);
		}
	});
});
