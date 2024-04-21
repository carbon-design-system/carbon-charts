/// <reference types="vite/client" />

type Framework = 'html' | 'vanilla' | 'svelte' | 'react' | 'vue' | 'angular'

interface ChartTypes {
  vanilla: string
  svelte: string
  react: string
  vue: string
  angular: string
}

interface Example {
  name: string
  data: ChartTabularData
  options: ChartOptions
}