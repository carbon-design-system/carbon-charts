import React from 'react'
import ReactDOM from 'react-dom/client'
import charts from '../../docs/src/charts'
import * as ChartComponents from './charts'
import '@carbon/charts/styles.min.css'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container as HTMLElement)

const Test = () => (
	<>
		<h1>Carbon Charts React</h1>
		<h2>Component Test Harness</h2>
		{charts.map((chart, chartIndex) => (
			<div key={chartIndex}>
				<h3>{chart.types.react}</h3>
				{chart.examples.map((example, exampleIndex) => {
					const ChartComponent = ChartComponents[
						chart.types.react as keyof typeof ChartComponents
					] as React.ComponentType<any>
					return (
						<div key={exampleIndex}>
							<ChartComponent options={example.options} data={example.data} />
						</div>
					)
				})}
			</div>
		))}
	</>
)

root.render(
	<React.StrictMode>
		<Test />
	</React.StrictMode>
)
