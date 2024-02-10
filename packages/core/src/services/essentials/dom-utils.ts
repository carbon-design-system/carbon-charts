import { select, type Selection } from 'd3'
import { toPng, toJpeg } from 'html-to-image'
import { debounce } from 'lodash-es'
import { getProperty } from '@/tools'
import { carbonPrefix } from '@/configuration-non-customizable' // CSS prefix
import type { ChartModel } from '@/model/model'
import { Service } from '@/services/service'
import { Events } from '@/interfaces/enums'

const CSS_VERIFIER_ELEMENT_CLASSNAME = 'DONT_STYLE_ME_css_styles_verifier'

// Functions like validateAndSetDimensions() may return strings or numbers
export interface Dimensions {
	height: number
	width: number
}

export interface getSVGElementSizeOptions {
	useAttrs?: boolean
	useClientDimensions?: boolean
	useBBox?: boolean
	useBoundingRect?: boolean
}

export class DOMUtils extends Service {
	private chartID!: string // initialized in initializeID() called by init()

	constructor(model: ChartModel, services: any) {
		super(model, services)
	}

	static getHTMLElementSize(element: HTMLElement) {
		return {
			width: element.clientWidth,
			height: element.clientHeight
		}
	}

	static getSVGElementSize(
		svgSelector: Selection<SVGGraphicsElement, any, Element, any>,
		options: getSVGElementSizeOptions = {
			useAttrs: false,
			useClientDimensions: false,
			useBBox: false,
			useBoundingRect: false
		}
	) {
		if (!svgSelector.attr) {
			svgSelector = select<SVGGraphicsElement, any>(svgSelector as any) // issue with @types/d3 - select can handle Selection parameters just fine
		}

		const finalDimensions = {
			width: 0,
			height: 0
		}

		// Dimensions can be width and height as numbers or strings
		const validateAndSetDimensions = (dimensions: any) => {
			if (dimensions) {
				Object.keys(finalDimensions).forEach((dimensionKey: 'width' | 'height') => {
					if (dimensions[dimensionKey]) {
						const dimension = dimensions[dimensionKey]
						const dimensionNumber = parseFloat(dimension)
						if (
							dimension &&
							dimensionNumber > finalDimensions[dimensionKey] &&
							('' + dimension).indexOf('%') === -1
						) {
							finalDimensions[dimensionKey] = dimensionNumber
						}
					}
				})
			}
		}

		const attrDimensions = {
			width: svgSelector.attr('width'),
			height: svgSelector.attr('height')
		}

		const svgElement = svgSelector.node()

		let bbox: DOMRect,
			bboxDimensions: Dimensions,
			boundingRect: DOMRect,
			boundingRectDimensions: Dimensions

		try {
			// Not all SVG graphics elements have bounding boxes (eg <defs>, <title>, <styles>)
			if (typeof svgElement.getBBox === 'function') {
				bbox = svgElement.getBBox()
				bboxDimensions = {
					width: bbox.width,
					height: bbox.height
				}
			}
		} catch (e) {
			console.error(e)
		}

		try {
			// Not all SVG graphics elements have...
			if (typeof svgElement?.getBoundingClientRect === 'function') {
				boundingRect = svgElement.getBoundingClientRect()
				boundingRectDimensions = {
					width: boundingRect.width,
					height: boundingRect.height
				}
			}
		} catch (e) {
			console.error(e)
		}

		// Not all SVG graphics elements have...
		let clientDimensions: Dimensions
		if (svgElement instanceof SVGSVGElement) {
			clientDimensions = {
				width: svgElement.clientWidth,
				height: svgElement.clientHeight
			}
		}

		// If both attribute values are numbers
		// And not percentages or NaN
		if (options) {
			if (options.useAttrs) {
				validateAndSetDimensions(attrDimensions)

				if (finalDimensions.width > 0 && finalDimensions.height > 0) {
					return finalDimensions
				}
			}

			if (options.useClientDimensions) {
				validateAndSetDimensions(clientDimensions)

				if (finalDimensions.width > 0 && finalDimensions.height > 0) {
					return clientDimensions
				}
			}

			if (options.useBBox) {
				validateAndSetDimensions(bboxDimensions)

				if (finalDimensions.width > 0 && finalDimensions.height > 0) {
					return bboxDimensions
				}
			}

			if (options.useBoundingRect) {
				validateAndSetDimensions(boundingRectDimensions)

				if (finalDimensions.width > 0 && finalDimensions.height > 0) {
					return boundingRectDimensions
				}
			}
		}

		try {
			const nativeDimensions = {
				width: getProperty(svgSelector.node(), 'width', 'baseVal', 'value'),
				height: getProperty(svgSelector.node(), 'height', 'baseVal', 'value')
			}

			validateAndSetDimensions(nativeDimensions)
		} catch (e) {
			validateAndSetDimensions(clientDimensions)
			validateAndSetDimensions(bboxDimensions)
			validateAndSetDimensions(attrDimensions)
		}
		return finalDimensions
	}

