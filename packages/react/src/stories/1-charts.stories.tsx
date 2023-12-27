import { useEffect, useRef, type MouseEvent } from 'react'
import { storiesOf, type Args } from '@storybook/react'
import sdk from '@stackblitz/sdk'
import { color, ChartTheme } from '@carbon/charts'
import {
	addControls,
	addOtherVersions,
	type Demo,
	type DemoGroup,
	storybookDemoGroups
} from '@carbon/charts/demo'
import * as ChartComponents from '../charts'

const DEFAULT_THEME = ChartTheme.G100
const colorPairingOptions = color.pairingOptions

// Loop through demo groups array
storybookDemoGroups.forEach((demoGroup: DemoGroup) => {
	// Create story group
	const groupStories = storiesOf(`${demoGroup.storyGroupTitle}/${demoGroup.title}`, module)

	groupStories.addDecorator(story => {
		document.documentElement.setAttribute('data-carbon-theme', DEFAULT_THEME)
		return story()
	})

	// Create stories within story group
	demoGroup.demos.forEach((demo: Demo) => {
		demo.options.theme = DEFAULT_THEME

		// Define DemoComponent
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const DemoComponent = (ChartComponents as { [key: string]: any })[demo.chartType.vanilla]

		groupStories.add(
			demo.title,
			(args: Args) => {
				const demoRef = useRef(null)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const chartRef = useRef<{ chart: any }>({ chart: null })

				// Using useEffect to update when demoRef or chartRef changes
				useEffect(() => {
					if (demoRef.current && chartRef.current) {
						const container = demoRef.current
						const chart = chartRef.current.chart

						addControls(container, demoGroup, chart, {
							colorPairingOptions
						})

						addOtherVersions(container, 'React')
					}
				}, [demoRef.current, chartRef.current])

				const openSandbox = (event: MouseEvent<HTMLAnchorElement>) => {
					event.preventDefault()
					sdk.openProject(demo.code.react, { newWindow: true })
				}

				return (
					<div className="container" ref={demoRef}>
						<h3>
							<b>Component:</b>
							<span className="cds--tag cds--tag--green component-name">{`<${demo.chartType.vanilla} />`}</span>
						</h3>

						<p className="props">
							<b>Props:</b> <a href="/?path=/docs/docs-tutorials-tabular-data-format--docs">data</a>
							,{' '}
							<a
								href="https://charts.carbondesignsystem.com/documentation/modules/interfaces.html"
								target="_blank"
								rel="noreferrer">
								options
							</a>
						</p>

						<div id="charting-controls"></div>

						<div className="marginTop-30" id="chart-demo">
							<DemoComponent data={args.data} options={args.options} ref={chartRef} />
						</div>

						<h3 className="marginTop-30">Code sample</h3>

						<a href="#" onClick={openSandbox}>
							<img
								src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
								className="marginTop"
								alt="Edit on StackBlitz"
							/>
						</a>

						<h3 className="marginTop-45">Other versions</h3>
						<p style={{ opacity: 0.75 }}>
							(currently on <strong>React</strong>)
						</p>
						<div id="other-versions"></div>
					</div>
				)
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
