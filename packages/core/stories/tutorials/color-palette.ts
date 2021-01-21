import marked from 'marked';

export const colorPaletteTutorial = {
	name: 'Color palette',
	content: marked(`
# Color palette

Carbon charts recently updated the default color palettes for \`@carbon/charts\` to follow the new IBM Design Language data vizualization palette.
This means more accessibility and usability in terms of the color variants provided by the library.

_For more guidance on using the IBM Design Language dataviz palette, see [here](https://www.carbondesignsystem.com/data-visualization/color-palettes/)_

___

## Using a dafault palette
You can add the following chart options if you want to choose a color palette option from the IBM dataviz palette.
By default, carbon-charts will assign the first color option for the appropriate amount of data groups (ex. charts with 4 data groups will get the first option for the 4-color palettes).


\`\`\`
const verySimpleBarData = [
    { group: "Qty", value: 65000 },
    { group: "More", value: 29123 }
]; // bar chart with 2 data groups "Qty" and "More"

const verySimpleBarOptions = {
	color: {
		pairing: {
			option: 2 // use the second color palette option for 2-group charts
		}
	}
};
\`\`\`

Refer to the Carbon Design Website for the full index of color palette options (by group size).

___

## Using a different size color palette
**Note: It is not suggested to use a color palette designed for a different number of data groups than the chart is rendering.**

\`\`\`
// line chart with 2 data groups "Saturday" and "Sunday" initially but expecting
// 3 data groups on some data loads when long weekend "Friday" or "Monday" is included
const lineData = [
    { group: "Saturday", sales: 65000 },
    { group: "Sunday", sales: 29123 }
];

const lineOptions = {
	color: {
		pairing: {
			numberOfVariants: 3; // use a palette with 3 color variants
			option: 2 // use the 2nd option of 3 color charts
		}
	}
};
\`\`\`

___

## Using a custom color scale

You're also able to provide a custom
\`color range\` to be used within the color scale.
You are expected to define values for _all the data groups_ in your chart. If less data groups are provided than the chart contains, it will
default to using the IBM Design Language dataviz palette.

\`\`\`
const simpleBarOptions = {
	color: {
		scale: {
			"Dataset 1": "blue",
			"Dataset 2": "red"
		} // chart only has 2 data groups
	}
};
\`\`\`
`),
};
