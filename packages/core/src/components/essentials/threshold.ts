import { select, pointer, type ScaleBand } from 'd3'
import Position, { PLACEMENTS } from '@carbon/utils-position' // position services
import { flipDomainAndRangeBasedOnOrientation, getProperty } from '@/tools'
import { carbonPrefix } from '@/configuration-non-customizable' // CSS prefix
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import type { ChartModel } from '@/model/model'
import { AxisPositions, Events, RenderTypes, ScaleTypes } from '@/interfaces/enums'
import { formatTick, computeTimeIntervalName } from '@/services/time-series'
import { sanitizeText } from '@/utils/sanitizeHtml'

export class Threshold extends Component {
	type = 'threshold'
	renderType = RenderTypes.SVG

	label: any

	positionService = new Position()

	constructor(model: ChartModel, services: any) {
		super(model, services)
	}

	render(animate = false) {
		const axesOptions = getProperty(this.getOptions(), 'axes')

		const thresholdData: any[] = []

		Object.keys(axesOptions).forEach(axisPosition => {
			if (Object.values(AxisPositions).includes(axisPosition as any)) {
				const axisOptions = axesOptions[axisPosition]

				if (axisOptions.thresholds && axisOptions.thresholds.length > 0) {
					thresholdData.push({
						axisPosition,
						thresholds: axisOptions.thresholds,
						correspondingDatasets: axisOptions?.correspondingDatasets,
						mapsTo: axisOptions?.mapsTo
					})
				}
			}
		})

		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true })

		// Update data on all axis threshold groups
		const thresholdAxisGroups = svg
			.selectAll('g.axis-thresholds')
			.data(thresholdData, (d: any) => d.axisPosition)

		// Remove axis threshold groups that are no longer needed
		thresholdAxisGroups.exit().attr('opacity', 0).remove()

		// Add the axis threshold groups that need to be introduced
		const thresholdAxisGroupsEnter = thresholdAxisGroups.enter().append('g')

		const thresholdAxisGroupsMerge = thresholdAxisGroupsEnter.merge(thresholdAxisGroups as any)
		thresholdAxisGroupsMerge.attr('class', (d: any) => `axis-thresholds ${d.axisPosition}`)

		const thresholdGroups = thresholdAxisGroupsMerge.selectAll('g.threshold-group').data((d: any) =>
			d.thresholds.map((threshold: any) => {
				// Merge relevant keys into the threshold object
				threshold.axisPosition = d.axisPosition
				threshold.datum = this.constructDatumObj(d, threshold)
				return threshold
			})
		)

		// Remove threshold groups that are no longer needed
		thresholdGroups.exit().attr('opacity', 0).remove()

		// Add the threshold groups that need to be introduced
		const thresholdGroupsEnter = thresholdGroups.enter().append('g')

		thresholdGroupsEnter.append('line').attr('class', 'threshold-line')
		thresholdGroupsEnter.append('rect').attr('class', 'threshold-hoverable-area')

		const thresholdGroupsMerge = thresholdGroupsEnter.merge(thresholdGroups as any)
		thresholdGroupsMerge.attr('class', 'threshold-group')

		const self = this
		thresholdAxisGroupsMerge.each(function ({ axisPosition }: { axisPosition: AxisPositions }) {
			const scale = self.services.cartesianScales.getScaleByPosition(
				axisPosition
			) as unknown as ScaleBand<string>
			const scaleType = self.services.cartesianScales.getScaleTypeByPosition(axisPosition)

			let xScale = null
			let yScale = null

			// Depending on type of axis position, assign scale and main perpendicular axis
			if (axisPosition === AxisPositions.LEFT || axisPosition === AxisPositions.RIGHT) {
				yScale = scale
				xScale = self.services.cartesianScales.getMainXScale()
			} else {
				xScale = scale
				yScale = self.services.cartesianScales.getMainYScale()
			}

			const isScaleTypeLabels = scaleType === ScaleTypes.LABELS
			const [xScaleStart, xScaleEnd] = xScale.range()
			const [yScaleEnd, yScaleStart] = yScale.range()

			const { cartesianScales } = self.services
			const orientation = cartesianScales.getOrientation()
			const getDomainValue = (d: any) => cartesianScales.getDomainValue(d) as number
			const getRangeValue = (d: any) => cartesianScales.getRangeValue(d) as number
			const [getXValue, getYValue] = flipDomainAndRangeBasedOnOrientation(
				getDomainValue,
				getRangeValue,
				orientation
			)

			const group = select(this)
			if (axisPosition === AxisPositions.TOP || axisPosition === AxisPositions.BOTTOM) {
				group
					.selectAll('line.threshold-line')
					.transition()
					.call((t: any) =>
						self.services.transitions.setupTransition({
							transition: t,
							name: 'threshold-line-update',
							animate
						})
					)
					.attr('y1', yScaleStart)
					.attr('y2', yScaleEnd)
					.attr(
						'x1',
						({ datum }: { datum: any }) =>
							getXValue(datum) + (isScaleTypeLabels ? scale.step() / 2 : 0)
					)
					.attr(
						'x2',
						({ datum }: { datum: any }) =>
							getXValue(datum) + (isScaleTypeLabels ? scale.step() / 2 : 0)
					)
					.style('stroke', ({ fillColor }: { fillColor: string }) => fillColor)

				// Set hoverable area width and rotate it
				group
					.selectAll('rect.threshold-hoverable-area')
					.attr('x', 0)
					.attr('y', ({ datum }: { datum: any }) => -getXValue(datum))
					.attr('width', Math.abs(yScaleEnd - yScaleStart))
					.classed('rotate', true)
			} else {
				group
					.selectAll('line.threshold-line')
					.transition()
					.call((t: any) =>
						self.services.transitions.setupTransition({
							transition: t,
							name: 'threshold-line-update',
							animate
						})
					)
					.attr('x1', xScaleStart)
					.attr('x2', xScaleEnd)
					.attr(
						'y1',
						({ datum }: { datum: any }) =>
							getYValue(datum) + (isScaleTypeLabels ? scale.step() / 2 : 0)
					)
					.attr(
						'y2',
						({ datum }: { datum: any }) =>
							getYValue(datum) + (isScaleTypeLabels ? scale.step() / 2 : 0)
					)
					.style('stroke', ({ fillColor }: { fillColor: string }) => fillColor)

				// Set hoverable area width
				group
					.selectAll('rect.threshold-hoverable-area')
					.attr('x', xScaleStart)
					.attr('y', ({ datum }: { datum: any }) => getYValue(datum))
					.attr('width', Math.abs(xScaleEnd - xScaleStart))
					.classed('rotate', false)
			}
		})

		// Add event listener for showing the threshold tooltip
		this.services.events.addEventListener(Events.Threshold.SHOW, (e: any) => {
			this.setThresholdLabelPosition(e.detail)

			this.label.classed('hidden', false)
		})

		// Add event listener for hiding the threshold tooltip
		this.services.events.addEventListener(Events.Threshold.HIDE, () => {
			this.label.classed('hidden', true)
		})

		this.appendThresholdLabel()

		this.addEventListeners()
	}

	getFormattedValue(datum: any) {
		const { value, axisPosition } = datum
		const options = this.getOptions()
		const scaleType = this.services.cartesianScales.getScaleTypeByPosition(axisPosition)
		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')
		// If scale is time, format the threshold date as the ticks format
		if (scaleType === ScaleTypes.TIME) {
			const isVertical = [AxisPositions.LEFT, AxisPositions.RIGHT].includes(axisPosition)
			const mainXScale = this.services.cartesianScales.getMainXScale()
			const mainYScale = this.services.cartesianScales.getMainYScale()
			const scale = isVertical ? mainYScale : mainXScale

			const timeScaleOptions = getProperty(options, 'timeScale')
			const timeInterval = computeTimeIntervalName(
				scale.ticks(),
				getProperty(timeScaleOptions, 'timeInterval')
			)

			return formatTick(value, 0, scale.ticks(), timeInterval, timeScaleOptions, options.locale)
		}

		return numberFormatter(value, localeCode)
	}

	appendThresholdLabel() {
		const holder = select(this.services.domUtils.getHolder())

		const chartprefix = getProperty(this.getOptions(), 'style', 'prefix')

		this.label = DOMUtils.appendOrSelect(
			holder,
			`div.${carbonPrefix}--${chartprefix}--threshold--label`
		).classed('hidden', true)
	}

	setThresholdLabelPosition({ event, datum }: { event: CustomEvent; datum: any }) {
		const holder = this.services.domUtils.getHolder()
		const mouseRelativePos = pointer(event, holder)

		// Format the threshold value using valueFormatter if defined in user-provided options
		const formattedValue = datum.valueFormatter
			? datum.valueFormatter(datum.value)
			: this.getFormattedValue(datum)

		this.label
			.html(sanitizeText(`${datum.label || 'Threshold'}: ${formattedValue}`))
			.style('background-color', datum.fillColor)

		const target = this.label.node()
		// Find out whether threshold label should be shown on the left or right side
		const bestPlacementOption = this.positionService.findBestPlacementAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1]
			},
			target,
			[PLACEMENTS.RIGHT, PLACEMENTS.LEFT, PLACEMENTS.TOP, PLACEMENTS.BOTTOM],
			() => ({
				top: undefined, // other package lists this as non-optional
				left: undefined, // ditto
				width: holder.offsetWidth,
				height: holder.offsetHeight
			})
		)

		// Get coordinates to where label should be positioned
		const pos = this.positionService.findPositionAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1]
			},
			target,
			bestPlacementOption
		)

		this.positionService.setElement(target, pos)
	}

	// Constructs object to pass in scale functions
	constructDatumObj(d: any, element: any) {
		const datum: any = {}

		// We only need to specify group only if correpsonding dataset is defined
		if (d.correspondingDatasets) {
			datum['group'] = getProperty(d, 'correspondingDatasets', 0)
		}

		// Add attribute with the mapsTo value as key
		datum[d['mapsTo']] = element.value

		return datum
	}

	addEventListeners() {
		const self = this

		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true })

		// Add events to the threshold hoverable area
		svg
			.selectAll('rect.threshold-hoverable-area')
			.on('mouseover mousemove', function (event: MouseEvent) {
				select((this as any).parentNode)
					.select('line.threshold-line')
					.classed('active', true)

				self.services.events.dispatchEvent(Events.Threshold.SHOW, {
					event,
					hoveredElement: select(this),
					datum: select(this).datum()
				})
			})
			.on('mouseout', function (event: MouseEvent) {
				select((this as any).parentNode)
					.select('line.threshold-line')
					.classed('active', false)

				self.services.events.dispatchEvent(Events.Threshold.HIDE, {
					event,
					hoveredElement: select(this),
					datum: select(this).datum()
				})
			})
	}
}
