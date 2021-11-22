<script lang="ts">
	import { AlluvialChart } from '../types';
	import type { AlluvialChart as AC } from '@carbon/charts';
	import {
		alluvialSimpleData as data,
		alluvialSimpleOptions,
	} from '@carbon/charts/demo/data';

	let chart: AC = null;
	let ref = null;

	const options = alluvialSimpleOptions as any;
</script>

<AlluvialChart
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
	this={AlluvialChart}
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
