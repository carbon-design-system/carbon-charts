import { AxisChart } from '@/axis-chart'
import { options as configOptions } from '@/configuration'
import { getProperty, mergeDefaultChartOptions } from '@/tools'
import { HeatmapModel } from '@/model/heatmap'
import type { HeatmapChartOptions } from '@/interfaces/charts'
import type { ChartConfig } from '@/interfaces/model'
import { LayoutDirection, LayoutGrowth, RenderTypes, LayoutAlignItems } from '@/interfaces/enums'
import type { Component } from '@/components/component'
import { Heatmap } from '@/components/graphs/heatmap'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { Modal } from '@/components/essentials/modal'
import { LayoutComponent } from '@/components/layout/layout'
import { ColorScaleLegend } from '@/components/essentials/color-scale-legend'
import { Title } from '@/components/essentials/title'
import { AxisChartsTooltip } from '@/components/essentials/tooltip-axis'
import { Spacer } from '@/components/layout/spacer'
import { Toolbar } from '@/components/axes/toolbar'

export class HeatmapChart extends AxisChart {
	model = new HeatmapModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<HeatmapChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			mergeDefaultChartOptions(configOptions.heatmapChart, chartConfigs.options)
		)

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	// Custom getChartComponents - Implements getChartComponents
	// Removes zoombar support and additional `features` that are not supported in heatmap
	protected getAxisChartComponents(graphFrameComponents: any[], configs?: any) {
		const options = this.model.getOptions()
		const toolbarEnabled = getProperty(options, 'toolbar', 'enabled')

		this.services.cartesianScales.determineAxisDuality()
		this.services.cartesianScales.findDomainAndRangeAxes() // need to do this before getMainXAxisPosition()
		this.services.cartesianScales.determineOrientation()

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
					chartType: 'heatmap'
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

		const topLevelLayoutComponents: any[] = []
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
			new AxisChartsTooltip(this.model, this.services),
			new Modal(this.model, this.services),
			new LayoutComponent(this.model, this.services, topLevelLayoutComponents, {
				direction: LayoutDirection.COLUMN
			})
		]
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Heatmap(this.model, this.services)
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
