import marked from 'marked';

export const themesTutorial = {
	name: 'Themes',
	content: marked(`
# Themes
We support all 4 Carbon themes (white, g10, g90 & g100), which are all included inside the main CSS bundle.

**If using CSS:**

You'd need to import our **CSS bundle** \`@carbon/charts/styles.css\`

Now all you need is to add a \`data-carbon-theme\` attribute to your chart holder element.

e.g.

\`\`\`html
<div id="my-sample-chart" data-carbon-theme="g100">
</div>
\`\`\`

\`\`\`js
const chartHolder = document.getElementById("my-sample-chart");
new SimpleBarChart(chartHolder, {
	data,
	options
});
\`\`\`

**If using SCSS:**

\`\`\`scss
@use "@carbon/styles/scss/theme" as *;
@use "@carbon/styles/scss/themes";

@import "@carbon/charts/styles/styles.scss";

div.my-sample-chart.theme__white {
	@include styles.theme(styles.$white);
}

div.my-sample-chart.theme__g10 {
	@include styles.theme(styles.$g10);
}

div.my-sample-chart.theme__g90 {
	@include styles.theme(styles.$g90);
}

div.my-sample-chart.theme__g100 {
	@include styles.theme(styles.$g100);
}
\`\`\`

## Things to keep in mind
- Our color palette udpates automatically on theme switches
- In some chart types such as **Treemap**, you'd need to update the chart after swapping out the themes (this is if you are updating the theme on a chart that's already been rendered). In order to do this you would call \`myChart.update()\` on your charting object instance.
`),
};
