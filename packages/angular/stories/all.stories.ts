import { storiesOf } from '@storybook/angular';
import { withKnobs, object } from '@storybook/addon-knobs';

import { ChartsModule } from '../src/charts.module';

import { storybookDemoGroups } from '@carbon/charts/demo/data';

const getTemplate = (demo) => `
	<div class="container theme--white">
		<div class="v10-banner">
			This version is in beta & relies on <b>Carbon v11</b>. If you're using Carbon v10, <a href="https://carbon-charts-0x.netlify.app" target="_blank" rel="noreferrer">see the legacy demo site</a>
		</div>

		<h3>
			<b>Component:</b>
			<span class="cds--tag cds--tag--green component-name">${demo.chartType.angular}</span>
		</h3>
		<p class="props"><b>Props:</b> data, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></p>

		<div class="marginTop-30" id="chart-demo">
			<${demo.chartType.angular}
				class="n-chart"
				[data]="data"
				[options]="options"
				#${demo.chartType.vanilla}>
			</${demo.chartType.angular}>
		</div>


		<h3 class="marginTop-30">Code sample</h3>

		<div class="marginTop-30" *ngFor="let codeFile of codeFiles;">
			<h5>{{codeFile}}</h5>

			<div class="cds--snippet cds--snippet--multi cds--snippet--expand marginTop-15" data-code-snippet>
				<div class="cds--snippet-container" aria-label="Code Snippet Text">
					<pre><code>{{code[codeFile]}}</code></pre>
				</div>
			</div>
		</div>
	</div>
`;

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
			<h4 class="welcome__heading welcome__heading--subtitle">(Angular)</h4>

			<h5 class="welcome__heading welcome__heading--other">Other versions</h5>
			<ul>
				<li><a href="https://charts.carbondesignsystem.com" class="welcome__heading welcome__heading--other">vanilla</a></li>
				<li><a href="https://charts.carbondesignsystem.com/react" class="welcome__heading welcome__heading--other">React</a></li>
				<li><a href="https://charts.carbondesignsystem.com/vue" class="welcome__heading welcome__heading--other">Vue</a></li>
				<li><a href="https://charts.carbondesignsystem.com/svelte" class="welcome__heading welcome__heading--other">Svelte</a></li>
			</ul>

			<span class="netlify">Deploys by <a href="https://netlify.com" target="_blank">Netlify</a></span>
		</div>
	</div>
</div>`,
}));

// Loop through all demo groups
storybookDemoGroups.forEach((demoGroup) => {
	// Create story group for each demo group
	const groupStories = storiesOf(
		`${demoGroup.storyGroupTitle}|${demoGroup.title}`,
		module
	).addDecorator(withKnobs({ escapeHTML: false }));

	// Loop through the demos for the group
	demoGroup.demos.forEach((demo) => {
		if (demo.isHighScale) {
			return;
		}
		groupStories.add(demo.title, () => ({
			template: getTemplate(demo),
			moduleMetadata: {
				imports: [ChartsModule],
			},
			props: {
				data: object('Data', demo.data),
				options: object('Options', demo.options),
				codeFiles: Object.keys(demo.code.angular),
				code: demo.code.angular,
			},
		}));
	});
});
