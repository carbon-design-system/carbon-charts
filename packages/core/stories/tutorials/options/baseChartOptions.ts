import marked from "marked";

export const axisOptions = marked(`
# Options - All charts

\`\`\`
const chart: BaseChartOptions = {
	width: null,
	height: null,
	resizable: true,
	tooltip: baseTooltip,
	legend,
	style: {
		prefix: "cc"
	},
	data: {
		groupMapsTo: "group"
	},
	color: {
		scale: null
	}
};
\`\`\`

`);
