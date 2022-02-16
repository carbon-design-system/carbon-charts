# `@carbon/charts-svelte`

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
-   [Sapper](#sapper)
-   [Rollup](#rollup)
-   [Webpack](#webpack)
-   [Snowpack](#snowpack)

### SvelteKit

[SvelteKit](https://github.com/sveltejs/kit) is fast becoming the de facto
framework for building Svelte apps that supports both client-side rendering
(CSR) and server-side rendering (SSR).

For set-ups powered by [vite](https://github.com/vitejs/vite), add
`@carbon/charts` to the list of dependencies for `vite` to optimize.

If using a [SvelteKit adapter](https://kit.svelte.dev/docs#adapters), instruct
`vite` to avoid externalizing `@carbon/charts` when building for production.

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			optimizeDeps: {
				include: ['@carbon/charts'],
			},
			ssr: {
				noExternal: [production && '@carbon/charts'].filter(Boolean),
			},
		},
	},
};

export default config;
```

### Vite

[vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) is an
alternative to using SvelteKit. Similarly, instruct `vite` to optimize
`@carbon/charts` in vite.config.js.

Note that `@sveltejs/vite-plugin-svelte` is the official vite/svelte integration
not to be confused with [svite](https://github.com/svitejs/svite).

```js
// vite.config.js
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	return {
		plugins: [svelte()],
		build: { minify: mode === 'production' },
		optimizeDeps: { include: ['@carbon/charts'] },
	};
});
```

### Sapper

[sapper](https://github.com/sveltejs/sapper) is another official Svelte
framework that supports server-side rendering (SSR).

Take care to install `@carbon/charts-svelte` as a development dependency.

No additional configuration should be necessary.

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

[webpack](https://github.com/webpack/webpack) is another popular application
bundler used to build Svelte apps.

No additional configuration should be necessary.

### Snowpack

[snowpack](https://github.com/snowpackjs/snowpack) is an ESM-powered frontend
build tool.

Ensure you have
[@snowpack/plugin-svelte](https://yarnpkg.com/package/@snowpack/plugin-svelte)
added as a plugin in `snowpack.config.js`.

No additional configuration should be necessary.

```js
// snowpack.config.js

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	plugins: ['@snowpack/plugin-svelte'],
};
```

## Usage

Import chart styles from `@carbon/charts`:

-   `@carbon/charts/styles.css`: White theme
-   `@carbon/charts/styles-g10.css`: Gray 10 theme
-   `@carbon/charts/styles-g90.css`: Gray 90 theme
-   `@carbon/charts/styles-g100.css`: Gray 100 theme

### Basic

```svelte
<script>
  import { BarChartSimple } from "@carbon/charts-svelte";
  import "@carbon/charts/styles.min.css";
  import "carbon-components/css/carbon-components.min.css";
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
  import { onMount } from "svelte";
  import "@carbon/charts/styles.min.css";
  import "carbon-components/css/carbon-components.min.css";

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
  import { onMount } from "svelte";
  import { BarChartSimple } from "@carbon/charts-svelte";
  import "@carbon/charts/styles.min.css";
  import "carbon-components/css/carbon-components.min.css";

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
