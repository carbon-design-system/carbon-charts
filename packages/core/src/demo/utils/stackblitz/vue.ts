import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import type { Demo } from '@/demo'

import { version } from '../package-versions'

export function buildVueExample(demo: Demo): Project {

  const dependencies: Record<string, string> = {
    '@carbon/charts': version.carbonCharts,
    '@carbon/charts-vue': version.carbonCharts,
    '@carbon/styles': version.carbonStyles,
    d3: version.d3,
    'd3-cloud': version.d3Cloud,
    'd3-sankey': version.d3Sankey,
    'sass': version.sass,
    'vue': version.vue
  }

  const indexHtml =
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Carbon Charts Vue Example</title>
    <link rel="preconnect" crossorigin="anonymous" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400%7CIBM+Plex+Sans:400,600&display=swap"
      rel="stylesheet"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>`

  const appVue =
`<template>
<div id="app" class="p-1">
  <${demo.chartType.vue} :data="data" :options="options" />
</div>
</template>

<script>
import data from './data.json';
import options from './options.json';

export default {
  data() {
    return {
      data,
      options
    };
  }
};
</script>

<style>
@import '@carbon/styles/css/styles.css';
@import '@carbon/charts/styles.css';
.p-1 {
padding: 2rem;
}
</style>
`

  const mainJs =
`import { createApp } from 'vue'
import ChartsVue from '@carbon/charts-vue'
import App from './App.vue'
const app = createApp(App)
app.use(ChartsVue)
app.mount('#app')
`

  const packageJson = {
    name: 'carbon-charts-vue-example',
    description: 'Carbon Charts Vue Example',
    version: '0.0.0',
    scripts: {
      serve: 'vue-cli-service serve',
      build: 'vue-cli-service build',
      lint: 'vue-cli-service lint'
    },
    dependencies
  }

  return {
    template: 'vue' as ProjectTemplate,
    title: 'Carbon Charts Vue Example',
    dependencies,
    files: {
      'public/index.html': indexHtml,
      'src/App.vue': appVue,
      'src/data.json': JSON.stringify(demo.data, null, 2),
      'src/main.js': mainJs,
      'src/options.json': JSON.stringify(demo.options, null, 2),
      'package.json': JSON.stringify(packageJson, null, 2)
    }
  }
}