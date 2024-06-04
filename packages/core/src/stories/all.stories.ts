import { storiesOf, type Args } from '@storybook/html'
import sdk from '@stackblitz/sdk'
import { ChartTheme } from '@/interfaces/enums'
import * as ChartComponents from '@/charts'
import { color } from '@/configuration-non-customizable'
import { type Demo, type DemoGroup, storybookDemoGroups } from '@/demo/charts'
import { addControls, addOtherVersions } from '@/demo/utils/story-widgets'

const colorPairingOptions = color.pairingOptions
const DEFAULT_THEME = ChartTheme.G100

const introStories = storiesOf('Docs', module)

// Loop through the demos for the group
introStories.add(
	'Welcome',
	() => {
		// container creation
		const container = document.createElement('div')
		container.setAttribute('class', 'container intro')

		container.innerHTML = `
				<div class="welcome__container" style="background: url(./welcome.png) no-repeat center center fixed; background-size: cover;">
					<div class="welcome__content">
						<h2 class="welcome__heading">Carbon Charts</h2>
						<h4 class="welcome__heading welcome__heading--subtitle">Vanilla JavaScript</h4>
						<h5 class="welcome__heading welcome__heading--other">Other versions</h5>
						<ul>
							<li><a href="https://charts.carbondesignsystem.com/react" class="welcome__heading welcome__heading--other">React</a></li>
							<li><a href="https://charts.carbondesignsystem.com/angular" class="welcome__heading welcome__heading--other">Angular</a></li>
							<li><a href="https://charts.carbondesignsystem.com/vue" class="welcome__heading welcome__heading--other">Vue</a></li>
							<li><a href="https://charts.carbondesignsystem.com/svelte" class="welcome__heading welcome__heading--other">Svelte</a></li>
						</ul>
						<span class="netlify">Deploys by <a href="https://netlify.com" target="_blank">Netlify</a></span>
					</div>
				</div>`

		return container
	},
	{
		controls: {
			hideNoControlsWarning: true
		}
	}
)

// Loop through all demo groups
storybookDemoGroups.forEach((demoGroup: DemoGroup) => {
	// Create story group for each demo group
	const groupStories = storiesOf(`${demoGroup.storyGroupTitle}/${demoGroup.title}`, module)

	demoGroup.demos.forEach((demo: Demo) => {
		demo.options.theme = DEFAULT_THEME
		const key = demo.chartType.vanilla as keyof typeof ChartComponents
		const ClassToInitialize = ChartComponents[key]

		// Loop through the demos for the group
		groupStories.add(
			demo.title,
			(args: Args) => {
				// container creation
				const container = document.createElement('div')
				container.setAttribute('class', 'container')
				container.ownerDocument.documentElement.setAttribute('data-carbon-theme', DEFAULT_THEME)
				container.innerHTML = `
					<main>
						<h3>
							<b class="component">Component</b>
							<span class="cds--tag cds--tag--green component-name">${demo.chartType.vanilla}</span>
						</h3>
						<p class="props">
							<b>Props:</b> <a href="/?path=/docs/docs-tutorials-tabular-data-format">data</a>, </span><a href="https://charts.carbondesignsystem.com/documentation/modules/interfaces.html" target="_blank">options (opens in new window)</a></span>
						</p>

						<div id="charting-controls"></div>

						<div class="marginTop-45" id="chart-demo"></div>

						<h3 class="marginTop-45">Code Sample</h3>
						<p>Opens in a new tab. Please ensure pop-up blocker is not on.</p><br/>
						<button id="sandbox" type="button" style="border:none; padding:0; background-color: transparent; cursor: pointer">
							<img
								src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
								className="marginTop"
								alt="Edit on StackBlitz"
							/>
						</button>

						<h3 class="marginTop-45">Other versions</h3>
						<p style="opacity: 0.75;">(currently on <strong>JavaScript (Vanilla)</strong>)</p>

						<div id="other-versions"></div>
					</main>`

				const sandboxButton = container.querySelector('#sandbox')
				sandboxButton?.addEventListener('click', () => {
					sdk.openProject(demo.code.vanilla, { newWindow: true })
				})

				// Initialize chart
				const chart = new ClassToInitialize(container.querySelector('div#chart-demo'), {
					data: args.data,
					options: args.options
				})

				addControls(container, demoGroup, chart, {
					colorPairingOptions
				})

				addOtherVersions(container, 'Vanilla JavaScript')

				return container
			},
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
