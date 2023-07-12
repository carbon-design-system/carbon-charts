import { select, type Selection as D3Selection } from 'd3'
import { merge } from 'lodash-es'
import { getProperty } from '@/tools'
import { carbonPrefix } from '@/configuration-non-customizable' // CSS prefix
import type { ChartModel } from '@/model/model'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { RenderTypes } from '@/interfaces/enums'
import { Services } from '@/interfaces/services'

export class Component {
	public type = ''
	public renderType = RenderTypes.HTML

	public id = ''

	protected parent: D3Selection<SVGGraphicsElement|HTMLDivElement, any, HTMLElement, any> | undefined = undefined

	protected configs: any = {}

	protected model: ChartModel
	protected services: Services

	constructor(model: ChartModel, services: Services, configs?: any) {
		this.model = model
		this.services = services

		if (configs) {
			this.configs = configs
			if (this.configs.id) {
				const chartprefix = getProperty(this.model.getOptions(), 'style', 'prefix')
				this.id = `${chartprefix}--${this.configs.id}`
			}
		}

		// Set parent element to shell SVG if no parent exists for component
		if (!this.parent) {
			this.setParent(select<SVGGraphicsElement|HTMLDivElement, any>(this.services.domUtils.getMainContainer() as HTMLDivElement))
		}
	}

	init() {
		// do nothing.
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = true): void {
		console.error('Error: Component did not provide the required render function.')
	}

	destroy() {
		// do nothing.
	}

	// Used to pass down information to the components
	setModel(newObj: any) {
		this.model = newObj
	}

	// Used to pass down information to the components
	setServices(newObj: any) {
		this.services = newObj
	}

	setParent(parent: any) {
		const oldParent = this.parent
		this.parent = parent

		if (oldParent && oldParent.node() === parent.node()) {
			return
		}

		if (this.type) {
			const chartprefix = getProperty(this.model.getOptions(), 'style', 'prefix')
			this.parent?.classed(`${carbonPrefix}--${chartprefix}--${this.type}`, true)

			if (oldParent) {
				oldParent.classed(`${carbonPrefix}--${chartprefix}--${this.type}`, false)
			}
		}
	}

	getParent() {
		return this.parent
	}

	getComponentContainer(configs = { withinChartClip: false }) {

		if (this.type) {
			const chartprefix = getProperty(this.model.getOptions(), 'style', 'prefix')

			const idSelector = this.id ? `#${this.id}` : ''
			const container = DOMUtils.appendOrSelect(
				this.parent,
				`${
					this.renderType === RenderTypes.SVG ? 'svg' : 'div'
				}${idSelector}.${carbonPrefix}--${chartprefix}--${this.type}`
			)

			if (configs.withinChartClip) {
				// get unique chartClipId int this chart from model
				const chartClipId = this.model.get('chartClipId')

				if (chartClipId) {
					const chartClipSelection = select(`#${chartClipId}`)
					const chartClipRectSelection = chartClipSelection.select('rect')

					/*
					 * these checks are needed because of a chrome bug
					 * related to the rendering of the clip path
					 */
					if (
						chartClipRectSelection.size() !== 0 &&
						parseFloat(chartClipRectSelection.attr('height')) > 0
					) {
						container.attr('clip-path', `url(#${chartClipId})`)
					}
				}
			}

			return container.attr('width', '100%').attr('height', '100%')
		}
		return this.parent
	}

	/**
	 * graphs used in combo charts share a model with global options but can receive their own local options.
	 * this function retrieves the global options and merges it with any options passed into this
	 * component's config.options object.
	 */
	getOptions() {
		if (this.configs.options) {
			const options = merge({}, this.model.getOptions(), this.configs.options)
			return options
		}
		return this.model.getOptions()
	}
}
