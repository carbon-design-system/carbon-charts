<script lang="ts">
	import { WordCloudChart } from '../types';
	import type { WordCloudChart as WC } from '@carbon/charts';
	import {
		wordCloudData as data,
		wordCloudOptions,
	} from '@carbon/charts/demo/data';

	let chart: WC = null;
	let ref = null;

	const options = wordCloudOptions as any;
</script>

<WordCloudChart
	bind:chart
	bind:ref
	on:load={(e) => {
		console.log(e.detail);
	}}
	on:update={(e) => {
		console.log(e.detail);
	}}
	on:destroy={(e) => {
		console.log(e.detail);
	}}
	{data}
	{options}
/>

<svelte:component
	this={WordCloudChart}
	on:load={(e) => {
		console.log(e.detail);
	}}
	on:update={(e) => {
		console.log(e.detail);
	}}
	on:destroy={(e) => {
		console.log(e.detail);
	}}
	{data}
	{options}
/>
