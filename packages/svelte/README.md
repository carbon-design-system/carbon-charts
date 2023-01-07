# Notice

### This version relies on **Carbon v11**. If you're using Carbon v10, [see the legacy demo site](https://carbon-charts-0x.netlify.app)

## `@carbon/charts-svelte`

> Carbon Charting Svelte Wrappers

**[Storybook demos](https://carbon-design-system.github.io/carbon-charts/svelte)**

**[Storybook demo sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

## Maintenance & support

These Svelte wrappers have been developed by Eric Liu.

Please direct all questions regarding support, bug fixes, and feature requests
to [@metonym](https://github.com/metonym).

## Getting started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -D @carbon/charts-svelte d3
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add -D @carbon/charts-svelte d3
```

**Note:** you'd also need to install `carbon-components` if you're not using a
bundled version of the library.

## Set-up

This is an overview of using Carbon Charts with common Svelte set-ups.

-   [SvelteKit](#sveltekit)
-   [Vite](#vite)
-   [Rollup](#rollup)
-   [Webpack](#webpack)

### SvelteKit

[SvelteKit](https://github.com/sveltejs/kit) is the official framework for
building apps that support client-side rendering (CSR) and server-side rendering
(SSR). SvelteKit is powered by [Vite](https://github.com/vitest-dev/vitest).

In your `vite.config.js`, add `@carbon/charts` and `carbon-components` to
`ssr.noExternal` to avoid externalizing the dependencies for SSR.

```js
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
export default {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@carbon/charts', 'carbon-components'],
	},
};
```

### Vite

You can also use Vite without SvelteKit. Instruct `vite` to optimize
`@carbon/charts` in `vite.config.js`.

```js
// vite.config.js
import { svelte } from '@sveltejs/vite-plugin-svelte';

/** @type {import('vite').UserConfig} */
export default {
	plugins: [svelte()],
	optimizeDeps: { include: ['@carbon/charts'] },
};
```

### Rollup

#### ReferenceError: process is not defined

Install and add
[@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace)
to the list of plugins in `rollup.config.js` to avoid the
`process is not defined` runtime error.

This plugin statically replaces strings in bundled files with the specified
value.

In the example below, all instances of `process.env.NODE_ENV` will be replaced
with `"production"` while bundling.

```js
// rollup.config.js
import replace from '@rollup/plugin-replace';

export default {
	// ...
	plugins: [
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
};
```

#### `this` has been rewritten to `undefined`

Set [`context: "window"`](https://rollupjs.org/guide/en/#context) to address the
`this has been rewritten to undefined` Rollup error.

```diff
export default {
+  context: "window",
};
```

#### Circular dependency warnings

You may see circular dependency warnings for `d3` and `@carbon/charts` packages
that can be safely ignored.

Use the `onwarn` option to selectively ignore these warnings.

```js
// rollup.config.js
export default {
	onwarn: (warning, warn) => {
		// omit circular dependency warnings emitted from
		// "d3-*" packages and "@carbon/charts"
		if (
			warning.code === 'CIRCULAR_DEPENDENCY' &&
			/^node_modules\/(d3-|@carbon\/charts)/.test(warning.importer)
		) {
			return;
		}

		// preserve all other warnings
		warn(warning);
	},
};
```

#### Dynamic imports

If using [dynamic imports](https://rollupjs.org/guide/en/#dynamic-import), set
`inlineDynamicImports: true` in `rollup.config.js` to enable code-splitting.

Otherwise, you may encounter the Rollup error
`Invalid value "iife" for option "output.format" - UMD and IIFE output formats are not supported for code-splitting builds.`

```diff
export default {
+  inlineDynamicImports: true,
};
```

### Webpack

[Webpack](https://github.com/webpack/webpack) is another popular application
bundler used to build Svelte apps.

No additional configuration should be necessary.

## Usage

Styles must be imported from both `@carbon/charts` and `@carbon/styles`.

```js
import '@carbon/styles/css/styles.css';
import '@carbon/charts/styles.css';
```

### Basic

```svelte
<script>
  import "@carbon/styles/css/styles.css";
  import "@carbon/charts/styles.css";
  import { BarChartSimple } from "@carbon/charts-svelte";
</script>

<BarChartSimple
  data={[
    { group: "Qty", value: 65000 },
    { group: "More", value: 29123 },
    { group: "Sold", value: 35213 },
    { group: "Restocking", value: 51213 },
    { group: "Misc", value: 16932 },
  ]}
  options={{
    title: "Simple bar (discrete)",
    height: "400px",
    axes: {
      left: { mapsTo: "value" },
      bottom: { mapsTo: "group", scaleType: "labels" },
    },
  }}
/>

```

### Theming

`@carbon/styles` uses
[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
for dynamic, client-side theming. Update the Carbon theme using the `theme`
prop.

Supported themes include:

-   `"white"`
-   `"g10"` (Gray 10)
-   `"g90"` (Gray 90)
-   `"g100"` (Gray 100)

The default theme is `"white"`.

```svelte
<BarChartSimple
  theme="g90"
  data={/* ... */}
  options={/* ... */}
/>
```

### Dispatched events

Each Svelte chart component dispatches the following events:

-   **on:load**: fired when the chart is instantiated
-   **on:update**: fired when `data` or `options` are updated
-   **on:destroy**: fired when the component is unmounted and the chart is
    destroyed

```svelte
<BarChartSimple
  {data}
  {options}
  on:load
  on:update
  on:destroy
/>

```

### Dynamic import

Dynamically import a chart and instantiate it using the
[svelte:component API](https://svelte.dev/docs#svelte_component).

```svelte
<script>
  import "@carbon/styles/css/styles.css";
  import "@carbon/charts/styles.css";
  import { onMount } from "svelte";

  let chart;

  onMount(async () => {
    const charts = await import("@carbon/charts-svelte");
    chart = charts.BarChartSimple;
  });
</script>

<svelte:component
  this={chart}
  data={[
    { group: "Qty", value: 65000 },
    { group: "More", value: 29123 },
    { group: "Sold", value: 35213 },
    { group: "Restocking", value: 51213 },
    { group: "Misc", value: 16932 },
  ]}
  options={{
    title: "Simple bar (discrete)",
    height: "400px",
    axes: {
      left: { mapsTo: "value" },
      bottom: { mapsTo: "group", scaleType: "labels" },
    },
  }}
/>

```

### Event listeners

In this example, an event listener is attached to the `BarChartSimple` component
that fires when hovering over a bar.

```svelte
<script>
  import "@carbon/styles/css/styles.css";
  import "@carbon/charts/styles.css";
  import { onMount } from "svelte";
  import { BarChartSimple } from "@carbon/charts-svelte";

  let chart;

  function barMouseOver(e) {
    console.log(e.detail);
  }

  onMount(() => {
    return () => {
      if (chart) chart.services.events.removeEventListener("bar-mouseover", barMouseOver);
    };
  });

  $: if (chart) chart.services.events.addEventListener("bar-mouseover", barMouseOver);
</script>

<BarChartSimple
  bind:chart
  data={[
    { group: "Qty", value: 65000 },
    { group: "More", value: 29123 },
    { group: "Sold", value: 35213 },
    { group: "Restocking", value: 51213 },
    { group: "Misc", value: 16932 },
  ]}
  options={{
    title: "Simple bar (discrete)",
    height: "400px",
    axes: {
      left: { mapsTo: "value" },
      bottom: { mapsTo: "group", scaleType: "labels" },
    },
  }}
/>

```

## Codesandbox examples

[Sample use cases can be seen here](https://carbon-design-system.github.io/carbon-charts/svelte).

**When opening the link above**, click on the **Edit on Codesandbox** button for
each demo to see an isolated project showing you how to reproduce the demo.

## Charting data & options

Although we will definitely introduce new models in the future as we start
shipping new components such as maps, Data and options follow the same model in
all charts, with minor exceptions and differences in specific components.

For instance in the case of a donut chart you're able to pass in an additional
field called `center` in your options configuring the donut center.

For instructions on using the **tabular data format**, see
[here](https://carbon-design-system.github.io/carbon-charts/?path=/story/docs-tutorials--tabular-data-format)

There are also additional options available depending on the chart type being
used,
[see our demo examples here](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data).

Customizable options (specific to chart type) can be found
[here](https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html)

## TypeScript support

Svelte version 3.31 or greater is required to use this library with TypeScript.

TypeScript definitions are located in the [types folder](types/).
