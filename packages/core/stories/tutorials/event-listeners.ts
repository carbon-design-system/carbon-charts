import marked from 'marked';

export const eventListenersTutorial = {
	name: 'Event listeners',
	content: marked(`
# Events in Carbon Charts
Event dispatching for chart elements allows applications to trigger custom UI actions and states when users interact with the charts.

You can see the current dispatched events [here](https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_events_.html).

&nbsp;
### Listening for events
To listen for event just use a reference to the chart to add an event listener for one of the dispatched events above.
This is an example for adding an event listener for a mouseover event on bar chart \`rect\`s.

\`\`\`js
barChart.services.events.addEventListener("bar-onmouseover", e => {
	console.log(e.detail);
});
\`\`\`

&nbsp;

### Code examples
Here are some possible solutions for event binding:

- [vanilla](https://codesandbox.io/s/carbon-charts-vanilla-event-binding-9b1i5?file=/src/index.js)
- [React](https://codesandbox.io/s/carbon-charts-react-event-binding-contributed-by-eric-lowry-upztp?file=/src/App.js)

`),
};
