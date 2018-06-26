import {
	// BarNewChart,
	BarChart,
	GroupedBarChart,
	// LineChart,
	// DoubleAxisLineChart,
	StackedBarChart,
	// ComboChart,
	PieChart,
	DonutChart,
	DonutCenter
} from "../src/index";

// Styles
import "@peretz/matter/matter.css";
import "./index.scss";

import "./demo-matter";

import {
	barOptions,
	barData,
	simpleBarOptions,
	simpleBarData,
	stackedBarData,
	stackedBarOptions,
	pieOptions,
	pieData,
	donutOptions
} from "./demo-data/index";

const chartTypes = [
	// {
	// 	id: "multi-bar",
	// 	name: "Bar",
	// 	data: dimensionData,
	// 	options: dimensionOption
	// },
	// {
	// 	id: "grouped-bar",
	// 	name: "Bar",
	// 	options: barOptions,
	// 	data: barData
	// },
	// {
	// 	id: "simplest-bar",
	// 	name: "Bar",
	// 	options: optionsNoXAxis,
	// 	data: dataNoXAxis
	// },
	{
		id: "simple-bar",
		name: "Bar",
		options: simpleBarOptions,
		data: simpleBarData
	},
	// {
	// 	id: "simple-bar-accessible",
	// 	name: "Accessible Bar",
	// 	options: Object.assign({}, simpleBarOptions, {accessibility: true}),
	// 	data: simpleBarData
	// },
	// {
	// 	id: "line",
	// 	name: "Line",
	// 	options: barOptions,
	// 	data: barData
	// },
	// {
	// 	id: "stacked-bar",
	// 	name: "Stacked Bar",
	// 	options: stackedBarOptions,
	// 	data: stackedBarData
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
	// {
	// 	id: "pie",
	// 	name: "pie",
	// 	options: pieOptions,
	// 	data: pieData
	// },
	// {
	// 	id: "donut",
	// 	name: "donut",
	// 	options: donutOptions,
	// 	data: pieData
	// }
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
				e.preventDefault();

				changeDemoData(chartType, oldData, parseInt(element.getAttribute("data-promise-delay"), 10));
			};
		});
	}
};

const classyCharts = {};
chartTypes.forEach(type => {
	const classyContainer = document.getElementById(`classy-${type.id}-chart-holder`);
	if (classyContainer) {
		switch (type.id) {
			// case "grouped-bar":
			// 	classyCharts[type.id] = new GroupedBarChart(
			// 		classyContainer,
			// 		Object.assign({}, type.options, {type: type.id}),
			// 		type.data
			// 	);

			// 	setDemoActionsEventListener(type.id, type.data);

			// 	break;
			default:
			case "simple-bar":
				classyCharts[type.id] = new BarChart(
					classyContainer,
					{
						data: type.data,
						options: Object.assign({}, type.options, {type: type.id}),
					}
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
			// case "stacked-bar":
			// 	classyCharts[type.id] = new StackedBarChart(
			// 		classyContainer,
			// 		Object.assign({}, type.options, {type: type.id}),
			// 		type.data
			// 	);

			// 	setDemoActionsEventListener(type.id, type.data);

			// 	break;
			// case "pie":
			// 	classyCharts[type.id] = new PieChart(
			// 		classyContainer,
			// 		Object.assign({}, type.options, {type: type.id}),
			// 		new Promise((resolve, reject) => {
			// 			setTimeout(() => {
			// 				resolve(type.data);
			// 			}, 0);
			// 		})
			// 	);

			// 	setDemoActionsEventListener(type.id, type.data);

			// 	break;
			// case "donut":
			// 	classyCharts[type.id] = new DonutChart(
			// 		classyContainer,
			// 		Object.assign({}, type.options, {type: type.id}),
			// 		type.data
			// 	);

			// 	setDemoActionsEventListener(type.id, type.data);

			// 	break;
		}
	}
});

const changeDemoData = (chartType: any, oldData: any, delay?: number) => {
	let newData;

	const removeAKey = Math.random() > 0.5;

	// Function to be used to randomize a value
	const randomizeValue = currentVal => {
		const firstTry = Math.max(0.5 * currentVal, currentVal * Math.random() * (Math.random() * 5));
		const result = Math.min(2 * currentVal, firstTry);

		return Math.floor(result);
	};

	const classyChartObject = classyCharts[chartType];

	switch (chartType) {
		// case "donut":
		// case "pie":
		// 	// Randomize old data values
		// 	newData = oldData.map(dataPoint => {
		// 		return Object.assign({}, dataPoint, {value: randomizeValue(dataPoint.value)});
		// 	});

		// 	if (delay) {
		// 		const dataPromise = new Promise((resolve, reject) => {
		// 			setTimeout(() => {
		// 				resolve(newData);
		// 			}, delay || 0);
		// 		});

		// 		classyChartObject.setData(dataPromise);
		// 	} else {
		// 		classyChartObject.setData(newData);
		// 	}

		// 	if (chartType === "donut") {
		// 		setTimeout(() => {
		// 			// Update DonutCenter values
		// 			const { number: centerNumber } = classyChartObject.center.configs;
		// 			let newCenterNumber = Math.floor(Math.max(0.2 * centerNumber, centerNumber * Math.random() * (Math.random() * 5)));
		// 			if (newCenterNumber <= 10) {
		// 				newCenterNumber = 10000;
		// 			}

		// 			classyChartObject.center.configs.number = newCenterNumber;
		// 			classyChartObject.center.update();
		// 		}, delay || 0);
		// 	}

		// 	break;
		// case "grouped-bar":
		// 	newData = oldData.map(dataPoint => {
		// 		return Object.assign(
		// 			{},
		// 			dataPoint,
		// 			{
		// 				"Qty": randomizeValue(dataPoint.Qty),
		// 				"More": randomizeValue(dataPoint.More),
		// 				"Sold": randomizeValue(dataPoint.Sold)
		// 			}
		// 		);
		// 	});

		// 	if (removeAKey) {
		// 		const randomIndex = Math.random() * (newData.length - 1);
		// 		newData.splice(randomIndex, randomIndex);
		// 	}

		// 	classyChartObject.setData(newData);

		// 	break;
		case "simple-bar":
		case "simple-bar-accessible":
			newData = oldData.map(dataPoint => Object.assign({}, dataPoint, { value: randomizeValue(dataPoint.value)}));

			if (removeAKey) {
				const randomIndex = Math.random() * (newData.length - 1);
				newData.splice(randomIndex, randomIndex);
			}

			classyChartObject.setData(newData);

			break;
		// case "stacked-bar":
		// 	newData = oldData.map(dataPoint => {
		// 		Object.keys(dataPoint).forEach(key => {
		// 			if (key !== classyChartObject.options.axis.x.domain) {
		// 				dataPoint[key] = randomizeValue(dataPoint[key]);
		// 			}

		// 			delete dataPoint.totalDatumValue;
		// 		});

		// 		return dataPoint;
		// 	});

		// 	if (removeAKey) {
		// 		const randomIndex = Math.random() * (newData.length - 1);
		// 		newData.splice(randomIndex, randomIndex);
		// 	}

		// 	classyChartObject.setData(newData);

		// 	break;
	}
};
