<script lang="ts">
	import { TreeChart } from '../types'
	import type { TreeChart as TreeChartCore } from '@carbon/charts'

	let chart: TreeChartCore | null = null
	let ref: HTMLDivElement | null = null

	// copied from packages/charts/demo/data/tree.ts
	const data = {
		name: 'analytics',
		children: [
			{
				name: 'cluster',
				children: [
					{ name: 'AgglomerativeCluster', value: 3938 },
					{ name: 'CommunityStructure', value: 3812 },
					{ name: 'HierarchicalCluster', value: 6714 },
					{ name: 'MergeEdge', value: 743 }
				]
			},
			{
				name: 'graph',
				children: [
					{ name: 'BetweennessCentrality', value: 3534 },
					{ name: 'LinkDistance', value: 5731 },
					{ name: 'MaxFlowMinCut', value: 7840 },
					{ name: 'ShortestPaths', value: 5914 },
					{ name: 'SpanningTree', value: 3416 }
				]
			},
			{
				name: 'optimization',
				children: [{ name: 'AspectRatioBanker', value: 7074 }]
			}
		]
	}
	const options = {
		title: 'Tree',
		height: '2000px',
		tree: {
			rootTitle: 'flare'
		}
	}
</script>

<TreeChart
	bind:chart
	bind:ref
	on:load={(e) => {
		console.log(e.detail)
	}}
	on:update={(e) => {
		console.log(e.detail)
	}}
	on:destroy={(e) => {
		console.log(e.detail)
	}}
	{data}
	{options} />

<svelte:component
	this={TreeChart}
	on:load={(e) => {
		console.log(e.detail)
	}}
	on:update={(e) => {
		console.log(e.detail)
	}}
	on:destroy={(e) => {
		console.log(e.detail)
	}}
	{data}
	{options} />
