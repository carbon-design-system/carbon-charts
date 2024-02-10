<script lang="ts">
	import sdk from '@stackblitz/sdk'
	import { Button } from 'carbon-components-svelte'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import { getProject } from './stackblitz'

	export let example: Example
	export let chartTypes: ChartTypes

	const openStackBlitz = (framework: Framework, chartType: string) => {
		sdk.openProject(getProject[framework](chartType, example.data, example.options), {
			newWindow: true
		})
	}
</script>

<div class="launch-buttons">
	<Button
		on:click={() => openStackBlitz('vanilla', chartTypes.vanilla)}
		icon={Launch}
		iconDescription="StackBlitz"
		size="field"
		kind="secondary">JavaScript</Button>
	<Button
		on:click={() => openStackBlitz('svelte', chartTypes.svelte)}
		icon={Launch}
		iconDescription="StackBlitz"
		size="field"
		kind="secondary">Svelte</Button>
	<Button
		on:click={() => openStackBlitz('react', chartTypes.react)}
		icon={Launch}
		iconDescription="StackBlitz"
		size="field"
		kind="secondary">React</Button>
	<Button
		on:click={() => openStackBlitz('vue', chartTypes.vue)}
		icon={Launch}
		iconDescription="StackBlitz"
		size="field"
		kind="secondary">Vue.js</Button>
	<Button
		on:click={() => openStackBlitz('angular', chartTypes.angular)}
		icon={Launch}
		iconDescription="StackBlitz"
		size="field"
		kind="secondary">Angular</Button>
</div>

<style lang="scss">
	.launch-buttons {
		margin-top: 0.25rem;
	}
</style>
