import { useEffect } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { CodeSnippet } from '@carbon/react/es'
import PageHeader from '../components/PageHeader'

export default function Data() {
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
			<PageHeader title="Chart data" />

			<p>
				Carbon Charts uses a tabular data format. Each framework package exports a TypeScript type
				called{' '}
				<a href="/api/types/interfaces.ChartTabularData.html" target="_blank">
					ChartTabularData
				</a>
				. This format accomodates all types of charts. Each element in the array is a datapoint.
			</p>

			<CodeSnippet className="language-javascript" type="multi">{`const simpleBarData = [
  { key: 'Qty', value: 65000 },
  { key: 'More', value: 29123 },
  { key: 'Sold', value: 35213 },
  { key: 'Restocking', value: 51213 },
  { key: 'Misc', value: 16932 }
]`}</CodeSnippet>

			<h3>Dates</h3>

			<p>
				For ChartTabularData, dates may be provided in various formats: ISO-8601 date/time stamps,
				JavaScript Date objects and integers representing an epoch. These formats may be mixed in
				the data for a single chart.
			</p>

			<h3>Rectangular charts</h3>

			<p>
				In the example above, the <strong>key</strong> property is the <em>domainIdentifier</em>{' '}
				used for axis labels. The <strong>value</strong> property is known as the{' '}
				<em>rangeIdentifier</em>. The domainIdentifier name defaults to the name{' '}
				<strong>key</strong> for string values and <strong>date</strong> for dates. The default name
				for the rangeIdentifier is <strong>value</strong>. While these default names may be used,
				the best practice is to explicitly set a <strong>mapsTo</strong> property in the chart
				options for each axis as shown below.
			</p>

			<CodeSnippet type="multi">{`const simpleBarOptions = {
  title: "Simple bar (discrete)",
  axes: {
    left: {
      mapsTo: "value"
    },
    bottom: {
      mapsTo: "key",
      scaleType: "labels"
    }
  }
}`}</CodeSnippet>

			<h3>Circular charts</h3>

			<p>Circular charts expect the rangeIdentifer to be "value".</p>

			<h3>Grouping</h3>

			<p>
				Grouping of data can be done via the chart options property data.groupMapsTo as shown below.
			</p>

			<CodeSnippet className="language-javascript" type="multi">{`const radarData = [
  { product: 'Product 1', feature: 'Price', score: 60 },
  { product: 'Product 1', feature: 'Usability', score: 92 },
  { product: 'Product 1', feature: 'Availability', score: 5 },
  { product: 'Product 1', feature: 'Performance', score: 85 },
  { product: 'Product 1', feature: 'Quality', score: 60 },
  { product: 'Product 2', feature: 'Price', score: 70 },
  { product: 'Product 2', feature: 'Usability', score: 63 },
  { product: 'Product 2', feature: 'Availability', score: 78 },
  { product: 'Product 2', feature: 'Performance', score: 50 },
  { product: 'Product 2', feature: 'Quality', score: 30 }
]

const radarOptions = {
  title: 'Radar',
  radar: {
    axes: {
      angle: 'feature',
      value: 'score'
    }
  },
  data: {
    groupMapsTo: 'product'
  }
}`}</CodeSnippet>

			<h3>Chart-specific datapoint properties</h3>

			<p>
				Some types of charts support additional options related to the tabular data format. Bubble
				charts can use four properties per datapoint. The property bubble.radiusMapsTo configures
				the radius of the bubbles (default property name is "radius").
			</p>

			<CodeSnippet
				className="language-javascript"
				type="multi">{`export const bubbleDoubleLinearOptions = {
        title: "Bubble (linear)",
        axes: {
          bottom: {
            title: "No. of employees",
            mapsTo: "sales",
            includeZero: false
          },
          left: {
            title: "Annual sales",
            mapsTo: "profit",
            includeZero: false
          }
        },
        bubble: {
          radiusMapsTo: "surplus"
        }
      }

      const bubbleDoubleLinearData = [
        { group: "Dataset 1", sales: 10000, profit: 32100, surplus: 50000 },
        { group: "Dataset 1", sales: 12000, profit: 23500, surplus: 34000 },
        { group: "Dataset 1", sales: 14000, profit: 53100, surplus: 63000 },
        { group: "Dataset 1", sales: 15000, profit: 42300, surplus: 43000 },
        { group: "Dataset 1", sales: 16000, profit: 12300, surplus: 55000 },
        { group: "Dataset 2", sales: 11000, profit: 12400, surplus: 25000 },
        { group: "Dataset 2", sales: 13000, profit: 34500, surplus: 35000 },
        { group: "Dataset 2", sales: 13500, profit: 23100, surplus: 55000 },
        { group: "Dataset 2", sales: 15500, profit: 63200, surplus: 35000 },
        { group: "Dataset 2", sales: 15750, profit: 24300, surplus: 64000 }
      ]`}</CodeSnippet>

			<h3>Reactivity</h3>

			<p>
				For Svelte, React, Vue and Angular, data is reactive. For vanilla JavaScript, updates to
				data must be made via{' '}
				<a
					href="https://charts.carbondesignsystem.com/api/classes/ChartModel.html#setData"
					target="_blank">
					ChartModel.setData()
				</a>
				.
			</p>

			<CodeSnippet type="multi">{`const myChart = new PieChart({
  data: ...,
  options: ...
})

myChart.model.setData(...)`}</CodeSnippet>
		</>
	)
}
