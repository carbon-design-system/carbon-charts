<script lang="ts">
	import { base } from '$app/paths'
	import { Button } from 'carbon-components-svelte'
	export let title = ''
	export let svg = ''
	export let alt = ''
	export let href = ''
</script>

<span class="thin-margin">
	<Button kind="ghost" {href}>
		<div class="container">
			<span class="title">{title}</span>
			<img class="icon" src="{base}/images/{svg}.svg" {alt} />
		</div>
	</Button>
</span>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.title {
		font-size: 0.75rem;
		color: black;
	}

	.icon {
		height: 15rem;
		width: 15rem;
	}

	.thin-margin {
		margin-right: 1px;
		margin-bottom: 1px;
	}
</style>