	static appendOrSelect(
		parent: Selection<SVGElement | HTMLDivElement, any, Element, any>,
		query: string
	) {
		const selection = parent.select(`${query}`)

		if (selection.empty()) {
			// see if there is an id
			let querySections = query.split('#')
			let elementToAppend: any
			let id: string
			// if there is an id
			if (querySections.length === 2) {
				// take out the element to append
				elementToAppend = querySections[0]
				// split it by classes
				querySections = querySections[1].split('.')
				// the first string is the id
				id = querySections[0]
			} else {
				querySections = query.split('.')
				elementToAppend = querySections[0]
			}

			return parent
				.append(elementToAppend)
				.attr('id', id)
				.attr('class', querySections.slice(1).join(' '))
		}

		return selection
	}

	protected mainContainer: HTMLDivElement
	protected width: string
	protected height: string

	init() {
		// Initialize chart ID
		this.initializeID()

		// Add width & height to the chart holder if necessary, and add a classname
		this.styleHolderElement()

		this.addMainContainer()

		if (this.model.getOptions().resizable) {
			this.addResizeListener()
		}

		this.addHolderListeners()

		this.handleFullscreenChange()
	}

	getChartID() {
		return this.chartID
	}

	generateElementIDString(originalID: string | number) {
		return `chart-${this.chartID}-${originalID}`
	}

	private initializeID() {
		this.chartID = Math.floor((1 + Math.random()) * 0x1000000000000).toString(16)
	}

	addMainContainer() {
		const options = this.model.getOptions()
		const chartsprefix = getProperty(options, 'style', 'prefix')

		const mainContainer = select(this.getHolder())
			.append('div')
			.classed(`${carbonPrefix}--${chartsprefix}--chart-wrapper`, true)
			.attr('id', `chart-${this.getChartID()}`)
			.style('height', '100%')
			.style('width', '100%')

		mainContainer.append('g').attr('class', CSS_VERIFIER_ELEMENT_CLASSNAME)

		this.mainContainer = mainContainer.node()
	}

	update() {
		this.styleHolderElement()
	}

	styleHolderElement() {
		const holderElement = this.getHolder() as HTMLElement

		// In order for resize events to not clash with these updates
		// We'll check if the width & height values passed in options
		// Have changed, before setting them to the holder
		const { width, height, theme } = this.model.getOptions()
		if (width !== this.width) {
			// Apply formatted width attribute to chart
			holderElement.style.width = width

			this.width = width
		}

		if (height !== this.height) {
			// Apply formatted width attribute to chart
			holderElement.style.height = height

			this.height = height
		}

		// Add class to chart holder
		select(this.getHolder())
			.classed(`${carbonPrefix}--chart-holder`, true)
			.attr('data-carbon-theme', theme)
	}

	getHolder() {
		return this.model.get('holder')
	}

	exportToJPG() {
		const self = this
		const options = this.model.getOptions()

		const holder = this.getHolder()
		const holderSelection = select(holder)
		holderSelection.classed('filled', true)

		toJpeg(this.getMainContainer(), {
			quality: 1,
			// Remove toolbar
			filter: (node: any) => {
				if (node.classList && node.classList.contains('cds--cc--toolbar')) {
					return false
				}

				return true
			}
		}).then(function (dataUrl: string) {
			let fileName = 'myChart'
			const customFilename = getProperty(options, 'fileDownload', 'fileName')

			if (typeof customFilename === 'function') {
				fileName = customFilename('jpg')
			} else if (typeof customFilename === 'string') {
				fileName = customFilename
			}

			self.services.files?.downloadImage(dataUrl, `${fileName}.jpg`)

			holderSelection.classed('filled', false)
		})
	}

