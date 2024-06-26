import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { CodeSnippet } from '@carbon/react/es'
import PageHeader from '../components/PageHeader'

export default function Palettes() {
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
			<PageHeader title="Color palettes" />

			<h2>Overview</h2>

			<p>
				The color palette for data visualizations is a select subset of the IBM Design Language
				color palette. It is designed to maximize accessibility and harmony within a page. For
				additional details, see the{' '}
				<a href="https://carbondesignsystem.com/data-visualization/color-palettes/" target="_blank">
					Color Palettes
				</a>
				&nbsp; section of the{' '}
				<a href="https://carbondesignsystem.com" target="_blank">
					Carbon Design System
				</a>
				.
			</p>

			<h2>Using color palettes with Carbon Charts</h2>

			<p>
				Color palettes for charts are set using the <strong>color</strong> property in&nbsp;
				<Link to="/options">options</Link>. By default, Carbon Charts assigns colors based on the
				number of data groups (eg. charts with four data groups will get the first of the 4-color
				palettes).
			</p>

			<CodeSnippet className="language-javascript" type="multi">{`const verySimpleBarData = [
  { group: "Qty", value: 65000 },
  { group: "More", value: 29123 }
] // bar chart with 2 data groups "Qty" and "More"

const verySimpleBarOptions = {
  color: {
    pairing: {
      option: 2 // use the second color palette for 2-color charts
    }
  }
}`}</CodeSnippet>

			<h2>Using a different size color palette</h2>

			<p>
				Avoid using a color palette designed for a different number of data groups than the chart is
				rendering unless you have a variable number of data groups.
			</p>

			<CodeSnippet
				className="language-javascript"
				type="multi">{`// Line chart with 2 data groups "Saturday" and "Sunday" initially but expecting
// 3 data groups on some data loads when long weekend "Friday" or "Monday" is included
const lineData = [
  { group: "Saturday", sales: 65000 },
  { group: "Sunday", sales: 29123 }
]

const lineOptions = {
  color: {
    pairing: {
      numberOfVariants: 3, // use a palette with 3 color variants
      option: 2 // use the 2nd option of 3 color charts
    }
  }
}`}</CodeSnippet>

			<h2>Using a custom color scale</h2>

			<p>
				A custom color range can be provided to be used within the color scale. To do this, define
				values for all data groups in your chart. If fewer data groups are provided than the chart
				contains, the chart will default to using the IBM Design Language data visualization color
				palette.
			</p>

			<CodeSnippet className="language-javascript" type="multi">{`const simpleBarOptions = {
  color: {
    scale: {
      "Dataset 1": "blue",
      "Dataset 2": "red"
    } // chart only has 2 data groups
  }
}`}</CodeSnippet>
		</>
	)
}
