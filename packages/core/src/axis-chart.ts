import { Chart } from './chart'
import { getProperty } from './tools'
import { ChartModelCartesian } from '@/model/cartesian-charts'
import { AxisChartOptions } from '@/interfaces/charts'
import { ChartConfig } from '@/interfaces/model'
import {
	AxisPositions,
	LayoutAlignItems,
	LayoutDirection,
	LayoutGrowth,
	LegendOrientations,
	LegendPositions,
	RenderTypes,
	ScaleTypes
} from '@/interfaces/enums'
import { ChartBrush } from '@/components/axes/grid-brush'
import { ChartClip } from '@/components/axes/chart-clip'
import { Toolbar } from '@/components/axes/toolbar'
import { ZoomBar } from '@/components/axes/zoom-bar'
import { LayoutComponent } from '@/components/layout'
import { Spacer } from '@/components/layout/spacer'
import { Modal } from '@/components/essentials/modal'
import { Legend } from '@/components/essentials/legend'
import { Threshold } from '@/components/essentials/threshold'
import { Highlight } from '@/components/essentials/highlights'
import { Title } from '@/components/essentials/title'
import { AxisChartsTooltip } from '@/components/essentials/tooltip-axis'
import { CartesianScales } from '@/services/scales-cartesian'
import { Curves } from '@/services/curves'
import { Zoom } from '@/services/zoom'

export class AxisChart extends Chart {
	services: any = Object.assign(this.services, {
		cartesianScales: CartesianScales,
		curves: Curves,
		zoom: Zoom
	})
	model: ChartModelCartesian = new ChartModelCartesian(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<AxisChartOptions>) {
		super(holder, chartConfigs)
	}

	protected getAxisChartComponents(graphFrameComponents: any[], configs?: any) {
		const options = this.model.getOptions()
		const isZoomBarEnabled = getProperty(options, 'zoomBar', AxisPositions.TOP, 'enabled')
		const toolbarEnabled = getProperty(options, 'toolbar', 'enabled')

		this.services.cartesianScales.determineAxisDuality()
		this.services.cartesianScales.findDomainAndRangeAxes() // need to do this before getMainXAxisPosition()
		this.services.cartesianScales.determineOrientation()

		const mainXAxisPosition = this.services.cartesianScales.getMainXAxisPosition()
		const mainXScaleType = getProperty(options, 'axes', mainXAxisPosition, 'scaleType')
		// @todo - Zoom Bar only supports main axis at BOTTOM axis and time scale for now
		const zoomBarEnabled =
			isZoomBarEnabled &&
			mainXAxisPosition === AxisPositions.BOTTOM &&
			mainXScaleType === ScaleTypes.TIME

		// @todo - should check if zoom bar in all axes are locked
		const isZoomBarLocked = this.services.zoom.isZoomBarLocked(AxisPositions.TOP)

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
			components: [new Legend(this.model, this.services)],
			growth: LayoutGrowth.PREFERRED
		}

		// if all zoom bars are locked, no need to add chart brush
		if (zoomBarEnabled && !isZoomBarLocked) {
			graphFrameComponents.push(
				new ChartClip(this.model, this.services),
				new ChartBrush(this.model, this.services)
			)
		}

		graphFrameComponents.push(new Threshold(this.model, this.services))
		graphFrameComponents.push(new Highlight(this.model, this.services))

		const graphFrameComponent = {
			id: 'graph-frame',
			components: graphFrameComponents,
			growth: LayoutGrowth.STRETCH,
			renderType: RenderTypes.SVG
		}

		const isLegendEnabled =
			getProperty(configs, 'legend', 'enabled') !== false &&
			this.model.getOptions().legend.enabled !== false

		// Decide the position of the legend in reference to the chart
		let fullFrameComponentDirection = LayoutDirection.COLUMN
		if (isLegendEnabled) {
			const legendPosition = getProperty(this.model.getOptions(), 'legend', 'position')
			if (legendPosition === LegendPositions.LEFT) {
				fullFrameComponentDirection = LayoutDirection.ROW

				if (!this.model.getOptions().legend.orientation) {
					this.model.getOptions().legend.orientation = LegendOrientations.VERTICAL
				}
			} else if (legendPosition === LegendPositions.RIGHT) {
				fullFrameComponentDirection = LayoutDirection.ROW_REVERSE

				if (!this.model.getOptions().legend.orientation) {
					this.model.getOptions().legend.orientation = LegendOrientations.VERTICAL
				}
			} else if (legendPosition === LegendPositions.BOTTOM) {
				fullFrameComponentDirection = LayoutDirection.COLUMN_REVERSE
			}
		}

		const legendSpacerComponent = {
			id: 'spacer',
			components: [new Spacer(this.model, this.services)],
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

		const zoomBarComponent = {
			id: 'zoom-bar',
			components: [new ZoomBar(this.model, this.services)],
			growth: LayoutGrowth.PREFERRED,
			renderType: RenderTypes.SVG
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
		if (zoomBarEnabled) {
			topLevelLayoutComponents.push(zoomBarComponent)
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
}
