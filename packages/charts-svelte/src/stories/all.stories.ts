import { storiesOf, type Args } from '@storybook/svelte'
import { ChartTheme } from '@carbon/charts'
import { type Demo, type DemoGroup, storybookDemoGroups } from '@carbon/charts/demo'
import * as ChartComponents from '../lib'
import ChartWrapper from './ChartWrapper.svelte'
import Welcome from './Welcome.svelte'

const DEFAULT_THEME = ChartTheme.G100
const introStories = storiesOf('Docs', module) // API to be deprecated soon

introStories.add(
	'Welcome',
	() => ({
		Component: Welcome
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	}
)

// Loop through demos for group
storybookDemoGroups.forEach((demoGroup: DemoGroup) => {
	const groupStories = storiesOf(`${demoGroup.storyGroupTitle}/${demoGroup.title}`, module)

	// Create stories within story group
	demoGroup.demos.forEach((demo: Demo) => {
		demo.options.theme = DEFAULT_THEME
		document.documentElement.setAttribute('data-carbon-theme', DEFAULT_THEME)
		let chartType = demo.chartType.vanilla

		switch (chartType) {
			case 'SimpleBarChart':
				chartType = 'BarChartSimple'
				break
			case 'GroupedBarChart':
				chartType = 'BarChartGrouped'
				break
			case 'StackedBarChart':
				chartType = 'BarChartStacked'
				break
		}

		groupStories.add(
			demo.title,
			(args: Args) => ({
				Component: ChartWrapper,
				props: {
					DemoComponent: ChartComponents[chartType],
					chartType,
					demo: { ...demo, ...args }
				}
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
