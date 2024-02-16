import { arc, select } from 'd3'
import { clamp } from 'lodash-es'
import { getProperty } from '@/tools'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import {
	Events,
	GaugeTypes,
	ArrowDirections,
	ColorClassNameTypes,
	Alignments,
	RenderTypes
} from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'

// arrow paths for delta
const ARROW_UP_PATH_STRING = '4,10 8,6 12,10'
const ARROW_DOWN_PATH_STRING = '12,6 8,10 4,6'

export class Gauge extends Component {
	type = 'gauge'
	renderType = RenderTypes.SVG

	// We need to store our arcs so that addEventListeners() can access them
	arc: any
	backgroundArc: any

	getValue(): number {
		const data = this.model.getData()
		const value = data.find((d: any) => d.group === 'value')?.value ?? null
		return value
	}

	getValueRatio(): number {
		const value = clamp(this.getValue(), 0, 100)
		return value / 100
	}

	getDelta(): number {
		const data = this.model.getData()
		const delta = data.find((d: any) => d.group === 'delta')?.value ?? null
		return delta
	}

	getArcRatio(): number {
		const options = this.getOptions()
		const type = getProperty(options, 'gauge', 'type')
		const arcRatio = type === GaugeTypes.FULL ? 1 : 0.5
		return arcRatio
	}

	getArcSize(): number {
		return this.getArcRatio() * Math.PI * 2
	}

	getStartAngle(): number {
		const arcSize = this.getArcSize()
		if (arcSize === 2 * Math.PI) {
			return 0
		}
		return -arcSize / 2
	}

