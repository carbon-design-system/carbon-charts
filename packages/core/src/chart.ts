import { getProperty } from '@/tools'
import { ChartModel } from '@/model/model'
import { ChartConfig } from '@/interfaces/model'
import { BaseChartOptions } from '@/interfaces/charts'
import {
	LayoutGrowth,
	LayoutAlignItems,
	LayoutDirection,
	LegendOrientations,
	Events as ChartEvents,
	RenderTypes
} from '@/interfaces/enums'
import type { Component } from '@/components/component'
import { Toolbar } from '@/components/axes/toolbar'
import { LayoutComponent } from '@/components/layout'
import { Spacer } from '@/components/layout/spacer'
import { Modal } from '@/components/essentials/modal'
import { Title } from '@/components/essentials/title'
import { Legend } from '@/components/essentials/legend'
import { CanvasChartClip } from '@/components/essentials/canvas-chart-clip'
import { Tooltip } from '@/components/essentials/tooltip'
import { CanvasZoom } from '@/services/canvas-zoom'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events } from '@/services/essentials/events'
import { Files } from '@/services/essentials/files'
import { GradientUtils } from '@/services/essentials/gradient-utils'
import { Transitions } from '@/services/essentials/transitions'

export class Chart {
	components: Component[] = []
	services: any = {
		canvasZoom: CanvasZoom,
		domUtils: DOMUtils,
		events: Events,
		files: Files,
		gradientUtils: GradientUtils,
		transitions: Transitions
	}
	model: ChartModel = new ChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BaseChartOptions>) {
		// Allow for subclasses to override the constructor with additional parameters or initialization logic without breaking the API contract of the Chart class
	}

	// Contains the code that uses properties that are overridable by the super-class
	init(holder: HTMLDivElement, chartConfigs: ChartConfig<BaseChartOptions>) {
		// Store the holder in the model
		this.model.set({ holder }, { skipUpdate: true })

		// Initialize all services
		Object.keys(this.services).forEach(serviceName => {
			const serviceObj = this.services[serviceName]
			this.services[serviceName] = new serviceObj(this.model, this.services)
		})

		// Call update() when model has been updated
		this.services.events.addEventListener(ChartEvents.Model.UPDATE, (e: CustomEvent) => {
			const animate = !!getProperty(e, 'detail', 'animate')
			this.update(animate)
		})

		// Set model data & options
		this.model.setData(chartConfigs.data)

		// Set chart resize event listener
		this.services.events.addEventListener(ChartEvents.Chart.RESIZE, () => {
			this.update(false)
		})

		this.components = this.getComponents()

		this.update()
	}

	getComponents(): Component[] {
		console.error('getComponents() method is not implemented')

		return []
	}

	update(animate = true) {
		// Called 4 times whenever a chart is displayed
		if (!this.components) {
			return
		}

		// Update all services
		Object.keys(this.services).forEach((serviceName: string) => {
			const serviceObj = this.services[serviceName]
			serviceObj.update()
		})

		// Render all components
		this.components.forEach(component => component.render(animate))

		// Asynchronously dispatch a "render-finished" event
		// This is needed because of d3-transitions
		// Since at the start of the transition
		// Elements do not hold their final size or position
		const pendingTransitions = this.services.transitions.getPendingTransitions()
		const promises = Object.keys(pendingTransitions).map(transitionID => {
			const transition = pendingTransitions[transitionID]
			return transition.end().catch((e: any) => e) // Skip rejects since we don't care about those;
		})

		Promise.all(promises).then(() =>
			this.services.events.dispatchEvent(ChartEvents.Chart.RENDER_FINISHED)
		)
	}

	destroy() {
		// Call the destroy() method on all components
		this.components.forEach(component => component.destroy())

		// Remove the chart holder
		this.services.domUtils.getHolder().remove()

		this.model.set({ destroyed: true }, { skipUpdate: true })
	}

	protected getChartComponents(graphFrameComponents: any[], configs?: object) {
		const options = this.model.getOptions()

		const toolbarEnabled = getProperty(options, 'toolbar', 'enabled')

		const legendComponent = {
			id: 'legend',
			components: [new Legend(this.model, this.services)],
			growth: LayoutGrowth.PREFERRED
		}

		// if canvas zoom is enabled
		const isZoomEnabled = getProperty(options, 'canvasZoom', 'enabled')

		if (isZoomEnabled && isZoomEnabled === true) {
			graphFrameComponents.push(new CanvasChartClip(this.model, this.services))
		}

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

		const graphFrameComponent = {
			id: 'graph-frame',
			components: graphFrameComponents,
			growth: LayoutGrowth.STRETCH,
			renderType: getProperty(configs, 'graphFrameRenderType') || RenderTypes.SVG
		}

		const isLegendEnabled =
			getProperty(configs, 'excludeLegend') !== true && options.legend.enabled !== false
		// TODO: REUSE BETWEEN AXISCHART & CHART
		// Decide the position of the legend in reference to the chart
		let fullFrameComponentDirection = LayoutDirection.COLUMN
		if (isLegendEnabled) {
			const legendPosition = getProperty(options, 'legend', 'position')
			if (legendPosition === 'left') {
				fullFrameComponentDirection = LayoutDirection.ROW

				if (!options.legend.orientation) {
					options.legend.orientation = LegendOrientations.VERTICAL
				}
			} else if (legendPosition === 'right') {
				fullFrameComponentDirection = LayoutDirection.ROW_REVERSE

				if (!options.legend.orientation) {
					options.legend.orientation = LegendOrientations.VERTICAL
				}
			} else if (legendPosition === 'bottom') {
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

		// Add chart title if it exists
		const topLevelLayoutComponents: any[] = []

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
}
