// Functions
export const createClassyContainer = (chartType) => {
	const classyContainer = document.createElement("div");
	classyContainer.id = `classy-${chartType}-chart-holder`;
	classyContainer.classList.add("chart-holder");

	return classyContainer;
};

export const grabClassyContainer = (chartType) => {
	return document.getElementById(`classy-${chartType}-chart-holder`);
};

// Objects/data
export const selectors = {
	OUTERSVG: "svg.chart-svg",
	INNERWRAP: "g.inner-wrap",
	TOOLTIP: "div.chart-tooltip"
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
