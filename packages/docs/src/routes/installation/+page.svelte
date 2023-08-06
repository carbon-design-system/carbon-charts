<script lang="ts">
	import { Grid, Row, Column, Tabs, Tab, TabContent, CodeSnippet, InlineNotification } from 'carbon-components-svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	let selected = 0

	const packageExtension = ['', '-svelte', '-react', '-vue', '-angular']

	$: packageSuffix = packageExtension[selected]
</script>

<PageTitle title="Installation &amp; setup" />

<Grid>
	<Row>
		<Column>

			<h2>Select your development framework</h2>

			<Tabs bind:selected>
				<Tab label="Vanilla JavaScript" />
				<Tab label="Svelte" />
				<Tab label="React" />
				<Tab label="Vue" />
				<Tab label="Angular" />
			</Tabs>

			<h3>Installing into your project</h3>

			<Tabs>
				<Tab label="yarn" />
				<Tab label="npm" />
				<Tab label="Load in web page" />
				<svelte:fragment slot="content">
					<TabContent
						><CodeSnippet
							code={`yarn add @carbon/charts${packageSuffix} d3 d3-cloud d3-sankey @carbon/styles`} /></TabContent>
					<TabContent
						><CodeSnippet
							code={`npm install -S @carbon/charts${packageSuffix} d3 d3-cloud d3-sankey @carbon/styles`} /></TabContent>
					<TabContent
						><CodeSnippet
							type="multi"
							code={`<script src="https://unpkg.com/@carbon/charts@latest/dist/index.js" defer></script>
<link href="https://unpkg.com/@carbon/charts@latest/dist/styles.css" rel="stylesheet" crossorigin="anonymous" />
<link href="https://unpkg.com/@carbon/styles@latest/css/styles.css" rel="stylesheet" crossorigin="anonymous" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js" defer integrity="sha512-M7nHCiNUOwFt6Us3r8alutZLm9qMt4s9951uo8jqO4UwJ1hziseL6O3ndFyigx6+LREfZqnhHxYjKRJ8ZQ69DQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-cloud/1.2.5/d3.layout.cloud.min.js" defer integrity="sha512-HjKxWye8lJGPu5q1u/ZYkHlJrJdm6KGr89E6tOrXeKm1mItb1xusPU8QPcKVhP8F9LjpZT7vsu1Fa+dQywP4eg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-sankey/0.12.3/d3-sankey.min.js" defer integrity="sha512-KK15oKpabNDaLpWinMtNfTqy/V7pzlc2FRG174PfASes7RRx6TAsua8HJdRTKo8+BLvPBKNIkL7kXWcz5HoqqA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap" rel="stylesheet" crossorigin="anonymous" />`} /></TabContent>
				</svelte:fragment>
			</Tabs>

			<InlineNotification
				title="Note:"
				subtitle={`The last three packages are optional except for these situations: d3-cloud (for Alluvial Charts), d3-word (for Word Cloud Charts), @carbon/styles (for charts that display a toolbar).`}
				lowContrast
				kind="info-square"
				hideCloseButton />

			{#if selected == 1}
				<h3>SvelteKit Vite Configuration</h3>

				<p>
					Carbon Charts expects to run in a browser environment. This will cause an error when using server-side rendering (SSR).
					To avoid this, configure Vite to prevent @carbon/charts from being externalized for SSR.
				</p>
				<CodeSnippet
							type="multi"
							code={
`// vite.config.mjs
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
    ssr: {
      noExternal: ${`process`}.env.NODE_ENV === 'production' ? ['@carbon/charts'] : []
  }
})`
							} />
			{/if}

			<h3>Styles</h3>

			<p>
				When using a bundler like <a href="https://vitejs.dev/" target="_blank">Vite</a>, import
				styles with your TypeScript/JavaScript code to optimize hot module reloading:
				<CodeSnippet code={`import '@carbon/charts${packageSuffix}/styles.css'`} />
			</p>

			<p>
				If you are using toolbars with your charts, <strong>@carbon/styles</strong> is required.
				<CodeSnippet code="import '@carbon/styles/css/styles.css'" />
			</p>

			<InlineNotification
				title="Caution:"
				subtitle={`Loading @carbon/styles CSS applies styles to the body element that may interfere with other styling like Bootstrap or Material Design. For these situations, use SCSS instead.`}
				lowContrast
				kind="warning"
				hideCloseButton />

			<p>
				<CodeSnippet
					type="multi"
					code={`// Your SCSS file
@use '@carbon/styles' with (
  $css--body: false // Do not emit styles for body element
);`} />
			</p>

			<p>
				More information on using <strong>@carbon/styles</strong> with SCSS can be found
				<a
					href="https://github.com/carbon-design-system/carbon/blob/HEAD/packages/styles/docs/sass.md#files"
					target="_blank">here</a
				>.
			</p>

			<h3>Fonts</h3>

			<p>
				By default, Carbon Charts uses <a
					href="https://fonts.google.com/specimen/IBM+Plex+Sans"
					target="_blank">IBM Plex Sans</a>
				and
				<a href="https://fonts.google.com/specimen/IBM+Plex+Sans+Condensed" target="_blank"
					>IBM Plex Sans Condensed</a>
				which can be loaded in your HTML template:
				<CodeSnippet
					code={`<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap" rel="stylesheet" crossorigin="anonymous" />`} />
			</p>

			<p>
				To use different fonts, override two custom CSS properties for the CSS class that is
				automatically associated with the chart container like this...
				<CodeSnippet
					type="multi"
					code={`.cds--cc--chart-wrapper {
  --cds-charts-font-family: Roboto;
  --cds-charts-font-family-condensed: 'Roboto Condensed';
}`} />
			</p>
		</Column>
		<Column>&nbsp;</Column>
	</Row>
</Grid>

<style lang="scss">
	// h3 {
	// 	margin-top: 2rem;
	// }
</style>
