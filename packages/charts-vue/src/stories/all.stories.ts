import { storiesOf, type Args } from '@storybook/vue3'
import * as ChartComponents from '../components'
import { storybookDemoGroups } from '@carbon/charts/demo'
import type { BaseChartOptions, ChartTabularData } from '@carbon/charts'

interface Demo {
	title: string
	isHighScale: boolean
	chartType: {
		vue: string
	}
	data: ChartTabularData
	options: BaseChartOptions
	codesandbox: {
		vue: string
	}
}

interface DemoGroup {
	storyGroupTitle: string
	title: string
	demos: Demo[]
}

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
	demoGroup.demos.forEach((demo) => {
		if (demo.isHighScale) {
			return
		}
		const component = ChartComponents[demo.chartType.vue]
		groupStories.add(
			demo.title,
			(args: Args) => ({
				components: {
					[demo.chartType.vue]: component
				},
				props: {
					data: {
						default: { ...demo.data, ...args?.data }
					},
					options: {
						default: { ...demo.options, ...args?.options }
					}
				},
				template: `
						<div class="container theme--white">

							<div class="v10-banner">
								This version relies on <b>Carbon v11</b>. If you're using Carbon v10, <a href="https://carbon-charts-0x.netlify.app" target="_blank" rel="noreferrer">see the legacy demo site</a>
							</div>

							<h3>
								<b>Component:</b>
								<span class="cds--tag cds--tag--green component-name">${demo.chartType.vue}</span>
							</h3>

							<p class="props">
								<b>Props:</b> data, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a>
							</p>

							<div class="marginTop-30" id="chart-demo">
								<${demo.chartType.vue} :data="data" :options="options"></${demo.chartType.vue}>
							</div>

							<h3 class="marginTop-30">Code sample</h3>

							<a href="${demo.codesandbox.vue}" target="_blank">
								<img src="https://codesandbox.io/static/img/play-codesandbox.svg" class="marginTop" alt="Edit on Codesandbox" />
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