	exportToPNG() {
		const self = this
		const options = this.model.getOptions()

		const holder = this.getHolder()
		const holderSelection = select(holder)
		holderSelection.classed('filled', true)

		toPng(this.getMainContainer(), {
			quality: 1,
			// Remove toolbar
			filter: (node: HTMLElement) => {
				if (node.classList && node.classList.contains('cds--cc--toolbar')) {
					return false
				}

				return true
			}
		})
			.then(function (dataUrl: string) {
				let fileName = 'myChart'
				const customFilename = getProperty(options, 'fileDownload', 'fileName')

				if (typeof customFilename === 'function') {
					fileName = customFilename('png')
				} else if (typeof customFilename === 'string') {
					fileName = customFilename
				}

				self.services.files?.downloadImage(dataUrl, `${fileName}.png`)

				holderSelection.classed('filled', false)
			})
			.catch(function (error: Error) {
				console.error('oops, something went wrong!', error)
			})
	}

	isFullScreenMode() {
		return select(this.getHolder()).classed('fullscreen')
	}

	toggleFullscreen() {
		const holder = this.getHolder()
		const holderSelection = select(holder)

		const isFullScreen = holderSelection.classed('fullscreen')

		if (
			isFullScreen &&
			(document.fullscreenElement ||
				document['webkitFullscreenElement'] ||
				document['mozFullScreenElement'] ||
				document['msFullscreenElement'])
		) {
			// Call the correct function depending on the browser
			if (document.exitFullscreen) {
				document.exitFullscreen()
			} else if (document['webkitExitFullscreen']) {
				document['webkitExitFullscreen']()
			} else if (document['mozCancelFullScreen']) {
				document['mozCancelFullScreen']()
			} else if (document['msExitFullscreen']) {
				document['msExitFullscreen']()
			}
		} else {
			// Call the correct function depending on the browser
			if (holder.requestFullscreen) {
				holder.requestFullscreen()
			} else if (holder.webkitRequestFullscreen) {
				holder.webkitRequestFullscreen()
			} else if (holder.mozRequestFullScreen) {
				holder.mozRequestFullScreen()
			} else if (holder.msRequestFullscreen) {
				holder.msRequestFullscreen()
			}
		}
	}

	handleFullscreenChange() {
		document.addEventListener('fullscreenchange', () => {
			const holderSelection = select(this.getHolder())
			const isFullScreen = holderSelection.classed('fullscreen')

			// Toggle the `fullscreen` classname
			holderSelection.classed('fullscreen', !isFullScreen)
		})
	}

	setSVGMaxHeight() {
		// if there is a set height on the holder, leave the chart svg height at 100%
		if (!this.model.getOptions().height) {
			const { height: chartHeight } = DOMUtils.getSVGElementSize(
				select(this.mainContainer) as any,
				{
					useBBox: true
				}
			)
			const chartSVGSelector = select(this.mainContainer).attr('class')
			const children = select(this.mainContainer).selectAll(`.${chartSVGSelector} > svg`)

			// get the height of the children SVGs (spacers, titles, etc)
			let childrenHeight = 0
			children.nodes().forEach(function (childSVG) {
				childrenHeight += Number(
					DOMUtils.getSVGElementSize(select<SVGGraphicsElement, any>(childSVG as any), {
						useBBox: true
					}).height
				)
			})

			// set the chart svg height to the children height
			// forcing the chart not to take up any more space than it requires
			childrenHeight <= chartHeight
				? select(this.mainContainer).attr('height', childrenHeight)
				: select(this.mainContainer).attr('height', '100%')
		}
	}

	getMainContainer() {
		return this.mainContainer
	}

	addHolderListeners() {
		const holder = this.getHolder()

		if (!holder) {
			return
		}

		select(holder)
			.on('mouseover', () => {
				// Dispatch event
				this.services.events?.dispatchEvent(Events.Chart.MOUSEOVER)
			})
			.on('mouseout', () => {
				// Dispatch event
				this.services.events?.dispatchEvent(Events.Chart.MOUSEOUT)
			})
	}

	addResizeListener() {
		const holder = this.getHolder()

		if (!holder) {
			return
		}

		// Grab current dimensions of the chart holder
		let containerWidth = holder.clientWidth
		let containerHeight = holder.clientHeight

		// The resize callback function
		const resizeCallback = debounce(() => {
			if (!holder) {
				return
			}

			if (
				Math.abs(containerWidth - holder.clientWidth) > 1 ||
				Math.abs(containerHeight - holder.clientHeight) > 1
			) {
				containerWidth = holder.clientWidth
				containerHeight = holder.clientHeight

				this.services.events?.dispatchEvent(Events.Chart.RESIZE)
			}
		}, 12.5)

		// Observe the behaviour of resizing on the holder
		const resizeObserver = new ResizeObserver(resizeCallback)
		resizeObserver.observe(holder)
	}
}
