import {
	axisBottom,
	axisLeft,
	axisRight,
	axisTop,
	type AxisScale,
	select,
	type Selection as D3Selection
} from 'd3'
import { clamp } from 'lodash-es'
import { axis as axisConfigs } from '@/configuration'
import { getProperty, getTranslationValues, truncateLabel } from '@/tools'
import { Component } from '@/components/component'
import {
	AxisPositions,
	Events,
	ScaleTypes,
	TruncationTypes,
	AxisTitleOrientations,
	RenderTypes,
	TickRotations
} from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'
import type { ChartModel } from '@/model/model'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { computeTimeIntervalName, formatTick, isTickPrimary } from '@/services/time-series'
import { sanitizeText } from '@/utils/sanitizeHtml'

export class Axis extends Component {
	type = 'axes'
	renderType = RenderTypes.SVG

	margins: any
	truncation = {
		[AxisPositions.LEFT]: false,
		[AxisPositions.RIGHT]: false,
		[AxisPositions.TOP]: false,
		[AxisPositions.BOTTOM]: false
	}

	scale: AxisScale<any>
	scaleType: ScaleTypes

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs)

		if (configs) {
			this.configs = configs
		}

		this.margins = this.configs.margins
	}

	render(animate = true) {
		const { position: axisPosition }: { position: AxisPositions } = this.configs
		const options = this.getOptions()
		const isAxisVisible = getProperty(options, 'axes', axisPosition, 'visible')

		const svg = this.getComponentContainer() as D3Selection<
			SVGGraphicsElement,
			any,
			HTMLElement,
			any
		>
		const { width, height } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true
		})

		// Add axis into the parent
		const container = DOMUtils.appendOrSelect(svg, `g.axis.${axisPosition}`)
		let startPosition: number, endPosition: number
		if (axisPosition === AxisPositions.BOTTOM || axisPosition === AxisPositions.TOP) {
			startPosition = this.configs.axes[AxisPositions.LEFT] ? this.margins.left : 0
			endPosition = this.configs.axes[AxisPositions.RIGHT] ? width - this.margins.right : width
		} else {
			startPosition = height - this.margins.bottom
			endPosition = this.margins.top
		}

		// Grab the scale off of the Scales service
		if (!this.services.cartesianScales) throw new Error('Services cartesianScales undefined')
		const scale = this.services.cartesianScales.getScaleByPosition(axisPosition) as any

		if (this.scaleType === ScaleTypes.LABELS || this.scaleType === ScaleTypes.LABELS_RATIO) {
			scale.rangeRound([startPosition, endPosition])
		} else {
			scale.range([startPosition, endPosition])
		}

		// Identify the corresponding d3 axis function
		let axisFunction: any
		switch (axisPosition) {
			case AxisPositions.LEFT:
				axisFunction = axisLeft
				break
			case AxisPositions.BOTTOM:
				axisFunction = axisBottom
				break
			case AxisPositions.RIGHT:
				axisFunction = axisRight
				break
			case AxisPositions.TOP:
				axisFunction = axisTop
				break
		}

		container.attr('aria-label', `${axisPosition} axis`)
		const axisRefExists = !container.select(`g.ticks`).empty()
		let axisRef = DOMUtils.appendOrSelect(container, `g.ticks`)
		if (!axisRefExists) {
			axisRef.attr('role', `${Roles.GRAPHICS_OBJECT} ${Roles.GROUP}`)
			axisRef.attr('aria-label', `${axisPosition} ticks`)
		}

		// We draw the invisible axis because of the async nature of d3 transitions
		// To be able to tell the final width & height of the axis when initiaing the transition
		// The invisible axis is updated instantly and without a transition
		const invisibleAxisRef = DOMUtils.appendOrSelect(container, `g.ticks.invisible`)
			.style('opacity', '0')
			.style('pointer-events', 'none')
			.attr('aria-hidden', true)
			.attr('aria-label', `invisible ${axisPosition} ticks`)

		const axisOptions = getProperty(options, 'axes', axisPosition)
		const isTimeScaleType =
			this.scaleType === ScaleTypes.TIME || axisOptions.scaleType === ScaleTypes.TIME
		const isVerticalAxis =
			axisPosition === AxisPositions.LEFT || axisPosition === AxisPositions.RIGHT

		// if zoomDomain is available, scale type is time, and axis position isBOTTOM or TOP
		// update scale domain to zoomDomain.
		const zoomDomain = this.model.get('zoomDomain')
		if (zoomDomain && isTimeScaleType && !isVerticalAxis) {
			scale.domain(zoomDomain)
		}

		if (!isAxisVisible) {
			axisRef.attr('aria-hidden', true)
			return
		}

		const axisScaleType = getProperty(axisOptions, 'scaleType')
		const isDataLoading = getProperty(options, 'data', 'loading')
		const numberOfTicksProvided = getProperty(axisOptions, 'ticks', 'number')

		// user can provide custom ticks to be displayed
		// ticks need to be in the domain of the axis data
		const userProvidedTickValues = getProperty(axisOptions, 'ticks', 'values')

		// get user provided custom values for truncation
		const truncationType = getProperty(axisOptions, 'truncation', 'type')
		const truncationThreshold = getProperty(axisOptions, 'truncation', 'threshold')
		const truncationNumCharacter = getProperty(axisOptions, 'truncation', 'numCharacter')

		const isNumberOfTicksProvided = numberOfTicksProvided !== null
		const timeScaleOptions = getProperty(options, 'timeScale')

		// Append to DOM a fake tick to get the right computed font height
		const fakeTick = DOMUtils.appendOrSelect(invisibleAxisRef, `g.tick`)
		const fakeTickText = DOMUtils.appendOrSelect(fakeTick, `text`).text('0')
		const tickHeight = DOMUtils.getSVGElementSize(fakeTickText.node(), {
			useBBox: true
		}).height
		fakeTick.remove()

		const scaleType = this.scaleType || axisOptions.scaleType || ScaleTypes.LINEAR

		// Initialize axis object
		const axis = axisFunction(scale).tickSizeOuter(0)

		if (scale.ticks) {
			let numberOfTicks: number

			if (isNumberOfTicksProvided) {
				numberOfTicks = numberOfTicksProvided
			} else {
				numberOfTicks = axisConfigs.ticks.number
				if (isVerticalAxis) {
					// Set how many ticks based on height
					numberOfTicks = this.getNumberOfFittingTicks(
						height,
						tickHeight,
						axisConfigs.ticks.verticalSpaceRatio
					)
				}
			}

			// scale continuous
			// remove 0 ticks for skeleton
			if (scale.ticks().length === 1 && scale.ticks()[0] === 0) {
				numberOfTicks = 0
			}

			axis.ticks(numberOfTicks)

			if (isTimeScaleType) {
				if (!scale.ticks(numberOfTicks).length) {
					axis.tickValues([])
				} else {
					const addSpaceOnEdges = getProperty(options, 'timeScale', 'addSpaceOnEdges')

					const customDomain = getProperty(options, 'axes', axisPosition, 'domain')

					// scale.nice() will change scale domain which causes extra space near chart edge
					// so use another scale instance to avoid impacts to original scale
					const tempScale = scale.copy()
					if (addSpaceOnEdges && !customDomain) {
						tempScale.nice(numberOfTicks)
					}
					const tickValues = tempScale.ticks(numberOfTicks)

					// Remove labels on the edges
					// If there are more than 2 labels to show
					if (addSpaceOnEdges && tickValues.length > 2 && !customDomain) {
						tickValues.splice(tickValues.length - 1, 1)
						tickValues.splice(0, 1)
					}

					axis.tickValues(tickValues)
				}
			}
		}

		// create the right ticks formatter
		let formatter: any
		const userProvidedFormatter = getProperty(axisOptions, 'ticks', 'formatter')
		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')
		if (isTimeScaleType) {
			const timeInterval = computeTimeIntervalName(
				axis.tickValues(),
				getProperty(options, 'timeScale', 'timeInterval')
			)

			if (userProvidedFormatter === null) {
				formatter = (t: number, i: number) =>
					formatTick(t, i, axis.tickValues(), timeInterval, timeScaleOptions, options.locale)
			} else {
				formatter = (t: number, i: number) => {
					const defaultFormattedValue = formatTick(
						t,
						i,
						axis.tickValues(),
						timeInterval,
						timeScaleOptions,
						options.locale
					)
					return userProvidedFormatter(t, i, defaultFormattedValue)
				}
			}
		} else {
			if (userProvidedFormatter === null) {
				if (scaleType === ScaleTypes.LINEAR) {
					formatter = (t: any) => numberFormatter(t, localeCode)
				}
			} else {
				formatter = userProvidedFormatter
			}
		}

		// Set ticks formatter
		axis.tickFormat(formatter)

		// prioritize using a custom array of values rather than number of ticks
		// if both are provided. custom tick values need to be within the domain of the scale
		const [lowerBound, upperBound] = this.services.cartesianScales
			.getScaleByPosition(axisPosition)
			.domain()
		let validTicks: any
		if (userProvidedTickValues) {
			if (isTimeScaleType) {
				// sanitize user-provided tick values
				userProvidedTickValues.forEach((userProvidedTickValue: any, i: number) => {
					if (userProvidedTickValue.getTime === undefined) {
						userProvidedTickValues[i] = new Date(userProvidedTickValue)
					}
				})

				// check the supplied ticks are within the time domain
				validTicks = userProvidedTickValues.filter((tick: any) => {
					const tickTimestamp = tick.getTime()
					return (
						tickTimestamp >= new Date(lowerBound).getTime() &&
						tickTimestamp <= new Date(upperBound).getTime()
					)
				})
			} else if (axisScaleType === ScaleTypes.LABELS) {
				const discreteDomain = this.services.cartesianScales
					.getScaleByPosition(axisPosition)
					.domain()
				validTicks = userProvidedTickValues.filter((tick: any) => discreteDomain.includes(tick))
			} else {
				// continuous scales
				validTicks = userProvidedTickValues.filter(
					(tick: any) => tick >= lowerBound && tick <= upperBound
				)
			}

			axis.tickValues(validTicks)
		}

		// Position and transition the axis
		switch (axisPosition) {
			case AxisPositions.LEFT:
				axisRef.attr('transform', `translate(${this.margins.left}, 0)`)
				break
			case AxisPositions.BOTTOM:
				axisRef.attr('transform', `translate(0, ${height - this.margins.bottom})`)
				break
			case AxisPositions.RIGHT:
				axisRef.attr('transform', `translate(${width - this.margins.right}, 0)`)
				break
			case AxisPositions.TOP:
				axisRef.attr('transform', `translate(0, ${this.margins.top})`)
				break
		}

		// Position the axis title
		// check that data exists, if they don't, doesn't show the title axis
		const isDataEmpty = this.model.isDataEmpty()
		if (axisOptions.title) {
			const axisTitleRef = DOMUtils.appendOrSelect(container, `text.axis-title`).html(
				isDataEmpty || isDataLoading ? '' : sanitizeText(axisOptions.title)
			)

			// vertical axes can have override for title orientation
			const titleOrientation = getProperty(axisOptions, 'titleOrientation')
			let titleHeight // avoid lexical declaration in case block
			switch (axisPosition) {
				case AxisPositions.LEFT:
					if (titleOrientation === AxisTitleOrientations.RIGHT) {
						axisTitleRef
							.attr('transform', 'rotate(90)')
							.attr('y', 0)
							.attr('x', scale.range()[0] / 2)
							.attr('dy', '-0.5em')
							.style('text-anchor', 'middle')
					} else {
						axisTitleRef
							.attr('transform', 'rotate(-90)')
							.attr('y', 0)
							.attr('x', -(scale.range()[0] / 2))
							.attr('dy', '0.75em')
							.style('text-anchor', 'middle')
					}
					break
				case AxisPositions.BOTTOM:
					axisTitleRef
						.attr(
							'transform',
							`translate(${this.margins.left / 2 + scale.range()[1] / 2}, ${height + 4})`
						)
						.style('text-anchor', 'middle')
					break
				case AxisPositions.RIGHT:
					if (titleOrientation === AxisTitleOrientations.LEFT) {
						axisTitleRef
							.attr('transform', 'rotate(-90)')
							.attr('y', width)
							.attr('x', -(scale.range()[0] / 2))
							.style('text-anchor', 'middle')
					} else {
						axisTitleRef
							.attr('transform', 'rotate(90)')
							.attr('y', -width)
							.attr('x', scale.range()[0] / 2)
							.attr('dy', '0.75em')
							.style('text-anchor', 'middle')
					}
					break
				case AxisPositions.TOP:
					titleHeight = DOMUtils.getSVGElementSize(axisTitleRef, {
						useBBox: true
					}).height

					axisTitleRef
						.attr(
							'transform',
							`translate(${this.margins.left / 2 + scale.range()[1] / 2}, ${titleHeight / 2})`
						)
						.style('text-anchor', 'middle')
					break
			}
		}

		// Apply new axis to the axis element
		if (isTimeScaleType) {
			const timeInterval = computeTimeIntervalName(
				axis.tickValues(),
				getProperty(options, 'timeScale', 'timeInterval')
			)

			const showDayName = timeScaleOptions.showDayName
			const axisRefSelection = axisRef

			if (animate) {
				axisRef = axisRef.transition().call((t: any) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'axis-update',
						animate
					})
				) as any
			}
			axisRef = axisRef.call(axis)

			// Manipulate tick labels to make bold those that are in long format
			const ticks = axisRefSelection
				.selectAll('.tick')
				.data(axis.tickValues(), scale)
				.order()
				.select('text')
			ticks.style('font-weight', (tick: number, i: number) => {
				return isTickPrimary(tick, i, axis.tickValues(), timeInterval, showDayName)
					? 'bold'
					: 'normal'
			})
		} else {
			if (!animate || !axisRefExists) {
				axisRef = axisRef.call(axis)
			} else {
				axisRef = axisRef
					.transition()
					.call((t: any) =>
						this.services.transitions.setupTransition({
							transition: t,
							name: 'axis-update',
							animate
						})
					)
					.call(axis) as any
			}
		}

		invisibleAxisRef.call(axis)

		if (axisPosition === AxisPositions.BOTTOM || axisPosition === AxisPositions.TOP) {
			let shouldRotateTicks = false
			// user could decide if tick rotation is required during zoom domain changing
			const tickRotation = getProperty(axisOptions, 'ticks', 'rotation')

			if (tickRotation === TickRotations.ALWAYS) {
				shouldRotateTicks = true
			} else if (tickRotation === TickRotations.NEVER) {
				shouldRotateTicks = false
			} else if (!tickRotation || tickRotation === TickRotations.AUTO) {
				// if the option is not set or set to AUTO

				// depending on if tick rotation is necessary by calculating space
				// If we're dealing with a discrete scale type
				// We're able to grab the spacing between the ticks
				if (scale.step) {
					const textNodes = invisibleAxisRef.selectAll('g.tick text').nodes() as any

					// If any ticks are any larger than the scale step size
					shouldRotateTicks = textNodes.some(
						(textNode: D3Selection<SVGGraphicsElement, any, Element, any>) =>
							DOMUtils.getSVGElementSize(textNode, {
								useBBox: true
							}).width >= scale.step()
					)
				} else {
					shouldRotateTicks = false

					const mockTextPiece = invisibleAxisRef.append('text').text('A')

					const averageLetterWidth = DOMUtils.getSVGElementSize(mockTextPiece.node() as any, {
						useBBox: true
					}).width as number

					let lastStartPosition: any

					// Find out whether any text nodes roughly collide
					invisibleAxisRef.selectAll('g.tick').each(function () {
						const selection = select(this)
						const xTransformation = parseFloat(getProperty(getTranslationValues(this as any), 'tx'))

						if (
							xTransformation !== null &&
							lastStartPosition + selection.text().length * averageLetterWidth * 0.8 >=
								xTransformation
						) {
							shouldRotateTicks = true
						}

						lastStartPosition = xTransformation
					})

					// Cleanup mock text piece
					mockTextPiece.remove()
				}
			}

			if (shouldRotateTicks) {
				if (!isNumberOfTicksProvided) {
					axis.ticks(
						this.getNumberOfFittingTicks(width, tickHeight, axisConfigs.ticks.horizontalSpaceRatio)
					)

					invisibleAxisRef.call(axis)
					axisRef.call(axis)
				}

				container
					.selectAll('g.ticks g.tick text')
					.attr('transform', `rotate(-45)`)
					.attr('text-anchor', axisPosition === AxisPositions.TOP ? 'start' : 'end')
			} else {
				container.selectAll('g.ticks g.tick text').attr('transform', null).attr('text-anchor', null)
			}
		}

		// we don't need to show axes on empty state and on skeleton state
		// because the Skeleton component draws them
		if (isDataLoading) {
			container.attr('opacity', 0)
		} else {
			container.attr('opacity', 1)
		}

		axisRef.selectAll('g.tick').attr('aria-label', (d: any) => d)

		invisibleAxisRef.selectAll('g.tick').attr('aria-label', (d: any) => d)

		// truncate the label if it's too long
		// only applies to discrete type
		if (
			truncationType !== TruncationTypes.NONE &&
			axisScaleType === ScaleTypes.LABELS &&
			!userProvidedTickValues
		) {
			const axisTickLabels = this.services.cartesianScales.getScaleDomain(axisPosition)
			if (axisTickLabels.length > 0) {
				const tick_html = svg.select(`g.axis.${axisPosition} g.ticks g.tick`).html()

				container.selectAll('g.ticks g.tick').html(tick_html)

				const self = this
				container
					.selectAll('g.tick text')
					.data(axisTickLabels)
					.text(function (d: any) {
						if (d.length > truncationThreshold) {
							self.truncation[axisPosition] = true
							return truncateLabel(d, truncationType, truncationNumCharacter)
						} else {
							return d
						}
					})

				this.getInvisibleAxisRef()
					.selectAll('g.tick text')
					.data(axisTickLabels)
					.text(function (d: any) {
						if (d.length > truncationThreshold) {
							return truncateLabel(d, truncationType, truncationNumCharacter)
						} else {
							return d
						}
					})

				container.selectAll('g.ticks').html(this.getInvisibleAxisRef().html())

				container.selectAll('g.tick text').data(axisTickLabels)
			}
		}
		// Add event listeners to elements drawn
		this.addEventListeners()
	}

	addEventListeners() {
		const svg = this.getComponentContainer()
		const { position: axisPosition } = this.configs
		const container = DOMUtils.appendOrSelect(svg, `g.axis.${axisPosition}`)
		const options = this.getOptions()
		const axisOptions = getProperty(options, 'axes', axisPosition)
		const axisScaleType = getProperty(axisOptions, 'scaleType')
		const truncationThreshold = getProperty(axisOptions, 'truncation', 'threshold')

		const self = this
		container
			.selectAll('g.tick text')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_MOUSEOVER, {
					event,
					element: select(this),
					datum
				})

				if (axisScaleType === ScaleTypes.LABELS && datum.length > truncationThreshold) {
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						hoveredElement: select(this),
						content: datum
					})
				}
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_MOUSEMOVE, {
					event,
					element: select(this),
					datum
				})
				if (axisScaleType === ScaleTypes.LABELS && datum.length > truncationThreshold) {
					self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
						event
					})
				}
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_MOUSEOUT, {
					event,
					element: select(this),
					datum
				})

				if (axisScaleType === ScaleTypes.LABELS) {
					self.services.events.dispatchEvent(Events.Tooltip.HIDE)
				}
			})
	}

	getInvisibleAxisRef() {
		const { position: axisPosition } = this.configs

		return this.getComponentContainer().select(`g.axis.${axisPosition} g.ticks.invisible`)
	}

	getTitleRef() {
		const { position: axisPosition } = this.configs

		return this.getComponentContainer().select(`g.axis.${axisPosition} text.axis-title`)
	}

	getNumberOfFittingTicks(size: number, tickSize: number, spaceRatio: number) {
		const numberOfTicksFit = Math.floor(size / (tickSize * spaceRatio))
		return clamp(numberOfTicksFit, 2, axisConfigs.ticks.number)
	}

	destroy() {
		const svg = this.getComponentContainer()
		const { position: axisPosition } = this.configs
		const container = DOMUtils.appendOrSelect(svg, `g.axis.${axisPosition}`)

		// Remove event listeners
		container
			.selectAll('g.tick text')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('mouseout', null)
	}
}
