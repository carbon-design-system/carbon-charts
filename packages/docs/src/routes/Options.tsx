import { useEffect } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { CodeSnippet } from '@carbon/react/es'
import PageHeader from '../components/PageHeader'

export default function Options() {
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
			<PageHeader title="Chart options" />

			<p>
				<a href="/api/variables/configurations.options.html" target="_blank">
					API guide for chart options
				</a>
				.
			</p>
			<p>
				Options for all chart types extend from{' '}
				<a href="/api/interfaces/BaseChartOptions.html" target="_blank">
					BaseChartOptions
				</a>
				,&nbsp;
				<a href="/api/interfaces/ScatterChartOptions.html" target="_blank">
					ScatterChartOptions
				</a>{' '}
				or&nbsp;
				<a href="/api/interfaces/AxisChartOptions.html" target="_blank">
					AxisChartOptions
				</a>
				. To see examples for each type of chart, navigate to <strong>Chart types</strong> on left.
			</p>

			<h3>Reactivity</h3>

			<p>
				For Svelte, React, Vue and Angular, most options are reactive (with certain exceptions like
				positioning of the Legend and data grouping). For vanilla JavaScript, updates to options
				must be made via{' '}
				<a href="/api/classes/ChartModel.html#setOptions" target="_blank">
					ChartModel.setOptions()
				</a>
				.
			</p>

			<CodeSnippet className="language-javascript" type="multi">{`const myChart = new PieChart({
  data: ...,
  options: ...
})

myChart.model.setOptions(...)`}</CodeSnippet>
		</>
	)
}
