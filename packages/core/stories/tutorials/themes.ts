import marked from 'marked';

export const themesTutorial = {
	name: 'Themes',
	content: marked(`
# Themes

We support all 4 Carbon themes (white, g10, g90 & g100).

We no longer ship all four themes included inside the main CSS bundle.

**If using CSS:**

You'd need to import one of the below CSS bundles.

* \`@carbon/charts/styles.css\` (default Carbon White theme)
* \`@carbon/charts/styles-g10.css\`
* \`@carbon/charts/styles-g90.css\`
* \`@carbon/charts/styles-g100.css\`

**If using SCSS:**

Importing \`@carbon/charts/styles/styles.scss\` will include the default Carbon White themed styles in your application.

Using the \`$carbon--theme\`flag you’d be able to customize what theme you’d bundle onto your application:

\`\`\`scss
@import "@carbon/themes/scss/themes";

// $carbon--theme: $carbon--theme--g10;
// $carbon--theme: $carbon--theme--g90;
// $carbon--theme: $carbon--theme--g100;

@import "@carbon/charts/styles/styles.scss";
\`\`\`

## Things to keep in mind
- Our new color palette udpates automatically on theme switches
- In some chart types such as **Treemap**, you'd need to update the chart after swapping out the themes (this is if you are updating the theme on a chart that's already been rendered). In order to do this you would call \`myChart.update()\` on your charting object instance.

`),
};
