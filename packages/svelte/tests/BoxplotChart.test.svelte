<script lang="ts">
	import { BoxplotChart } from '../types';
	import type { BoxplotChart as BC } from '@carbon/charts';
	import {
		simpleBoxplotData as data,
		simpleBoxplotOptions,
	} from '@carbon/charts/demo/data';

	let chart: BC = null;
	let ref = null;

	const options = simpleBoxplotOptions as any;
</script>

<BoxplotChart
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
	this={BoxplotChart}
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
