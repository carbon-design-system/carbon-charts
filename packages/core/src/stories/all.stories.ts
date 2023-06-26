import { storiesOf, type Args } from '@storybook/html'
import sdk from '@stackblitz/sdk'
import { ChartTheme } from '@/interfaces/enums'
import * as ChartComponents from '@/charts'
import { color } from '@/configuration-non-customizable'
import  { type Demo, type DemoGroup, storybookDemoGroups } from '@/demo/charts'
import {
	addControls,
	addOtherVersions,
} from '@/demo/utils/story-widgets'

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
							<b>Props:</b> <a href="/?path=/docs/docs-tutorials-tabular-data-format">data</a>, </span><a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options (opens in new window)</a></span>
						</p>
						${
							demo.options.experimental
								? `
						<div data-notification class="cds--inline-notification cds--inline-notification--warning" role="alert">
							<div class="cds--inline-notification__details">
								<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="cds--inline-notification__icon" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1	s1,0.4,1,1S10.6,16,10,16z"></path><path d="M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z" data-icon-path="inner-path" opacity="0"></path></svg>
								<div class="cds--inline-notification__text-wrapper">
									<p class="cds--inline-notification__title">Alpha release</p>
									<p class="cds--inline-notification__subtitle">This is not a stable release of this component, certain pieces might be added or modified in the future. Additionally, the current implementation might have issues that we have not uncovered yet, and will work to resolve through our stable release of the component.</p>
								</div>
							</div>
						</div>`
								: ''
						}

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
				sandboxButton.addEventListener('click', () => {
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

				addOtherVersions(container, demoGroup, demo, {
					currentVersion: 'vanilla'
				})

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
