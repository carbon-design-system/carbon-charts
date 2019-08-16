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
export const createChartHolder = chartType => {
	const chartHolder = document.createElement("div");
	chartHolder.id = `${chartType}-chart-holder`;
	chartHolder.classList.add("chart-holder");

	document.body.appendChild(chartHolder);

	return chartHolder;
};

export const grabClassyContainer = chartType => {
	return document.getElementById(`classy-${chartType}-chart-holder`);
};

export const removeChart = chartType => {
	const oldClassyContainer = grabClassyContainer(chartType);
	if (oldClassyContainer) {
		oldClassyContainer.parentNode.removeChild(oldClassyContainer);
	}
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

// Objects/data
export const selectors = {
	OUTERSVG: "svg.chart-svg",
	INNERWRAP: "g.inner-wrap",
	TOOLTIP: "div.chart-tooltip",
	LEGEND_BTN: "li.legend-btn",
	pie: {
		SLICE: "path"
	}
};
export const colors = [
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
