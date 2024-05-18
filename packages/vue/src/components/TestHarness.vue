<script setup lang="ts">
import charts from '../../../docs/src/charts'
import * as ChartComponents from './index'
</script>

<template>
	<div>
		<h1>Carbon Charts Vue</h1>
		<h2>Component Test Harness</h2>

		<div v-for="chart in charts" :key="chart.types.vue">
			<h3>{{ chart.types.vue }}</h3>
			<div v-for="example in chart.examples" :key="example.options.title">
				<component
					:is="ChartComponents[chart.types.vue as keyof typeof ChartComponents]"
					:options="example.options"
					:data="example.data"></component>
			</div>
		</div>
	</div>
</template>

<style>
@import '@carbon/charts/styles.css';
</style>
