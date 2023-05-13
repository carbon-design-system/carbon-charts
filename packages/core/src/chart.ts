// Internal Imports
import {
	ChartConfig,
	BaseChartOptions,
	LayoutGrowth,
	LayoutAlignItems,
	LayoutDirection,
	LegendOrientations,
	Events as ChartEvents,
	RenderTypes
} from './interfaces'

// Misc
import { ChartModel } from './model/model'
import {
	Component,
	Modal,
	Title,
	Legend,
	LayoutComponent,
	Toolbar,
	Tooltip,
	Spacer,
	CanvasChartClip
} from './components'
import { getProperty } from './tools'

// Services
import { CanvasZoom, DOMUtils, Events, Files, GradientUtils, Transitions } from './services/index'

export class Chart {
	components: Component[]
	services: any = {
		domUtils: DOMUtils,
		files: Files,
		events: Events,
		gradientUtils: GradientUtils,
		transitions: Transitions,
		canvasZoom: CanvasZoom
	}
	model: ChartModel = new ChartModel(this.services)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BaseChartOptions>) {
		// Allow for subclasses to override the constructor with additional parameters or initialization logic without breaking the API contract of the Chart class
	}

	// Contains the code that uses properties that are overridable by the super-class
	init(holder: HTMLDivElement, chartConfigs: ChartConfig<BaseChartOptions>) {
		// Store the holder in the model
		this.model.set({ holder }, { skipUpdate: true })

		// Initialize all services
		Object.keys(this.services).forEach((serviceName) => {
			const serviceObj = this.services[serviceName]
			this.services[serviceName] = new serviceObj(this.model, this.services)
		})

		// Call update() when model has been updated
		this.services.events.addEventListener(ChartEvents.Model.UPDATE, () => {
			this.update()
		})

		// Set model data & options
		this.model.setData(chartConfigs.data)

		// Set chart resize event listener
		this.services.events.addEventListener(ChartEvents.Chart.RESIZE, () => {
			this.update()
		})

		this.components = this.getComponents()

		this.update()
	}

	getComponents(): any[] {
		console.error('getComponents() method is not implemented')

		return null
	}

	update() {
		if (!this.components) {
			return
		}

		// Update all services
		Object.keys(this.services).forEach((serviceName: string) => {
			const serviceObj = this.services[serviceName]
			serviceObj.update()
		})

		// Render all components
		this.components.forEach((component) => component.render(true))

		// Asynchronously dispatch a "render-finished" event
		// This is needed because of d3-transitions
		// Since at the start of the transition
		// Elements do not hold their final size or position
		const pendingTransitions = this.services.transitions.getPendingTransitions()
		const promises = Object.keys(pendingTransitions).map((transitionID) => {
			const transition = pendingTransitions[transitionID]
			return transition.end().catch((e: any) => e) // Skip rejects since we don't care about those;
		})

		Promise.all(promises).then(() =>
			this.services.events.dispatchEvent(ChartEvents.Chart.RENDER_FINISHED)
		)
	}

	destroy() {
		// Call the destroy() method on all components
		this.components.forEach((component) => component.destroy())

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
		// TODORF - REUSE BETWEEN AXISCHART & CHART
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
		const topLevelLayoutComponents = []

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
