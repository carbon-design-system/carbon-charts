import { axisBottom, interpolateNumber, quantize, scaleBand, scaleLinear } from 'd3'
import { isEmpty } from 'lodash-es'
import { getProperty } from '@/tools'
import { legend as legendConfigs } from '@/configuration'
import { ColorLegendType, Events, RenderTypes } from '@/interfaces/enums'
import { Legend } from './legend'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { getDomain } from '@/services/color-scale-utils'
import type { ChartModel } from '@/model'

export class ColorScaleLegend extends Legend {
	type = 'color-legend'
	renderType = RenderTypes.SVG

	private gradient_id = `gradient-id-${Math.floor(Math.random() * 99999999999)}`
	private chartType: string

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs)
		this.chartType = configs.chartType
	}

	init() {
		// Highlight correct circle on legend item hovers
		if (this.chartType === 'heatmap') {
			const eventsFragment = this.services.events
			eventsFragment.addEventListener(Events.Axis.RENDER_COMPLETE, this.handleAxisCompleteEvent)
		}
	}

	// Position legend after axis have rendered
	handleAxisCompleteEvent = () => {
		const svg = this.getComponentContainer()

		const { width } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true
		})

		const isDataLoading = getProperty(this.getOptions(), 'data', 'loading')

		if (width > legendConfigs.color.barWidth && !isDataLoading) {
			const title = getProperty(this.getOptions(), 'heatmap', 'colorLegend', 'title')

			const { cartesianScales } = this.services

			// Get axis width & start/end positions
			const mainXScale = cartesianScales.getMainXScale()
			const xDimensions = mainXScale.range()

			// Align legend with the axis
			if (xDimensions[0] > 1) {
				svg.select('g.legend').attr('transform', `translate(${xDimensions[0]}, 0)`)

				if (title) {
					const { width: textWidth } = DOMUtils.getSVGElementSize(
						svg.select('g.legend-title').select('text'),
						{ useBBox: true }
					)

					// D3 moves the LEFT y-axis labels by 9
					const availableSpace = xDimensions[0] - textWidth - 9

					// If space is available, align the label with the axis labels
					if (availableSpace > 1) {
						svg.select('g.legend-title').attr('transform', `translate(${availableSpace}, 0)`)
					} else {
						// Move the legend down by 16 pixels to display legend text on top
						svg.select('g.legend').attr('transform', `translate(${xDimensions[0]}, 16)`)

						// Align legend title with start of axis
						svg.select('g.legend-title').attr('transform', `translate(${xDimensions[0]}, 0)`)
					}
				}
			}
		} else {
			// Default state
			svg.select('g.legend-title').attr('transform', `translate(0, 0)`)
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = false) {
		const options = this.getOptions()
		const svg = this.getComponentContainer()
		const { width } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true
		})

		const customColors = getProperty(options, 'color', 'gradient', 'colors')

		const colorScaleType = getProperty(options, this.chartType, 'colorLegend', 'type')

		let colorPairingOption = getProperty(options, 'color', 'pairing', 'option')

		const title = getProperty(options, 'heatmap', 'colorLegend', 'title')

		// Clear DOM if loading
		const isDataLoading = getProperty(this.getOptions(), 'data', 'loading')

		if (isDataLoading) {
			svg.html('')
			return
		}

		const customColorsEnabled = !isEmpty(customColors)
		const domain = getDomain(this.model.getDisplayData())

		const useDefaultBarWidth = !(width <= legendConfigs.color.barWidth)
		const barWidth = useDefaultBarWidth ? legendConfigs.color.barWidth : width

		const legendGroupElement = DOMUtils.appendOrSelect(svg, 'g.legend')
		const axisElement = DOMUtils.appendOrSelect(legendGroupElement, 'g.legend-axis')

		// Render title if it exists
		if (title) {
			const legendTitleGroup = DOMUtils.appendOrSelect(svg, 'g.legend-title')
			const legendTitle = DOMUtils.appendOrSelect(legendTitleGroup, 'text')
			legendTitle.text(title).attr('dy', '0.7em')

			// Move the legend down by 16 pixels to display legend text on top
			legendGroupElement.attr('transform', `translate(0, 16)`)
		}

		// If domain consists of negative and positive values, use diverging palettes
		const colorScheme = domain[0] < 0 && domain[1] > 0 ? 'diverge' : 'mono'

		// Use default color pairing options if not in defined range
		if (colorPairingOption < 1 && colorPairingOption > 4 && colorScheme === 'mono') {
			colorPairingOption = 1
		} else if (colorPairingOption < 1 && colorPairingOption > 2 && colorScheme === 'diverge') {
			colorPairingOption = 1
		}

		let colorPairing = []
		// Carbon charts has 11 colors for a single monochromatic palette & 17 for a divergent palette
		const colorGroupingLength = colorScheme === 'diverge' ? 17 : 11

		if (!customColorsEnabled) {
			// Add class names to list and the amount based on the color scheme
			for (let i = 1; i < colorGroupingLength + 1; i++) {
				colorPairing.push(
					colorScaleType === ColorLegendType.LINEAR
						? `stop-color-${colorScheme}-${colorPairingOption}-${i}`
						: `fill-${colorScheme}-${colorPairingOption}-${i}`
				)
			}
		} else {
			// Use custom colors
			colorPairing = customColors
		}

		// Generate equal chunks between range to act as ticks
		const interpolator = interpolateNumber(domain[0], domain[1])
		const quant = quantize(interpolator, 3)

		// Create scale & ticks
		const linearScale = scaleLinear().domain(domain).range([0, barWidth])
		const legendAxis = axisBottom(linearScale).tickSize(0).tickValues(quant)

		//translating ticks into given locale language
		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')
		legendAxis.tickFormat(d => numberFormatter(d, localeCode))

		let rangeStart: any // avoid unexpected lexical declaration in case block
		switch (colorScaleType) {
			case ColorLegendType.LINEAR:
				this.drawLinear(colorPairing, legendGroupElement, barWidth)
				break
			case ColorLegendType.QUANTIZE:
				rangeStart = this.drawQuantize(
					colorPairing,
					colorScheme,
					customColorsEnabled,
					legendGroupElement,
					barWidth
				)
				// Using range provided by drawQuantize for alignment purposes
				linearScale.range([rangeStart, barWidth])
				break
			default:
				throw Error('Entered color legend type is not supported.')
		}

		// Align axes at the bottom of the rectangle and delete the domain line
		axisElement
			.attr('transform', `translate(0,${legendConfigs.color.axisYTranslation})`)
			.call(legendAxis)

		// Remove auto generated axis bottom line
		axisElement.select('.domain').remove()

		// Translate first/last axis tick if barWidth equals chart width
		// Ensures text is not clipped when default bar width (300px) is not used
		axisElement
			.select('g.tick:last-of-type text')
			.style('text-anchor', useDefaultBarWidth ? 'middle' : 'end')
		axisElement
			.select('g.tick:first-of-type text')
			.style(
				'text-anchor',
				useDefaultBarWidth && this.chartType !== 'choropleth' ? 'middle' : 'start'
			)
	}

	// Renders gradient legend
	drawLinear(colorPairing: any, legendGroupElement: any, barWidth: any) {
		const stopLengthPercentage = 100 / (colorPairing.length - 1)

		// Generate the gradient
		const linearGradient = DOMUtils.appendOrSelect(legendGroupElement, 'linearGradient')
		// Rendering gradient
		linearGradient
			.attr('id', `${this.gradient_id}-legend`)
			.selectAll('stop')
			.data(colorPairing)
			.enter()
			.append('stop')
			.attr('offset', (_: any, i: number) => `${i * stopLengthPercentage}%`)
			.attr('class', (_: any, i: number) => colorPairing[i])
			.attr('stop-color', (d: string) => d)

		// Create the legend container
		const rectangle = DOMUtils.appendOrSelect(legendGroupElement, 'rect')
		rectangle
			.attr('width', barWidth)
			.attr('height', legendConfigs.color.barHeight)
			.style('fill', `url(#${this.gradient_id}-legend)`)
	}

	/**
	 * Renders quantized legend
	 * @returns number (range start)
	 */
	drawQuantize(
		colorPairing: any,
		colorScheme: any,
		customColorsEnabled: any,
		legendGroupElement: any,
		barWidth: any
	) {
		// If divergent && non-custom color, remove 0/white from being displayed
		if (!customColorsEnabled && colorScheme === 'diverge') {
			colorPairing.splice(colorPairing.length / 2, 1)
		}

		const colorScaleBand = scaleBand().domain(colorPairing).range([0, barWidth])

		// Render the quantized rectangles
		const rectangle = DOMUtils.appendOrSelect(legendGroupElement, 'g.quantized-rect')

		rectangle
			.selectAll('rect')
			.data(colorScaleBand.domain())
			.join('rect')
			.attr('x', (d: string) => colorScaleBand(d))
			.attr('y', 0)
			.attr('width', Math.max(0, colorScaleBand.bandwidth() - 1))
			.attr('height', legendConfigs.color.barHeight)
			.attr('class', (d: string) => d)
			.attr('fill', (d: string) => d)

		return (!customColorsEnabled && colorScheme) === 'mono' ? colorScaleBand.bandwidth() - 1 : 0
	}

	destroy() {
		if (this.chartType === 'heatmap') {
			// Remove legend listeners
			const eventsFragment = this.services.events
			eventsFragment.removeEventListener(Events.Axis.RENDER_COMPLETE, this.handleAxisCompleteEvent)
		}
	}
}
