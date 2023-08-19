import sdk from '@stackblitz/sdk'
import { getProject } from './'
import type { ChartOptions, ChartTabularData } from '@carbon/charts-svelte'

export const openStackBlitz = (framework: Framework, chartType: string, data: ChartTabularData, options: ChartOptions) => {
  sdk.openProject(getProject[framework](chartType, data, options), { newWindow: true })
}