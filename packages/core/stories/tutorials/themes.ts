import marked from 'marked';

export const themesTutorial = {
	name: 'Themes',
	content: marked(`
# Themes
We support all 4 Carbon themes (white, g10, g90 & g100), which are all included inside the main CSS bundle.
After importing the carbon styles, pass in one of the four Carbon themes in options like in the examples below.

**If using CSS:**

You'd need to import our **CSS bundle** \`@carbon/charts/styles.css\`

e.g.

\`\`\`html
<div id="my-sample-chart"></div>
\`\`\`

\`\`\`js
const chartHolder = document.getElementById("my-sample-chart");
new SimpleBarChart(chartHolder, {
	data,
	options: {
		...myChartOptions,
		theme: "g100", // Pass theme in options
	}
});
\`\`\`

**If using SCSS:**

\`\`\`scss
@import "@carbon/charts/styles/styles.scss";
\`\`\`

\`\`\`js
const chartHolder = document.getElementById("my-sample-chart");
new SimpleBarChart(chartHolder, {
	data,
	options: {
		...myChartOptions,
		theme: "g100", // Pass theme in options
	}
});
\`\`\`

## Color palette
- Our color palette udpates automatically on theme switches
`),
};