	// use provided arrow direction or default to using the delta
	getArrow(delta: any): string {
		const options = this.getOptions()
		const arrowDirection = getProperty(options, 'gauge', 'deltaArrow', 'direction')

		switch (arrowDirection) {
			case ArrowDirections.UP:
				return ARROW_UP_PATH_STRING
			case ArrowDirections.DOWN:
				return ARROW_DOWN_PATH_STRING
			default:
				return delta > 0 ? ARROW_UP_PATH_STRING : ARROW_DOWN_PATH_STRING
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = true) {
		const svg = this.getComponentContainer().attr('width', '100%').attr('height', '100%')
		const options = this.getOptions()

		const value = this.getValue()
		const valueRatio = this.getValueRatio()
		const arcSize = this.getArcSize()

		// angles for drawing the gauge
		const startAngle = this.getStartAngle()
		const rotationAngle = valueRatio * arcSize
		const currentAngle = startAngle + rotationAngle
		const endAngle = startAngle + arcSize

		// Compute the outer radius needed
		const radius = this.computeRadius()
		const innerRadius = this.getInnerRadius()

		// draw the container and arc
		this.backgroundArc = arc()
			.innerRadius(innerRadius)
			.outerRadius(radius)
			.startAngle(currentAngle)
			.endAngle(endAngle)

		this.arc = arc()
			.innerRadius(innerRadius)
			.outerRadius(radius)
			.startAngle(startAngle)
			.endAngle(currentAngle)

		// draw the container
		DOMUtils.appendOrSelect(svg, 'path.arc-background').attr('d', this.backgroundArc)

		// Add data arc
		const arcValue = svg.selectAll('path.arc-foreground').data([value])
		const arcEnter = arcValue.enter().append('path')

		arcEnter
			.merge(arcValue as any)
			.attr(
				'class',
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: 'value',
					originalClassName: 'arc-foreground'
				})
			)
			.style('fill', () => getProperty(this.getOptions(), 'color', 'scale', 'value'))
			.attr('d', this.arc)
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'value')
			.attr('aria-label', (d: any) => d)

		// draw the value and delta to the center
		this.drawValueNumber()
		this.drawDelta()

		arcValue.exit().remove()

		const alignment = getProperty(options, 'gauge', 'alignment')

		const { width } = DOMUtils.getSVGElementSize(this.getParent() as any, {
			useAttrs: true
		})

		// Position gauge
		let gaugeTranslateX = radius
		if (alignment === Alignments.CENTER) {
			gaugeTranslateX = width / 2
		} else if (alignment === Alignments.RIGHT) {
			gaugeTranslateX = width - radius
		}
		svg.attr('x', gaugeTranslateX).attr('y', radius)

		// Add event listeners
		this.addEventListeners()
	}

	/**
	 * draws the value number associated with the Gauge component in the center
	 */
	drawValueNumber() {
		const svg = this.getComponentContainer()
		const options = this.getOptions()

		const arcType = getProperty(options, 'gauge', 'type')
		const value = this.getValue()
		const delta = this.getDelta()

		// Sizing and positions relative to the radius
		const radius = this.computeRadius()

		const valueFontSize = getProperty(options, 'gauge', 'valueFontSize')
		// if there is a delta, use the size to center the numbers, otherwise center the valueNumber
		const deltaFontSize = getProperty(options, 'gauge', 'deltaFontSize')

		const numberSpacing = getProperty(options, 'gauge', 'numberSpacing')

		const showPercentageSymbol = getProperty(options, 'gauge', 'showPercentageSymbol')

		// circular gauge without delta should have valueNumber centered
		let numbersYPosition = 0
		if (arcType === GaugeTypes.FULL && !delta) {
			numbersYPosition = deltaFontSize(radius)
		} else if (arcType === GaugeTypes.SEMI && delta) {
			// semi circular gauge we want the numbers aligned to the chart container
			numbersYPosition = -(deltaFontSize(radius) + numberSpacing)
		}

		// Add the numbers at the center
		const numbersGroup = DOMUtils.appendOrSelect(svg, 'g.gauge-numbers').attr(
			'transform',
			`translate(0, ${numbersYPosition})`
		)

		const fontSize = valueFontSize(radius)
		// Add the big number
		const valueNumberGroup = DOMUtils.appendOrSelect(numbersGroup, 'g.gauge-value-number')
		const { code: localeCode, number: localeNumberFormatter } = getProperty(options, 'locale')
		const numberFormatter = getProperty(options, 'gauge', 'numberFormatter')
		const valueNumber = valueNumberGroup.selectAll('text.gauge-value-number').data([value])

		valueNumber
			.enter()
			.append('text')
			.attr('class', 'gauge-value-number')
			.merge(valueNumber as any)
			.style('font-size', `${fontSize}px`)
			.attr('text-anchor', 'middle')
			.text((d: any) => localeNumberFormatter(Number(numberFormatter(d)), localeCode))

		// add the percentage symbol beside the valueNumber
		const { width: valueNumberWidth } = DOMUtils.getSVGElementSize(
			DOMUtils.appendOrSelect(svg, 'text.gauge-value-number'),
			{ useBBox: true }
		)

		const symbolFontSize = fontSize / 2
		const gaugeSymbol = showPercentageSymbol ? '%' : ''
		const symbol = DOMUtils.appendOrSelect(valueNumberGroup, 'text.gauge-value-symbol')
			.style('font-size', `${symbolFontSize}px`)
			.attr('x', valueNumberWidth / 2)
			.text(gaugeSymbol)

		const { width: symbolWidth, height: symbolHeight } = DOMUtils.getSVGElementSize(symbol, {
			useBBox: true
		})

		// adjust the symbol to superscript using the bbox instead of the font-size cause
		// we want to align the actual character to the value number
		symbol.attr('y', `-${symbolHeight / 2}px`)

		// move the value group depending on the symbol's drawn size
		valueNumberGroup.attr('transform', `translate(-${symbolWidth / 2}, 0)`) // Optical centering for the presence of the smaller % symbol
	}

	/**
	 * adds the delta number for the gauge
	 */
	drawDelta() {
		const self = this
		const svg = this.getComponentContainer()
		const options = this.getOptions()
		const delta = this.getDelta()
		const { code: localeCode, number: localeNumberFormatter } = getProperty(options, 'locale')
		if (!delta) {
			const deltaGroup = svg.select('g.gauge-delta')

			if (!deltaGroup.empty()) {
				deltaGroup.remove()
			}
		} else {
			// Sizing and positions relative to the radius
			const radius = this.computeRadius()
			const deltaFontSize = delta ? getProperty(options, 'gauge', 'deltaFontSize') : () => 0

			// use numberFormatter here only if there is a delta supplied
			const numberFormatter = delta
				? getProperty(options, 'gauge', 'numberFormatter')
				: (): any => null

			const arrowSize = getProperty(options, 'gauge', 'deltaArrow', 'size')
			const numberSpacing = getProperty(options, 'gauge', 'numberSpacing')

			const showPercentageSymbol = getProperty(options, 'gauge', 'showPercentageSymbol')

			const numbersGroup = DOMUtils.appendOrSelect(svg, 'g.gauge-numbers')

			// Add the smaller number of the delta
			const deltaGroup = DOMUtils.appendOrSelect(numbersGroup, 'g.gauge-delta').attr(
				'transform',
				`translate(0, ${deltaFontSize(radius) + numberSpacing})`
			)

			const deltaNumber = DOMUtils.appendOrSelect(deltaGroup, 'text.gauge-delta-number')
			const gaugeSymbol = showPercentageSymbol ? '%' : ''

			deltaNumber.data(delta === null ? [] : [delta])

			deltaNumber
				.enter()
				.append('text')
				.classed('gauge-delta-number', true)
				.merge(deltaNumber)
				.attr('text-anchor', 'middle')
				.style('font-size', `${deltaFontSize(radius)}px`)
				.text(
					(d: any) =>
						`${localeNumberFormatter(Number(numberFormatter(d)), localeCode)}${gaugeSymbol}`
				)

			// Add the caret for the delta number
			const { width: deltaNumberWidth } = DOMUtils.getSVGElementSize(
				DOMUtils.appendOrSelect(svg, '.gauge-delta-number'),
				{ useBBox: true }
			)

			// check if delta arrow is disabled
			const arrowEnabled = getProperty(options, 'gauge', 'deltaArrow', 'enabled')

			const deltaArrow = deltaGroup
				.selectAll('svg.gauge-delta-arrow')
				.data(delta !== null && arrowEnabled ? [delta] : [])

			deltaArrow
				.enter()
				.append('svg')
				.merge(deltaArrow as any)
				.attr('class', 'gauge-delta-arrow')
				.attr('x', -arrowSize(radius) - deltaNumberWidth / 2)
				.attr('y', -arrowSize(radius) / 2 - deltaFontSize(radius) * 0.35)
				.attr('width', arrowSize(radius))
				.attr('height', arrowSize(radius))
				.attr('viewBox', '0 0 16 16')
				/*
				 * using .each() here to ensure that the below function runs
				 * after svg.gauge-delta-arrow has been mounted onto the DOM
				 */
				.each(function () {
					const deltaArrowSelection = select(this)

					// Needed to correctly size SVG in Firefox
					DOMUtils.appendOrSelect(deltaArrowSelection, 'rect.gauge-delta-arrow-backdrop')
						.attr('width', '16')
						.attr('height', '16')
						.attr('fill', 'none')

					// Draw the arrow with status
					const status = getProperty(options, 'gauge', 'status')
					DOMUtils.appendOrSelect(deltaArrowSelection, 'polygon.gauge-delta-arrow')
						.attr('class', status !== null ? `gauge-delta-arrow status--${status}` : '')
						.attr('points', self.getArrow(delta))
				})

			deltaArrow.exit().remove()
			deltaNumber.exit().remove()
		}
	}

	getInnerRadius() {
		// Compute the outer radius needed
		const radius = this.computeRadius()
		const arcWidth = getProperty(this.getOptions(), 'gauge', 'arcWidth')
		return radius - arcWidth
	}

	addEventListeners() {
		const self = this
		this.parent
			.selectAll('path.arc-foreground')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEOVER, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEMOVE, {
					event,
					element: hoveredElement,
					datum
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum
				})
			})
	}

	// Helper functions
	protected computeRadius() {
		const options = this.getOptions()
		const arcType = getProperty(options, 'gauge', 'type')

		const { width, height } = DOMUtils.getSVGElementSize(this.parent as any, {
			useAttrs: true
		})
		const radius =
			arcType === GaugeTypes.SEMI ? Math.min(width / 2, height) : Math.min(width / 2, height / 2)

		return radius
	}
}
