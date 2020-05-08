import marked from "marked";

export const eventListenersTutorial = marked(`
# Events in Carbon Charts
Event dispatching for chart elements allows applications to trigger custom UI actions and states when users interact with the charts.

You can see the current dispatched events [here](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/src/interfaces/events.ts).

&nbsp;
### Listening for events
To listen for event just use a reference to the chart to add an event listener for one of the dispatched events above.
This is an example for adding an event listener for a mouseover event on bar chart \`rect\`s.

\`\`\`js
barChart.services.events.addEventListener("bar-onmouseover", e => {
	console.log(e.detail);
});
\`\`\`

`);
