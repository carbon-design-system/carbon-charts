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
