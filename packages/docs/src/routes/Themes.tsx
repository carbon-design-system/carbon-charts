import { useEffect } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import scss from 'highlight.js/lib/languages/scss'
import { CodeSnippet } from '@carbon/react/es'
import PageHeader from '../components/PageHeader'

export default function Themes() {
	const highlightCode = () => {
		hljs.registerLanguage('javascript', javascript)
		hljs.registerLanguage('scss', scss)

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
			<PageHeader title="Themes" />

			<h2>Overview</h2>

			<p>
				Four Carbon themes (white, g10, g90 and g100) are included in the styles.css file for each
				package. The latter three represent shades of gray where g10 is 10% and g100 is 100%
				(black).
			</p>

			<p>
				All chart types support the{' '}
				<a href="/api/interfaces/BaseChartOptions.html#theme" target="_blank">
					theme
				</a>{' '}
				property.
			</p>

			<CodeSnippet
				className="language-javascript"
				type="multi">{`import myChartOptions from 'chart-options.js'

      const options = {
        ...myChartOptions,
        theme: 'g100' // <- how to set the theme
      }`}</CodeSnippet>

			<h2>Using alternative background colors</h2>

			<p>
				To use alternate background colors, set your options to a theme that is close in brightness
				to your background color such as g90 then override global CSS classes as shown below.
			</p>

			<CodeSnippet className="language-scss" type="multi">{`// SCSS example

// Sets the chart holder's background to transparent
.cds--chart-holder[data-carbon-theme=g90] {
  .chart-grid-backdrop {
    fill: none; // will cause background the chart is sitting on to show through
  }
}

$my-tooltip-background-color: blue;

.bx--cc--tooltip {
  background-color: $my-tooltip-background-color;
}`}</CodeSnippet>
		</>
	)
}
