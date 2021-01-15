import marked from 'marked';

export const apiTutorial = {
	name: 'API',
	content: marked(`
# API

When initializing an object using any of our exposed chart types (e.g. PieChart), the object that you'll receive includes many useful elements inside it.

\`\`\`js
const myChart = new PieChart({
	data: ...,
	options: ...
});

console.log(myChart);

// RESULT
{
	model, // where we store charting data & options
	services, // globalized functions that can affect charting behaviour. (e.g. event listener dispatching etc.)
	components // internally used for arranging the charting layout, you can disregard this
}
\`\`\`

## Data updates
Data updates are done through the model.

\`\`\`js
const myChart = new PieChart({
	data: ...,
	options: ...
});

myChart.model.setData(...);
\`\`\`

Similarly, \`myChart.model.getData();\` & \`myChart.model.getDisplayData();\` can provide you the full data that's stored or only the portion that's currently being displayed.

## Option updates
Options updates are also done through the model.

\`\`\`js
const myChart = new PieChart({
	data: ...,
	options: ...
});

myChart.model.setOptions(...);
\`\`\`

Similarly, \`myChart.model.getOptions();\` will provide you with the options that are stored.

## What are services?
Services are globalized functions that have proven useful across the board. General tasks such as event dispatching, transition handling, DOM-related activities etc. are handled by services.

**Example:**

Event listeners can be added through the events service:

\`\`\`js
barChart.services.events.addEventListener("bar-onmouseover", e => {
    console.log(e.detail);
});
\`\`\`

## API Reference
Our full API reference docs can be found [here](https://carbon-design-system.github.io/carbon-charts/documentation/).

To get an idea of all the possible configurations in every chart type, see [here](https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html).
`),
};
