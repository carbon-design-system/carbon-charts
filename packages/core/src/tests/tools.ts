// Extensions
Object.prototype["containsKeysAndValuesFrom"] = sourceObject => {
	let result = true;
	Object.keys(sourceObject).map(key => {
		const supposedValue = sourceObject[key];
		if (this[key] !== supposedValue) {
			result = false;
		}
	});

	return true;
};

// Functions
export const makeChartID = chartType => `${chartType}-chart-holder`;
export const createChartHolder = chartType => {
	const chartHolder = document.createElement("div");
	chartHolder.id = makeChartID(chartType);
	chartHolder.classList.add("chart-holder");

	document.body.appendChild(chartHolder);

	return chartHolder;
};

export const getChartHolder = chartType => document.getElementById(makeChartID(chartType));

export const removeChart = chartType => {
	const chartHolder = getChartHolder(chartType);
	if (chartHolder) {
		chartHolder.parentNode.removeChild(chartHolder);
	}
};

export const getComponentContainer = component => {
	const type = new component().type;
	return document.querySelector(`.cc-${type}`);
};

export const inputAndProcessedDataMatch = (chartObj, inputData) => {
	// Gather all pieces of processed data for every type of chart
	// const processedDataPoints = chartObj.displayData.reduce((finalArray, dataPoint) => {
	// 	if (dataPoint.items) {
	// 		// this is the "Other" label, in Pie & Donut
	// 		dataPoint.items.map(item => finalArray.push(item));

	// 		return finalArray;
	// 	}

	// 	finalArray.push(dataPoint);
	// 	return finalArray;
	// }, []);

	// let result = processedDataPoints.length === inputData.length;
	// if (result) {
	// 	processedDataPoints.forEach(dataPoint => {
	// 		console.log("datapoint", dataPoint);

	// 		// Check if every piece of data in the processed data array
	// 		// Contains every key-value pair from the input data provided to the chart
	// 		if (!dataPoint.containsKeysAndValuesFrom(inputData)) {
	// 			result = false;
	// 		}
	// 	});
	// }

	// TODO - Implement Deeper check
	return chartObj.displayData.datasets.length === inputData.datasets.length;
};
