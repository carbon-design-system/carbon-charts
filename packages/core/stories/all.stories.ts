import { storiesOf } from '@storybook/html';
import { withKnobs, object } from '@storybook/addon-knobs';

import { storybookDemoGroups, DemoGroupTypes } from '../demo/data';
import * as ChartComponents from '../src/charts';
import * as storyUtils from '../demo/utils';

import * as Configuration from '../src/configuration';
const colorPairingOptions = Configuration.color.pairingOptions;

import '../demo/styles.scss';

const introStories = storiesOf('Docs|', module).addDecorator(withKnobs);

// Loop through the demos for the group
introStories.add('Welcome', () => {
	// container creation
	const container = document.createElement('div');
	container.setAttribute('class', 'container intro');

	container.innerHTML = `<div
	class="welcome__container"
	style="
	  background: url(./welcome.png) no-repeat center center fixed;
	  background-size: cover;
	">
	<div class="welcome__content">
		<h2 class="welcome__heading">Carbon Charts</h2>
		<h4 class="welcome__heading welcome__heading--subtitle">(vanilla)</h4>

		<h5 class="welcome__heading welcome__heading--other">Other versions</h5>
		<ul>
			<li><a href="https://charts.carbondesignsystem.com/react" class="welcome__heading welcome__heading--other">React</a></li>
			<li><a href="https://charts.carbondesignsystem.com/angular" class="welcome__heading welcome__heading--other">Angular</a></li>
			<li><a href="https://charts.carbondesignsystem.com/vue" class="welcome__heading welcome__heading--other">Vue</a></li>
			<li><a href="https://charts.carbondesignsystem.com/svelte" class="welcome__heading welcome__heading--other">Svelte</a></li>
		</ul>

		<span class="netlify">Deploys by <a href="https://netlify.com" target="_blank">Netlify</a></span>
	</div>
  </div>`;

	return container;
});

// Loop through all demo groups
storybookDemoGroups.forEach((demoGroup) => {
	// Create story group for each demo group
	const groupStories = storiesOf(
		`${demoGroup.storyGroupTitle}|${demoGroup.title}`,
		module
	).addDecorator(withKnobs);

	demoGroup.demos.forEach((demo) => {
		const ClassToInitialize = ChartComponents[demo.chartType.vanilla];

		// Loop through the demos for the group
		groupStories.add(demo.title, () => {
			// container creation
			const container = document.createElement('div');
			container.setAttribute('class', 'container theme--g100');

			container.innerHTML = `
<h3>
	<b class="component">Component</b>
	<span class="bx--tag bx--tag--green component-name">${
		demo.chartType.vanilla
	}</span>
</h3>
<p class="props">
	<span><b>Props: </b><span><a href="/?path=/story/tutorials--tabular-data-format">data</a>, </span><a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></span>
</p>

${
	demo.options.experimental
		? `
<div data-notification
  class="bx--inline-notification bx--inline-notification--warning"
  role="alert">
  <div class="bx--inline-notification__details">
    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1	s1,0.4,1,1S10.6,16,10,16z"></path><path d="M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z" data-icon-path="inner-path" opacity="0"></path></svg>
    <div class="bx--inline-notification__text-wrapper">
      <p class="bx--inline-notification__title">Alpha release</p>
      <p class="bx--inline-notification__subtitle">This is not a stable release of this component, certain pieces might be added or modified in the future. Additionally, the current implementation might have issues that we have not uncovered yet, and will work to resolve through our stable release of the component.</p>
    </div>
  </div>
</div>`
		: ''
}

${demo.isHighScale ? storyUtils.generateHighScaleDemoDataForm() : ''}
<div id="charting-controls">
</div>

<div class="marginTop-45" id="chart-demo">
</div>

<h3 class="marginTop-45">Code Sample</h3>
<a href="${demo.codesandbox.vanilla}" target="_blank">
	<img class="marginTop" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<h3 class="marginTop-45">Other versions</h3>
<p style="opacity: 0.75;">(currently on <strong>vanilla</strong>)</p>
<div id="other-versions">
</div>
			`;

			// Initialize chart
			const chart = new ClassToInitialize(
				container.querySelector('div#chart-demo'),
				{
					data: object(
						'Data',
						demo.isHighScale
							? storyUtils.generateRandomData(100, 100, 500)
							: demo.data
					),
					options: object('Options', demo.options),
				}
			);

			storyUtils.addDemoDataFormListeners(container, demo, chart);
			storyUtils.addControls(container, demoGroup, chart, {
				colorPairingOptions,
			});

			storyUtils.addOtherVersions(container, demoGroup, demo, {
				currentVersion: 'vanilla',
			});

			return container;
		});
	});
});
