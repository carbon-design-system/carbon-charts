import marked from 'marked';

export const themesTutorial = {
	name: 'Themes',
	content: marked(`
# Themes
We support all 4 Carbon themes (white, g10, g90 & g100), which are all included inside the main CSS bundle.
After importing the carbon styles, pass in one of the four Carbon themes in options like in the examples below.

**If using CSS:**

You'd need to import our **CSS bundle** \`@carbon/charts/styles.css\`

Now all you need is to add a \`data-carbon-theme\` attribute to your chart holder element.

e.g.

\`\`\`html
<div id="my-sample-chart"></div>
\`\`\`

\`\`\`js
const chartHolder = document.getElementById("my-sample-chart");
new SimpleBarChart(chartHolder, {
	theme: "g100", // Pass theme in options
	data,
	options
});
\`\`\`

**If using SCSS:**

\`\`\`scss
@use "@carbon/styles/scss/theme" as *;
@use "@carbon/styles/scss/themes";

@import "@carbon/charts/styles/styles.scss";
\`\`\`

\`\`\`js
const chartHolder = document.getElementById("my-sample-chart");
new SimpleBarChart(chartHolder, {
	theme: "g100", // Pass theme in options
	data,
	options
});
\`\`\`

## Things to keep in mind
- Our color palette udpates automatically on theme switches
- In some chart types such as **Treemap**, you'd need to update the chart after swapping out the themes (this is if you are updating the theme on a chart that's already been rendered). In order to do this you would call \`myChart.update()\` on your charting object instance.
`),
};
