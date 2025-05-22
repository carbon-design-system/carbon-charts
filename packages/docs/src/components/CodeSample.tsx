import React from 'react'
import sdk from '@stackblitz/sdk'
import type { ChartOptions, ChartTabularData } from '@carbon/charts-react'
import { getProject } from '../lib/stackblitz'
import type { Framework } from '../lib/types'

interface Props {
	framework: Framework
	chartType: string
	data: ChartTabularData
	options: ChartOptions
}

const CodeSample: React.FC<Props> = ({ framework, chartType, data, options }) => {
	const handleOpenInStackBlitz = async () => {
		const project = getProject[framework](chartType, data, options)

		try {
			await sdk.openProject(project)
		} catch (error) {
			console.error('Error opening StackBlitz project:', error)
		}
	}

	return (
		<a
			href="#"
			onClick={e => {
				e.preventDefault()

				handleOpenInStackBlitz()
			}}>
			Open demo in StackBlitz
		</a>
	)
}

export default CodeSample
