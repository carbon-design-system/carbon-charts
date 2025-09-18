import React from 'react'
import * as ChartComponents from '@carbon/charts-react'
import StackBlitzLauncher from './StackBlitzLauncher'
import { filterByTag } from '../charts'

interface ConfigExampleProps {
	tag: string
}

export default function ConfigExample({ tag }: ConfigExampleProps) {
	const examples = filterByTag(tag)

	return (
		<>
			{examples.map((chart, chartIndex) => {
				const ChartComponent = ChartComponents[
					chart.types.react as keyof typeof ChartComponents
				] as React.ComponentType<any>
				return (
					<div key={chartIndex}>
						{chart.examples.map((example, exampleIndex) => (
							<div key={exampleIndex} className="chart">
								<ChartComponent data={example.data} options={example.options} />
								<StackBlitzLauncher example={example} chartTypes={chart.types} />
							</div>
						))}
					</div>
				)
			})}
		</>
	)
}
