<script lang="ts">
	import { base } from '$app/paths'
	import PageTitle from '$lib/PageTitle.svelte'
	import ChartTypeButton from '$lib/ChartTypeButton.svelte'
</script>

<PageTitle title="Introduction" />

<p>
	Carbon Charts is a component library of 25 charts for vanilla JavaScript, Svelte, React, Vue and
	Angular. Detailed documentation and StackBlitz examples are provided to get you up and running
	quickly. Its components are highly customizable with advanced functionality such as <a
		href="{base}/themes">themes</a
	>, <a href="{base}/axes#dual">dual axes</a>, <a href="{base}/color">color palettes</a>,
	<a href="{base}/combo">combo charts</a>, and event handling.
</p>

<p>
	To get started, go to the <a href="{base}/installation">Installation &amp; setup</a> page and select
	your preferred framework. Alternatively, jump ahead to the StackBlitz examples provided for each of
	the chart types by clicking the icons below.
</p>

<h2>Comparisons</h2>
<div class="button-container">
	<ChartTypeButton href="{base}/bar#vertical" title="Bar (vertical)" svg="bar" />
	<ChartTypeButton href="{base}/bar#grouped" title="Bar (grouped)" svg="bargrouped" />
	<ChartTypeButton
		href="{base}/bar#horizontal"
		title="Bar (horizontal floating)"
		svg="barfloating" />
	<ChartTypeButton href="{base}/lollipop" title="Lollipop" svg="lollipop" />
	<ChartTypeButton href="{base}/bubble" title="Bubble" svg="bubble" />
	<ChartTypeButton href="{base}/radar" title="Radar / kiviat" svg="radar" />
	<ChartTypeButton href="{base}/wordcloud" title="Word cloud" svg="wordcloud" />
</div>

<h2>Trends</h2>
<div class="button-container">
	<ChartTypeButton href="{base}/area" title="Area" svg="area" />
	<ChartTypeButton href="{base}/boxplot" title="Boxplot" svg="boxplot" />
	<ChartTypeButton href="{base}/histogram" title="Histogram" svg="histogram" />
	<ChartTypeButton href="{base}/line" title="line" svg="line" />
</div>

<h2>Part-to-whole</h2>
<div class="button-container">
	<ChartTypeButton href="{base}/area#stacked" title="Area (stacked)" svg="areastack" />
	<ChartTypeButton href="{base}/bar#stacked" title="Bar (stacked)" svg="barstack" />
	<ChartTypeButton href="{base}/bullet" title="Bullet" svg="bullet" />
	<ChartTypeButton href="{base}/circlepack" title="Circle pack" svg="circlepack" />
	<ChartTypeButton href="{base}/donut" title="Donut" svg="donut" />
	<ChartTypeButton href="{base}/gauge" title="Gauge" svg="gauge" />
	<ChartTypeButton href="{base}/meter" title="Meter" svg="meter" />
	<ChartTypeButton href="{base}/pie" title="Pie" svg="pie" />
	<ChartTypeButton href="{base}/treemap" title="Treemap" svg="treemap" />
</div>

<h2>Correlations</h2>
<div class="button-container">
	<ChartTypeButton href="{base}/heatmap" title="Heatmap" svg="heatmap" />
	<ChartTypeButton href="{base}/scatter" title="Scatter" svg="scatter" />
</div>

<h2>Connections</h2>
<div class="button-container">
	<ChartTypeButton href="{base}/alluvial" title="Alluvial" svg="alluvial" />
	<ChartTypeButton href="{base}/diagram" title="Network diagram" svg="diagram" />
	<ChartTypeButton href="{base}/tree" title="Tree" svg="tree" />
</div>

<h2>Geospatial</h2>
<div class="button-container">
	<ChartTypeButton href="{base}/choropleth" title="Choropleth" svg="choropleth" />
</div>

<style lang="scss">
	// Eliminate whitespace between chart buttons
	.button-container {
		display: flex;
		flex-wrap: wrap;
	}
</style>
