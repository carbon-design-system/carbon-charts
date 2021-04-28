<script>
  export let DemoComponent = undefined;
  export let chartType = undefined;
  export let demo = {};
</script>

<div class="container theme--white">
  <h3>
    <b>Component:</b>
    <span class="bx--tag bx--tag--green component-name">
      {`<${chartType} />`}
    </span>
  </h3>

  <p class="props">
    <b>Props:</b>
    data,
    <a
      href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html"
      target="_blank">
      options
    </a>
  </p>

  <div class="marginTop-30">
    <svelte:component
      this={DemoComponent}
      data={demo.data}
      options={demo.options} />
  </div>

  <h3 class="marginTop-30">Code sample</h3>

  <a href={demo.codesandbox.svelte} target="_blank">
    <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit on CodeSandbox" class="marginTop" />
  </a>

  <div
    class="bx--snippet bx--snippet--multi bx--snippet--expand marginTop-30"
    data-code-snippet>
    <div class="bx--snippet-container" aria-label="Code Snippet Text">
      <pre>
        <code>
          <span class="token tag">{`<${chartType}`}</span> <span class="token attr-name">{`{data}`}</span> <span class="token attr-name">{`{options}`}</span> <span class="token tag">{`/>`}</span>
        </code>
      </pre>
    </div>
  </div>
</div>
