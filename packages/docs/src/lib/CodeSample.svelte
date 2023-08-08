<script lang="ts">
  import type { EmbedOptions } from '@stackblitz/sdk'
  import sdk from '@stackblitz/sdk'
	import { onMount } from 'svelte'
  import { getVanillaProject } from './stackblitz/vanilla'
  import { getSvelteProject } from './stackblitz/svelte'
  import { getReactProject } from './stackblitz/react'
  import { getVueProject } from './stackblitz/vue'
  import { getAngularProject } from './stackblitz/angular'
  import { getHtmlProject } from './stackblitz/html'

  type Framework = 'vanilla' | 'svelte' | 'react' | 'vue' | 'angular' | 'html'

	export let id = `stackblitz-example-${Math.random().toString(36)}` // may not need
  export let ref: HTMLDivElement //| null = null
  export let framework: Framework
  export let chartType: string = ''
  export let data: string = ''
  export let options: string = ''

  const embedOptions: EmbedOptions = { height: 600 }
  const getProject = {
    'vanilla': getVanillaProject,
    'svelte': getSvelteProject,
    'react': getReactProject,
    'vue': getVueProject,
    'angular': getAngularProject,
    'html': getHtmlProject
  }

  onMount(() => {
    sdk.embedProject(ref, getProject[framework](chartType, data, options), embedOptions)
  })
</script>

<div {id} bind:this={ref}></div>