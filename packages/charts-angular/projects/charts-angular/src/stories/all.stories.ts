import { storiesOf, type Args, type StoryFn } from '@storybook/angular'
import sdk from '@stackblitz/sdk'
import { ChartTheme } from '@carbon/charts'
import type { Demo, DemoGroup } from './Demo'
import { ChartsModule } from '../public-api'
import { storybookDemoGroups } from '@carbon/charts/demo' // FIX

const DEFAULT_THEME = ChartTheme.G100

const introSection = storiesOf('Docs', module).add(
	'Welcome',
	() => ({
		template: `
		<div class="container intro">
			<div
			class="welcome__container"
			style="background: url(./welcome.png) no-repeat center center fixed; background-size: cover;">
				<div class="welcome__content">
					<h2 class="welcome__heading">Carbon Charts</h2>
					<h4 class="welcome__heading welcome__heading--subtitle">(Angular)</h4>
					<h5 class="welcome__heading welcome__heading--other">Other versions</h5>
					<ul>
						<li><a href="https://charts.carbondesignsystem.com" class="welcome__heading welcome__heading--other">Vanilla JavaScript</a></li>
						<li><a href="https://charts.carbondesignsystem.com/react" class="welcome__heading welcome__heading--other">React</a></li>
						<li><a href="https://charts.carbondesignsystem.com/vue" class="welcome__heading welcome__heading--other">Vue</a></li>
						<li><a href="https://charts.carbondesignsystem.com/svelte" class="welcome__heading welcome__heading--other">Svelte</a></li>
					</ul>
					<span class="netlify">Deploys by <a href="https://netlify.com" target="_blank">Netlify</a></span>
				</div>
			</div>
		</div>`
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	}
)

const getTemplate = (componentSelector: string) => `
	<div class="container">
		<div class="v10-banner">
			This version relies on <b>Carbon v11</b>. If you're using Carbon v10, <a href="https://carbon-charts-0x.netlify.app" target="_blank" rel="noreferrer">see the legacy demo site</a>
		</div>
		<h3>
			<b>Component:</b>
			<span class="cds--tag cds--tag--green component-name">${componentSelector}</span>
		</h3>
		<p class="props">
		  <b>Props:</b> data, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a>
		</p>
		<div class="marginTop-30" id="chart-demo">
			<${componentSelector} [data]="data" [options]="options"></${componentSelector}>
		</div>
		<h3 class="marginTop-30">Code sample</h3>
		<p>Opens in a new tab. Please ensure pop-up blocker is not on.</p><br/>
		<a href="#" (click)="openSandbox($event)">
			<img
				src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
				className="marginTop"
				alt="Edit on StackBlitz"
			/>
		</a>
	</div>`

// Loop through demo groups array
storybookDemoGroups.forEach((demoGroup: DemoGroup) => {
	// Create story group
	const groupStories = storiesOf(`${demoGroup.storyGroupTitle}/${demoGroup.title}`, module)

	// Create stories within story group
	demoGroup.demos.forEach((demo: Demo) => {
		demo.options.theme = DEFAULT_THEME
		document.documentElement.setAttribute('data-carbon-theme', DEFAULT_THEME)
		const demoStory: StoryFn = (args: Args) => ({
			template: getTemplate(demo.chartType.angular),
			moduleMetadata: {
				imports: [ChartsModule]
			},
			props: {
				data: args['data'],
				options: args['options'],
				// StackBlitz
				openSandbox: (event: Event) => {
					event.preventDefault()
					sdk.openProject(demo.code.angular, { newWindow: true })
				}
			}
		})
		groupStories.add(demo.title, demoStory, {
			args: {
				data: demo.data,
				options: demo.options
			},
			argTypes: {
				data: {
					control: { type: 'object' }
				},
				options: {
					control: { type: 'object' }
				}
			}
		})
	})
})
