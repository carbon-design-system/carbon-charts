import sdk from '@stackblitz/sdk'
import { Button } from '@carbon/react/es'
import LaunchIcon from '@carbon/icons-react/es/Launch'
import { getProject } from '../lib/stackblitz'
import type { ChartTypes, Example, Framework } from '../lib/types'
import styled from 'styled-components'

const LaunchButtons = styled.div`
	background-color: black;
	button {
		background-color: black;
	}
	margin-left: 2px;
	margin-right: 2px;
`

export default function StackBlitzLauncher({
	example,
	chartTypes
}: {
	example: Example
	chartTypes: ChartTypes
}) {
	const openStackBlitz = (framework: Framework, chartType: string) => {
		sdk.openProject(getProject[framework](chartType, example.data, example.options), {
			newWindow: true
		})
	}

	return (
		<LaunchButtons>
			<Button
				onClick={() => openStackBlitz('vanilla', chartTypes.vanilla)}
				renderIcon={LaunchIcon}
				iconDescription="StackBlitz"
				size="lg"
				kind="secondary">
				JavaScript
			</Button>
			<Button
				onClick={() => openStackBlitz('svelte', chartTypes.svelte)}
				renderIcon={LaunchIcon}
				iconDescription="StackBlitz"
				size="lg"
				kind="secondary">
				Svelte
			</Button>
			<Button
				onClick={() => openStackBlitz('react', chartTypes.react)}
				renderIcon={LaunchIcon}
				iconDescription="StackBlitz"
				size="lg"
				kind="secondary">
				React
			</Button>
			<Button
				onClick={() => openStackBlitz('vue', chartTypes.vue)}
				renderIcon={LaunchIcon}
				iconDescription="StackBlitz"
				size="lg"
				kind="secondary">
				Vue.js
			</Button>
			<Button
				onClick={() => openStackBlitz('angular', chartTypes.angular)}
				renderIcon={LaunchIcon}
				iconDescription="StackBlitz"
				size="lg"
				kind="secondary">
				Angular
			</Button>
		</LaunchButtons>
	)
}
