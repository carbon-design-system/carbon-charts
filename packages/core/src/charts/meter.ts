import { cloneDeep, merge } from 'lodash-es'
import { Chart } from '@/chart'
import { options as configOptions } from '@/configuration'
import { getProperty } from '@/tools'
import { MeterChartModel } from '@/model/meter'
import type { ChartConfig } from '@/interfaces/model'
import type { MeterChartOptions } from '@/interfaces/charts'
import { LayoutGrowth, LayoutDirection, RenderTypes } from '@/interfaces/enums'
import type { Component } from '@/components/component'
import { LayoutComponent } from '@/components/layout'
import { Meter } from '@/components/graphs/meter'
import { MeterTitle } from '@/components/essentials/title-meter'
import { Spacer } from '@/components/layout/spacer'

export class MeterChart extends Chart {
	model = new MeterChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<MeterChartOptions>) {
		super(holder, chartConfigs)

		// use prop meter options or regular meter options
		const options = chartConfigs.options.meter?.proportional
			? merge(cloneDeep(configOptions.proportionalMeterChart), chartConfigs.options)
			: merge(cloneDeep(configOptions.meterChart), chartConfigs.options)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(options)

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		const showLabels = getProperty(this.model.getOptions(), 'meter', 'showLabels')
		const meterComponents = [
			...(showLabels
				? [
						// Meter has a unique dataset title within the graph
						{
							id: 'meter-title',
							components: [new MeterTitle(this.model, this.services)],
							growth: LayoutGrowth.STRETCH,
							renderType: RenderTypes.SVG
						},
						// Create the title spacer
						{
							id: 'spacer',
							components: [
								new Spacer(this.model, this.services, {
									size: 8
								})
							],
							growth: LayoutGrowth.STRETCH
						}
					]
				: []),
			// Specify what to render inside the graph only
			{
				id: 'meter-graph',
				components: [new Meter(this.model, this.services)],
				growth: LayoutGrowth.STRETCH,
				renderType: RenderTypes.SVG
			}
		]

		// the graph frame for meter includes the custom title (and spacer)
		const graphFrame: Component[] = [
			new LayoutComponent(this.model, this.services, meterComponents, {
				direction: LayoutDirection.COLUMN
			})
		]

		// add the meter title as a top level component
		const components: Component[] = this.getChartComponents(graphFrame, {
			graphFrameRenderType: RenderTypes.HTML
		})

		return components
	}
}
