import { storiesOf } from '@storybook/vue';
import { withKnobs, object } from '@storybook/addon-knobs';

import * as ChartComponents from '../src/index';

import { storybookDemoGroups } from '@carbon/charts/demo/data';

const introStories = storiesOf('Intro', module).addDecorator(withKnobs);

// Loop through the demos for the group
introStories.add('Welcome', () => ({
	template: `<div class="container intro">
		<div
		class="welcome__container"
		style="
		  background: url(./welcome.png) no-repeat center center fixed;
		  background-size: cover;
		">
			<div class="welcome__content">
				<h2 class="welcome__heading">Carbon Charts</h2>
				<h4 class="welcome__heading welcome__heading--subtitle">(Vue)</h4>

				<h5 class="welcome__heading welcome__heading--other">Other versions</h5>
				<ul>
					<li><a href="https://charts.carbondesignsystem.com" class="welcome__heading welcome__heading--other">vanilla</a></li>
					<li><a href="https://charts.carbondesignsystem.com/react" class="welcome__heading welcome__heading--other">React</a></li>
					<li><a href="https://charts.carbondesignsystem.com/angular" class="welcome__heading welcome__heading--other">Angular</a></li>
					<li><a href="https://charts.carbondesignsystem.com/svelte" class="welcome__heading welcome__heading--other">Svelte</a></li>
				</ul>

				<span class="netlify">Deploys by <a href="https://netlify.com" target="_blank">Netlify</a></span>
			</div>
		</div>
	</div>`,
}));

// Loop through all demo groups
storybookDemoGroups.forEach(demoGroup => {
	// Create story group for each demo group
	const groupStories = storiesOf(
		`${demoGroup.storyGroupTitle}|${demoGroup.title}`,
		module
	);

	if (!demoGroup.disableProps) {
		groupStories.addDecorator(withKnobs({ escapeHTML: false }));
	}

	// Loop through the demos for the group
	demoGroup.demos.forEach(demo => {
		if (demo.isHighScale) {
			return;
		}
		const component = ChartComponents[`Ccv${demo.chartType.vanilla}`];
		groupStories.add(demo.title, () => ({
			components: {
				[demo.chartType.vue]: component,
			},
			props: {
				data: {
					// Only using object knob when chart is NOT choropleth, otherwise props will show even when 'disabled'
					// This approach is used to bypass storybook bug
					default: demoGroup.disableProps
						? demo.data
						: object('Data', demo.data),
				},
				options: {
					default: demoGroup.disableProps
						? demo.options
						: object('Options', demo.options),
				},
			},
			template: `
				<div class="container theme--white">
					<div class="v10-banner">
						This version relies on <b>Carbon v11</b>. If you're using Carbon v10, <a href="https://carbon-charts-0x.netlify.app" target="_blank" rel="noreferrer">see the legacy demo site</a>
					</div>

					<h3>
						<b>Component:</b>
						<span class="cds--tag cds--tag--green component-name">
							${demo.chartType.vue}
						</span>
					</h3>

					<p class="props"><b>Props:</b> data, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></p>

					<div class="marginTop-30" id="chart-demo">
						<${demo.chartType.vue} :data="data" :options="options"></${demo.chartType.vue}>
					</div>

					${
						demo.codesandbox.vue
							? `<h3 class="marginTop-30">Code sample</h3>
					<a href="${demo.codesandbox.vue}" target="_blank">
						<img src="https://codesandbox.io/static/img/play-codesandbox.svg" class="marginTop" alt="Edit on Codesandbox" />
					</a>`
							: ''
					}
				</div>
			`,
		}));
	});
});
