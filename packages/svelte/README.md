# Carbon Charts Svelte

Carbon Charts Svelte is a thin Svelte wrapper around the vanilla JavaScript `@carbon/charts`
component library. The charts are based on D3.js, a peer dependency. Documentation is provided below
and in the Storybook demos.

**[Storybook demos](https://charts.carbondesignsystem.com/svelte)**

**[Storybook demo sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

## Maintenance & support

These Svelte wrappers were developed by Eric Liu.

Please direct all questions regarding support, bug fixes and feature requests to
[@nstuyvesant](https://github.com/nstuyvesant) and [@metonym](https://github.com/metonym).

## Getting started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -D @carbon/charts-svelte d3 d3-cloud d3-sankey
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add -D @carbon/charts-svelte d3 d3-cloud d3-sankey
```

### SvelteKit

While this component library can be used with any build environments for Svelte,
[SvelteKit](https://kit.svelte.dev) is the official framework for building Svelte apps supporting
client-side and server-side rendering (SSR). SvelteKit is powered by [Vite](https://vitejs.dev).

The module `@carbon/charts` should not be externalized for SSR when building for production.

```js
// vite.config.mjs
import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: process.env.NODE_ENV === 'production' ? ['@carbon/charts'] : []
	}
}

export default config
```

#### Circular dependency warnings

You may see circular dependency warnings for `d3` packages. These can be safely ignored.

## Usage

Styles must be imported from `@carbon/charts-svelte/styles.css`.

```js
import '@carbon/charts-svelte/styles.css'
```

### Basic

```svelte
<script>
	import '@carbon/charts-svelte/styles.css'
	import { BarChartSimple } from '@carbon/charts-svelte'
</script>

<BarChartSimple
	data={[
		{ group: 'Qty', value: 65000 },
		{ group: 'More', value: 29123 },
		{ group: 'Sold', value: 35213 },
		{ group: 'Restocking', value: 51213 },
		{ group: 'Misc', value: 16932 }
	]}
	options={{
		theme: 'g90',
		title: 'Simple bar (discrete)',
		height: '400px',
		axes: {
			left: { mapsTo: 'value' },
			bottom: { mapsTo: 'group', scaleType: 'labels' }
		}
	}} />
```

### Dispatched events

Each Svelte chart component dispatches the following events:

- **on:load**: fired when the chart is instantiated
- **on:update**: fired when `data` or `options` are updated
- **on:destroy**: fired when the component is unmounted and the chart is destroyed

```svelte
<BarChartSimple {data} {options} on:load on:update on:destroy />
```

### Dynamic import

Dynamically import a chart and instantiate it using the
[svelte:component API](https://svelte.dev/docs/special-elements#svelte-component). By importing
`@carbon/charts` within `onMount()`, you avoid problems with server-side rendering.

```svelte
<script>
	import '@carbon/charts-svelte/styles.css'
	import { onMount } from 'svelte'

	let chart

	onMount(async () => {
		const charts = await import('@carbon/charts-svelte')
		chart = charts.BarChartSimple
	})
</script>

<svelte:component
	this={chart}
	data={[
		{ group: 'Qty', value: 65000 },
		{ group: 'More', value: 29123 },
		{ group: 'Sold', value: 35213 },
		{ group: 'Restocking', value: 51213 },
		{ group: 'Misc', value: 16932 }
	]}
	options={{
		theme: 'white',
		title: 'Simple bar (discrete)',
		height: '400px',
		axes: {
			left: { mapsTo: 'value' },
			bottom: { mapsTo: 'group', scaleType: 'labels' }
		}
	}} />
```

### Event listeners

In this example, an event listener is attached to the `BarChartSimple` component that fires when
hovering over a bar.

```svelte
<script>
	import '@carbon/charts-svelte/styles.css'
	import { onMount } from 'svelte'
	import { BarChartSimple } from '@carbon/charts-svelte'

	let chart

	function barMouseOver(e) {
		console.log(e.detail)
	}

	onMount(() => {
		chart.services.events.addEventListener('bar-mouseover', barMouseOver)

		return () => {
			chart?.services.events.removeEventListener('bar-mouseover', barMouseOver)
		}
	})
</script>

<BarChartSimple
	bind:chart
	data={[
		{ group: 'Qty', value: 65000 },
		{ group: 'More', value: 29123 },
		{ group: 'Sold', value: 35213 },
		{ group: 'Restocking', value: 51213 },
		{ group: 'Misc', value: 16932 }
	]}
	options={{
		title: 'Simple bar (discrete)',
		height: '400px',
		axes: {
			left: { mapsTo: 'value' },
			bottom: { mapsTo: 'group', scaleType: 'labels' }
		}
	}} />
```

## StackBlitz examples

[Sample use cases can be seen here](https://charts.carbondesignsystem.com/svelte).

**When opening the link above**, click on the **Edit on StackBlitz** button for each demo to see an
isolated project showing you how to reproduce the demo.

## Charting data & options

Although new charts will be introduced in the future (such as a choropleth), data and options follow
the same model for all charts with minor exceptions. For example, in the case of a donut chart,
you're able to pass in an additional field called `center` in your options to configure the donut
center.

[Instructions for using the **tabular data format**](https://charts.carbondesignsystem.com/svelte/?path=/docs/docs-tutorials-tabular-data-format--docs)

Additional options are available depending on the chart type being used,
[see our demo examples here](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/src/demo/charts).

Customizable options (specific to chart type) can be found
[here](https://charts.carbondesignsystem.com/documentation/modules/interfaces.html)

## TypeScript support

Svelte version 3.31 or greater is required to use this library with TypeScript. Svelte 4.x+ is
recommended.

### Enums and types

For your convenience, enums and types from `@carbon/charts` are re-exported from
`@carbon/charts-svelte`.

```ts
import { ScaleTypes, type BarChartOptions } from '@carbon/charts-svelte'

const options: BarChartOptions = {
	title: 'Simple bar (discrete)',
	height: '400px',
	axes: {
		left: { mapsTo: 'value' },
		bottom: {
			mapsTo: 'group',
			scaleType: ScaleTypes.LABELS
		}
	}
}
```

### Component type

Use the `ComponentType` utility type from `svelte` to extract the component type for chart
components.

```ts
import { onMount, type ComponentType } from 'svelte'
import type { BarChartSimple } from '@carbon/charts-svelte'

let component: ComponentType<BarChartSimple> = null

onMount(async () => {
	component = (await import('@carbon/charts-svelte')).BarChartSimple
})
```

### Component props

Use the `ComponentProps` utility type from `svelte` to extract the props for chart components.

You can then use an
[indexed access type](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) to
extract types for individual properties.

```ts
import { type ComponentProps } from 'svelte'
import { BarChartSimple } from '@carbon/charts-svelte'

type ChartProps = ComponentProps<BarChartSimple>

// Indexed access type to access the type of the `chart` property
let chart: ChartProps['chart'] = null
```

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect metrics data. By installing this
package as a dependency you are agreeing to telemetry collection. To opt out,
see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).