<script>
	export let DemoComponent = undefined;
	export let chartType = undefined;
	export let demo = {};
</script>

<div class="container theme--white">
	<div class="v10-banner">
		This version is in beta & relies on <b>Carbon v11</b>. If you're using Carbon v10,
		<a
			href="https://carbon-charts-0x.netlify.app"
			target="_blank"
			rel="noreferrer">see the legacy demo site</a
		>
	</div>

	<h3>
		<b>Component:</b>
		<span class="cds--tag cds--tag--green component-name">
			{`<${chartType} />`}
		</span>
	</h3>

	<p class="props">
		<b>Props:</b>
		data,
		<a
			href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html"
			target="_blank"
		>
			options
		</a>
	</p>

	<div class="marginTop-30" id="chart-demo">
		<svelte:component
			this={DemoComponent}
			data={demo.data}
			options={demo.options}
		/>
	</div>

	<h3 class="marginTop-30">Code sample</h3>

	<a href={demo.codesandbox.svelte} target="_blank">
		<img
			src="https://codesandbox.io/static/img/play-codesandbox.svg"
			alt="Edit on CodeSandbox"
			class="marginTop"
		/>
	</a>

	<div
		class="cds--snippet cds--snippet--multi cds--snippet--expand marginTop-30"
		data-code-snippet
	>
		<div class="cds--snippet-container" aria-label="Code Snippet Text">
			<pre>
        <code>
          <span class="token tag">{`<${chartType}`}</span> <span
						class="token attr-name">{`{data}`}</span
					> <span class="token attr-name">{`{options}`}</span> <span
						class="token tag">{`/>`}</span
					>
        </code>
      </pre>
		</div>
	</div>
</div>
