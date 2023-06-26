<script lang="ts">
	import type { ComponentType } from 'svelte'
	import sdk from '@stackblitz/sdk'
	import type { Demo } from '@carbon/charts/demo'

	export let DemoComponent: ComponentType
	export let chartType: string
	export let demo: Demo

	const openSandbox = () => {
		sdk.openProject(demo.code.svelte, { newWindow: true })
	}
</script>

<div class="container">
	<h3>
		<b>Component:</b>
		<span class="cds--tag cds--tag--green component-name">
			{`<${chartType} />`}
		</span>
	</h3>

	<p class="props">
		<b>Props:</b>
		<a href="/?path=/docs/docs-tutorials-tabular-data-format">data</a>,
		<a
			href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html"
			target="_blank">
			options
		</a>
	</p>

	<div class="marginTop-30" id="chart-demo">
		<svelte:component this={DemoComponent} data={demo.data} options={demo.options} />
	</div>

	<h3 class="marginTop-30">Code sample</h3>
	<p>Opens in a new tab. Please ensure pop-up blocker is not on.</p>
	<br />

	<a on:click|preventDefault={openSandbox} href={'#'} target="_blank">
		<img
			src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
			class="marginTop"
			alt="Edit on StackBlitz"
		/>
	</a>

	<div class="cds--snippet cds--snippet--multi cds--snippet--expand marginTop-30" data-code-snippet>
		<div class="cds--snippet-container" aria-label="Code Snippet Text">
			<pre>
        <code>
          <span class="token tag">{`<${chartType}`}</span> <span class="token attr-name"
						>{`{data}`}</span> <span class="token attr-name">{`{options}`}</span> <span
						class="token tag">{`/>`}</span>
        </code>
      </pre>
		</div>
	</div>
</div>
