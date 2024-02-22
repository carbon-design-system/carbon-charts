import { Chart } from '@/chart'
import { options as configOptions } from '@/configuration'
import { getProperty, mergeDefaultChartOptions } from '@/tools'
import { ChoroplethModel } from '@/model/choropleth'
import type { ChoroplethChartOptions } from '@/interfaces/charts'
import type { ChartConfig } from '@/interfaces/model'
import { LayoutDirection, LayoutGrowth, RenderTypes, LayoutAlignItems } from '@/interfaces/enums'
import type { Component } from '@/components/component'
import { Choropleth } from '@/components/graphs/choropleth'
import { Modal } from '@/components/essentials/modal'
import { LayoutComponent } from '@/components/layout/layout'
import { ColorScaleLegend } from '@/components/essentials/color-scale-legend'
import { Title } from '@/components/essentials/title'
import { Spacer } from '@/components/layout/spacer'
import { Toolbar } from '@/components/axes/toolbar'
import { Tooltip } from '@/components/essentials/tooltip'

export class ExperimentalChoroplethChart extends Chart {
	model = new ChoroplethModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<ChoroplethChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			mergeDefaultChartOptions(configOptions.choroplethChart, chartConfigs.options)
		)

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	// Custom getChartComponents - Implements getChartComponents
	// Removes zoombar support and additional `features` that are not supported in heatmap
	protected getChartComponents(graphFrameComponents: any[], configs?: any) {
		const options = this.model.getOptions()
		const toolbarEnabled = getProperty(options, 'toolbar', 'enabled')

		const titleAvailable = !!this.model.getOptions().title
		const titleComponent = {
			id: 'title',
			components: [new Title(this.model, this.services)],
			growth: LayoutGrowth.STRETCH
		}

		const toolbarComponent = {
			id: 'toolbar',
			components: [new Toolbar(this.model, this.services)],
			growth: LayoutGrowth.PREFERRED
		}

		const headerComponent = {
			id: 'header',
			components: [
				new LayoutComponent(
					this.model,
					this.services,
					[
						// always add title to keep layout correct
						titleComponent,
						...(toolbarEnabled ? [toolbarComponent] : [])
					],
					{
						direction: LayoutDirection.ROW,
						alignItems: LayoutAlignItems.CENTER
					}
				)
			],
			growth: LayoutGrowth.PREFERRED
		}

		const legendComponent = {
			id: 'legend',
			components: [
				new ColorScaleLegend(this.model, this.services, {
					chartType: 'choropleth'
				})
			],
			growth: LayoutGrowth.PREFERRED,
			renderType: RenderTypes.SVG
		}

		const graphFrameComponent = {
			id: 'graph-frame',
			components: graphFrameComponents,
			growth: LayoutGrowth.STRETCH,
			renderType: RenderTypes.SVG
		}

		const isLegendEnabled =
			getProperty(configs, 'legend', 'enabled') !== false &&
			this.model.getOptions().legend.enabled !== false &&
			this.model.getData().length > 0

		// Decide the position of the legend in reference to the chart
		const fullFrameComponentDirection = LayoutDirection.COLUMN_REVERSE

		const legendSpacerComponent = {
			id: 'spacer',
			components: [new Spacer(this.model, this.services, { size: 15 })],
			growth: LayoutGrowth.PREFERRED
		}

		const fullFrameComponent = {
			id: 'full-frame',
			components: [
				new LayoutComponent(
					this.model,
					this.services,
					[
						...(isLegendEnabled ? [legendComponent] : []),
						...(isLegendEnabled ? [legendSpacerComponent] : []),
						graphFrameComponent
					],
					{
						direction: fullFrameComponentDirection
					}
				)
			],
			growth: LayoutGrowth.STRETCH
		}

		const topLevelLayoutComponents = []
		// header component is required for either title or toolbar
		if (titleAvailable || toolbarEnabled) {
			topLevelLayoutComponents.push(headerComponent)

			const titleSpacerComponent = {
				id: 'spacer',
				components: [
					new Spacer(this.model, this.services, toolbarEnabled ? { size: 15 } : undefined)
				],
				growth: LayoutGrowth.PREFERRED
			}

			topLevelLayoutComponents.push(titleSpacerComponent)
		}
		topLevelLayoutComponents.push(fullFrameComponent)

		return [
			new Tooltip(this.model, this.services),
			new Modal(this.model, this.services),
			new LayoutComponent(this.model, this.services, topLevelLayoutComponents, {
				direction: LayoutDirection.COLUMN
			})
		]
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [new Choropleth(this.model, this.services)]

		const components: Component[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
