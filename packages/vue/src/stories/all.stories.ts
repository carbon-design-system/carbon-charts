import { storiesOf, type Args } from '@storybook/vue'
import sdk from '@stackblitz/sdk'
import { ChartTheme } from '@carbon/charts'
import { type Demo, type DemoGroup, storybookDemoGroups } from '@carbon/charts/demo'
import * as ChartComponents from '../components'

const DEFAULT_THEME = ChartTheme.G100

storiesOf('Docs/Welcome', module).add(
	'Welcome',
	() => ({
		template: `
			<div class="container intro">
				<div class="welcome__container" style="background: url(./welcome.png) no-repeat center center fixed; background-size: cover;">
					<div class="welcome__content">
						<h2 class="welcome__heading">Carbon Charts</h2>
						<h4 class="welcome__heading welcome__heading--subtitle">Vue</h4>
						<h5 class="welcome__heading welcome__heading--other">Other versions</h5>
						<ul>
							<li><a href="https://charts.carbondesignsystem.com" class="welcome__heading welcome__heading--other">Vanilla JavaScript</a></li>
							<li><a href="https://charts.carbondesignsystem.com/react" class="welcome__heading welcome__heading--other">React</a></li>
							<li><a href="https://charts.carbondesignsystem.com/angular" class="welcome__heading welcome__heading--other">Angular</a></li>
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

// Loop through demo groups array
storybookDemoGroups.forEach((demoGroup: DemoGroup) => {
	// Create story group
	const groupStories = storiesOf(`${demoGroup.storyGroupTitle}/${demoGroup.title}`, module)

	// Create stories within story group
	demoGroup.demos.forEach((demo: Demo) => {
		demo.options.theme = DEFAULT_THEME
		document.documentElement.setAttribute('data-carbon-theme', DEFAULT_THEME)
		const component = ChartComponents[demo.chartType.vue as keyof typeof ChartComponents]

		groupStories.add(
			demo.title,
			(args: Args) => ({
				components: {
					[demo.chartType.vue as string]: component
				},
				props: {
					data: {
						default: { ...demo.data, ...args?.data }
					},
					options: {
						default: { ...demo.options, ...args?.options }
					}
				},
				methods: {
					openSandbox() {
						sdk.openProject(demo.code.vue, { newWindow: true })
					}
				},
				template: `
					<div class="container">
						<h3>
							<b>Component:</b>
							<span class="cds--tag cds--tag--green component-name">${demo.chartType.vue}</span>
						</h3>

						<p class="props">
							<b>Props:</b> <a href="/?path=/docs/docs-tutorials-tabular-data-format">data</a>, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/interfaces.html" target="_blank">options</a>
						</p>

						<div class="marginTop-30" id="chart-demo">
							<${demo.chartType.vue} :data="data" :options="options"></${demo.chartType.vue}>
						</div>

						<h3 class="marginTop-30">Code sample</h3>

						<a href="#" @click.prevent="openSandbox()">
							<img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" class="marginTop" alt="Edit on StackBlitz" />
						</a>

					</div>`
			}),
			{
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
			}
		)
	})
})
