import React, { useEffect, useRef } from 'react'
import sdk from '@stackblitz/sdk'
import type { EmbedOptions } from '@stackblitz/sdk'
import type { ChartOptions, ChartTabularData } from '@carbon/charts-react'
import { getProject } from '../lib/stackblitz'

interface Props {
	framework: Framework
	chartType: string
	data: ChartTabularData
	options: ChartOptions
}

const CodeSample: React.FC<Props> = ({ framework, chartType, data, options }) => {
	const ref = useRef<HTMLDivElement>(null)
	const embedOptions: EmbedOptions = { height: 600, view: 'default', showSidebar: true }
	useEffect(() => {
		const embedProject = async () => {
			if (ref.current) {
				const project = getProject[framework](chartType, data, options)
				try {
					const vm = await sdk.embedProject(ref.current, project, embedOptions)
					console.log('StackBlitz project successfully created:', vm)
				} catch (error) {
					console.error('Error embedding StackBlitz project:', error)
				}
			}
		}

		embedProject()
	}, [framework, chartType, data, options])

	return <div ref={ref}></div>
}

export default CodeSample
