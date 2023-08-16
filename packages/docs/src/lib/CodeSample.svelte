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

  export let framework: Framework
  export let chartType: string = ''
  export let data: string = ''
  export let options: string = ''
  let ref: HTMLDivElement

  const embedOptions: EmbedOptions = { height: 600, view: 'default', showSidebar: true }
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

<div bind:this={ref}></div>