/*
Copyright IBM Corp. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { afterEach, describe, expect, it, vi } from 'vitest'
import { scaleBand } from 'd3'
import { merge } from 'lodash-es'
import { options } from '@/configuration'
import { AxisPositions, ScaleTypes, TickRotations } from '@/interfaces/enums'
import { ChartModel } from '@/model/model'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events } from '@/services/essentials/events'
import { HoverAxis } from './hover-axis'

afterEach(() => {
	vi.restoreAllMocks()
	document.body.replaceChildren()
})

describe.each([AxisPositions.TOP, AxisPositions.BOTTOM])('%s hover axis', position => {
	it.each([
		[TickRotations.AUTO, 'Short'],
		[TickRotations.AUTO, 'Long string that will cause bug'],
		[TickRotations.AUTO, 'Long string that will cause bug'.repeat(4)],
		[TickRotations.ALWAYS, 'Short'],
		[TickRotations.ALWAYS, 'Long string that will cause bug'],
		[TickRotations.NEVER, 'Long string that will cause bug']
	])('aligns the hover target with %s ticks: %s', (rotation, label) => {
		const holder = document.createElement('div')
		document.body.append(holder)
		const scale = scaleBand().domain([label])
		const model = new ChartModel({})
		model.set(
			{
				options: merge({}, options.heatmapChart, {
					axes: { [position]: { scaleType: ScaleTypes.LABELS, ticks: { rotation } } }
				})
			},
			{ skipUpdate: true }
		)
		vi.spyOn(model, 'isDataEmpty').mockReturnValue(false)
		// jsdom does not implement SVG text measurement.
		vi.spyOn(DOMUtils, 'getSVGElementSize').mockImplementation(element => {
			const node =
				typeof element.node === 'function' ? element.node() : (element as unknown as SVGElement)
			return node.tagName === 'text'
				? { width: node.textContent.length * 7, height: 14 }
				: { width: 500, height: 300 }
		})
		const axis = new HoverAxis(
			model,
			{
				domUtils: { getMainContainer: () => holder },
				cartesianScales: { getScaleByPosition: () => scale, getScaleDomain: () => scale.domain() },
				events: new Events(model, {})
			},
			{ position, margins: { top: 30, bottom: 30, left: 30, right: 30 }, axes: {} }
		)
		axis.render(false)
		const tick = holder.querySelector('g.ticks:not(.invisible) g.tick')!
		const text = tick.querySelector('text')!
		const target = tick.querySelector('rect')!
		expect(text.textContent).not.toBe('')
		expect(target.getAttribute('transform')).toBe(text.getAttribute('transform'))

		// Re-rendering without rotation must clear an existing target transform.
		model.getOptions().axes[position].ticks.rotation = TickRotations.NEVER
		axis.render(false)
		const updatedTick = holder.querySelector('g.ticks:not(.invisible) g.tick')!
		expect(updatedTick.querySelector('text')!.getAttribute('transform')).toBeNull()
		expect(updatedTick.querySelector('rect')!.getAttribute('transform')).toBeNull()
	})
})
