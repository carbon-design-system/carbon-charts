import marked from "marked";

export const baseChartOptions = marked(`
# Options - All charts

\`\`\`javascript
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
