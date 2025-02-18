import React from 'react'
import ReactDOM from 'react-dom/client'
import charts from '../../docs/src/charts'
import * as ChartComponents from './charts'
import '@carbon/charts/scss'
import './main.scss'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container as HTMLElement)

const Test = (): React.ReactElement =>
	React.createElement(
		'div',
		{ className: 'container' },
		React.createElement('h1', null, 'Carbon Charts React'),
		React.createElement('h2', null, 'Component Test Harness'),
		charts.map((chart, chartIndex) =>
			React.createElement(
				'div',
				{ key: chartIndex },
				React.createElement('h3', null, chart.types.react),
				chart.examples.map((example, exampleIndex) => {
					if (!example.tags?.includes('test')) return null
					const ChartComponent = ChartComponents[
						chart.types.react as keyof typeof ChartComponents
					] as React.ComponentType<any>
					return React.createElement(
						'div',
						{ key: exampleIndex, className: 'example' },
						React.createElement(ChartComponent, {
							options: example.options,
							data: example.data
						})
					)
				})
			)
		)
	)

root.render(React.createElement(React.StrictMode, null, React.createElement(Test, null)))
