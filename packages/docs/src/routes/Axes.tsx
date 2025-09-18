import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { CodeSnippet } from '@carbon/react/es'
import PageHeader from '../components/PageHeader'
import ConfigExamples from '../components/ConfigExamples'
import styled from 'styled-components'

// const ExampleImage = styled.img`
// 	width: 100%;
// `

const LogImage = styled.img`
	margin-top: 1rem;
	width: 50%;
`

export default function Axes() {
	const highlightCode = () => {
		hljs.registerLanguage('javascript', javascript)

		const nodes = document.querySelectorAll('pre code')
		nodes.forEach(el => {
			hljs.highlightElement(el as HTMLElement)
		})
	}

	useEffect(() => {
		highlightCode()
	})

	return (
		<>
			<PageHeader title="Axes" />
			<h2 id="simple">Single vs. Dual</h2>
			<p>
				Rectangular charts have a single x-axis and y-axis label by default. If you have datapoints
				with rangeIdentifiers (value) that represent two different units of measure (such as
				temperature and currency), it is best to display the data with dual axes.
			</p>
			<p>
				The following example shows options for a dual axis Line chart. The horizontal axis displays
				dates. The left vertical axis shows revenue and the right vertical axis shows attendees. The
				left axis is defined as the primary axis via the <strong>main</strong> property. The left
				and right axes have a <strong>correspondingDatasets</strong> property that represents an
				array of <Link to="/data">domainIdentifiers</Link>.
			</p>
			<CodeSnippet
				className="language-javascript"
				type="multi">{`import { LineChart, type LineChartOptions, ScaleTypes } from '@carbon/charts-svelte'

const options = <LineChartOptions>{
  axes: {
    bottom: {
      mapsTo: 'month_start',
      title: 'Date',
      scaleType: ScaleTypes.TIME // 'time'
    },
    left: {
      mapsTo: 'revenue',
      title: 'Revenue',
      scaleType: ScaleTypes.LINEAR, //'linear',
      main: true,
      correspondingDatasets: ['Revenue']
    },
    right: {
      mapsTo: 'attendees',
      title: 'Attendees',
      scaleType: ScaleTypes.LINEAR, // 'linear',
      correspondingDatasets: ['Attendees']
    }
  },
  curve: 'curveMonotoneX',
  height: '500px'
}`}</CodeSnippet>
			<h2 id="labels">Logarithmic scale</h2>
			<p>
				Axis charts have a{' '}
				<a
					href="https://charts.carbondesignsystem.com/api/interfaces/AxisOptions.html#scaleType"
					target="_blank">
					scaleType
				</a>{' '}
				property for their axes. A value of "log" will display that axis using a logarithmic scale.
			</p>
			<CodeSnippet
				className="language-javascript"
				type="multi">{`import { ScaleTypes } from '@carbon/charts-svelte'

const options = {
  title: 'Log Axis',
  width: '400px',
  axes: {
    bottom: {
      scaleType: ScaleTypes.TIME, // 'time'
      mapsTo: 'date'
    },
    left: {
      mapsTo: 'value',
      scaleType: ScaleTypes.LOG, // 'log'
      includeZero: false
    }
  },
  height: '400px'
}`}</CodeSnippet>
			<p>
				<LogImage src="/images/axis-logarithmic.png" alt="Example of a logarithmic axis" />
			</p>
			Please see the{' '}
			<Link to="https://carbondesignsystem.com/data-visualization/axes-and-labels/" target="_blank">
				Axes and labels
			</Link>{' '}
			page on the <Link to="https://carbondesignsystem.com">Carbon Design System</Link> site for
			more details.
			<ConfigExamples tag="axes" />
			{/*       
			<h2 id="dual">Starting at zero</h2>
			<p>
				To start at zero, or not to start at zero. This is potentially history@apos;s longest
				debate. As a charting library, we would like to support both directions, with the following
				recommendation.
			</p>
			<h3>When starting at non-zero is bad</h3>
			<p>
				Always start numerical axes at zero for part-to-whole and comparisons charts, such as bar
				and area chart. Truncating the Y axis can distort the perception, making a small difference
				look big and significant.
			</p>
			<p>
				<Grid>
					<Column lg={8}>
						<img
							className="example"
							src="/images//axislabel-zero-good.png"
							alt="Chart where it makes sense to start with zero"
						/>
						<p>
							<Tag type="green">good</Tag>For bar charts, the numerical axis should start at zero.
						</p>
					</Column>
					<Column lg={8}>
						<img
							className="example"
							src="/images/axislabel-zero-bad.png"
							alt="Chart where it does not make sense to start with zero"
						/>
						<p>
							<Tag type="red">bad</Tag> When an axis starts at non-zero, percentage differences
							between bars are exaggerated.
						</p>
					</Column>
				</Grid>
			</p>
			<h3>When starting at non-zero is good</h3>
			<p>
				Line charts and scatter plots are less sensitive to this distortion because they are
				intended to communicate trends and not the relative size of the difference. In these cases,
				cropping the y-axis helps users more easily identify the direction of change.
			</p>
			<p>
				<img
					className="example"
					src="/images/axislabel-zero-good2.png"
					alt="Chart where it makes sense to start with zero"
				/>
			</p>
			<p>
				For line charts showing stock market activities, the existence of peaks and valleys in
				trends is more important than the true size of the change.
			</p>
			<h2 id="labels">Gaps in data</h2>
			<p>
				Never interpolate between periods when data is unavailable. Always label both the start and
				end point during which data is not available.
			</p>
			<p>
				<img className="example" src="/images/axislabel-gap.png" alt="Chart with gap in the data" />
			</p>
			<h2 id="labels">Breaks in axes</h2>
			<p>
				Sometimes, it is useful to skip part of the axis to bring data on the extreme ends into view
				without distortion. When the axis contains a break, use a sinusoidal line to replace the
				straight axis line.
			</p>
			<p>
				On the x-axis, the break can be fluid with graph area size, with a minimum width of 1rem. On
				the y-axis, we recommend using a fixed distance of 1rem for the break.
			</p>
			<p>
				If data is available during an axis break, re-style line segments to use 0.5px stroke and
				hide circles representing data points.
			</p>
			<p>
				<img
					className="example"
					src="/images/axislabel-break-1.png"
					alt="Chart with break in the data"
				/>
			</p>
			<p>If data isn’t available between axis breakpoints, leave the area empty.</p>
			<p>
				<img
					className="example"
					src="/images/axislabel-break-2.png"
					alt="Chart with break in the data"
				/>
			</p>
			<h2 id="labels">Time series</h2>
			<h3>Consistent increments</h3>
			<p>
				Never change axis ticks increments to accommodate data availability. If any form of axis
				compression is required, use the provided axis break styling to visually denote the
				compression.
			</p>
			<h3>Localization</h3>
			<p>
				In time series, x-axis labels reflect the time increment in the data. When possible, use
				localized date and time format, or user preference. Otherwise, the chart defaults to the
				format presented below.
			</p>
			<h3>Landmark labels</h3>
			<p>
				Whenever data crosses into a new time cycle, such as a new day, month, or year, semibold the
				label to make it a “landmark” label to provide additional context for the labels following
				it.
			</p>
			<p>
				<img
					className="example"
					src="/images/axislabel-timeseries.png"
					alt="Example of a time series plotted at 15 seconds intervals"
				/>
			</p>
			<p>Example of a time series plotted at 15 seconds intervals</p> */}
		</>
	)
}
