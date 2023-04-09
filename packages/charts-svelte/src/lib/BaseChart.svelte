<script lang="ts">
  import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
  import type { Charts, ChartOptions, ChartTabularData } from '@carbon/charts'

  export let data: ChartTabularData = []
  export let options: ChartOptions // AlluvialChartOptions, BarChartOptions, etc.
  export let Chart: new (ref: HTMLDivElement, { options, data }: { options:ChartOptions, data: ChartTabularData } ) => Charts
  export let chart: Charts // instance of the class passed to the Chart property
  export let ref: HTMLDivElement // reference to chart's div so parent can manipulate it

  const dispatch = createEventDispatcher()

  onMount(() => {
    try {
      chart = new Chart(ref, { data, options })
      dispatch('load')
    } catch (error) {
      console.error('Failed to initialize chart:', error)
    }
  })

  afterUpdate(() => {
    if (chart) {
      try {
        chart.model.setData(data)
        chart.model.setOptions(options)
        dispatch('update', { data, options })
      } catch (error) {
        console.error('Failed to update chart:', error)
      }
    }
  })

  onDestroy(() => {
    if (chart) {
      dispatch('destroy')
      chart.destroy()
    }
  })
</script>

<div bind:this={ref} class='chart-container' {...$$restProps} />
