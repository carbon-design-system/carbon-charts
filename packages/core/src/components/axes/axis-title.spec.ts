/*
Copyright IBM Corp. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { afterEach, describe, expect, it, vi } from 'vitest'
import { scaleBand } from 'd3'
import { merge } from 'lodash-es'
import { options } from '@/configuration'
import { AxisPositions, AxisTitleOrientations, ScaleTypes } from '@/interfaces/enums'
import { ChartModel } from '@/model/model'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events } from '@/services/essentials/events'
import { Axis } from './axis'

afterEach(() => {
	vi.restoreAllMocks()
	document.body.replaceChildren()
})

const fullTitle = 'Durchschnittlicher Verbrauch 日本語 🌍 '.repeat(5)
const visibleText = (element: Element) =>
	Array.from(element.childNodes)
		.filter(node => node.nodeType === Node.TEXT_NODE)
		.map(node => node.textContent)
		.join('')

function renderAxis(position: AxisPositions, titleOrientation?: AxisTitleOrientations) {
	const holder = document.createElement('div')
	document.body.append(holder)
	const scale = scaleBand().domain(['A', 'B'])
	const model = new ChartModel({})
	model.set(
		{
			options: merge({}, options.axisChart, {
				axes: { [position]: { title: fullTitle, titleOrientation, scaleType: ScaleTypes.LABELS } }
			})
		},
		{ skipUpdate: true }
	)
	vi.spyOn(model, 'isDataEmpty').mockReturnValue(false)
	// Text measurement is supplied because jsdom has no SVG layout engine.
	vi.spyOn(DOMUtils, 'getSVGElementSize').mockImplementation(element => {
		const node =
			typeof element.node === 'function' ? element.node() : (element as unknown as SVGElement)
		return node.tagName === 'text'
			? { width: Array.from(visibleText(node)).length * 7, height: 14 }
			: { width: 600, height: 400 }
	})
	const axis = new Axis(
		model,
		{
			domUtils: { getMainContainer: () => holder },
			cartesianScales: { getScaleByPosition: () => scale, getScaleDomain: () => scale.domain() },
			events: new Events(model, {})
		},
		{
			position,
			margins: { top: 30, bottom: 30, left: 30, right: 30 },
			axes: { left: true, right: true }
		}
	)
	axis.render(false)
	return { axis, model, holder }
}

describe('axis titles', () => {
	it.each([
		[AxisPositions.LEFT, undefined],
		[AxisPositions.LEFT, AxisTitleOrientations.RIGHT],
		[AxisPositions.RIGHT, undefined],
		[AxisPositions.RIGHT, AxisTitleOrientations.LEFT],
		[AxisPositions.TOP, undefined],
		[AxisPositions.BOTTOM, undefined]
	])('fits long titles on the %s axis (%s orientation)', (position, orientation) => {
		const { axis, model, holder } = renderAxis(
			position as AxisPositions,
			orientation as AxisTitleOrientations
		)
		const title = holder.querySelector('text.axis-title') as SVGTextElement
		const horizontal = position === AxisPositions.TOP || position === AxisPositions.BOTTOM
		const maxLength = horizontal ? 540 : 340
		expect(visibleText(title)).toMatch(/\.\.\.$/)
		expect(fullTitle.startsWith(visibleText(title).slice(0, -3))).toBe(true)
		expect(Array.from(visibleText(title)).length * 7).toBeLessThanOrEqual(maxLength)
		expect(title.style.textAnchor).toBe('start')
		expect(title.getAttribute('aria-label')).toBe(fullTitle)
		expect(title.querySelector('title')?.textContent).toBe(fullTitle)
		if (horizontal) {
			expect(title.getAttribute('transform')).toMatch(/^translate\(30,/)
		} else {
			expect(Number(title.getAttribute('x'))).toBe(
				title.getAttribute('transform') === 'rotate(-90)' ? -370 : 30
			)
		}

		// A subsequent short title must restore the centered layout and remove truncation metadata.
		model.getOptions().axes[position].title = 'Short title'
		axis.render(false)
		expect(visibleText(title)).toBe('Short title')
		expect(title.style.textAnchor).toBe('middle')
		expect(title.querySelector('title')).toBeNull()
		expect(title.getAttribute('aria-label')).toBeNull()
	})

	it('restores the full title when the axis grows', () => {
		const { axis, holder } = renderAxis(AxisPositions.BOTTOM)
		vi.mocked(DOMUtils.getSVGElementSize).mockImplementation(element => {
			const node =
				typeof element.node === 'function' ? element.node() : (element as unknown as SVGElement)
			return node.tagName === 'text'
				? { width: Array.from(visibleText(node)).length * 7, height: 14 }
				: { width: 2000, height: 400 }
		})
		axis.render(false)
		const title = holder.querySelector('text.axis-title') as SVGTextElement
		expect(visibleText(title)).toBe(fullTitle)
		expect(title.style.textAnchor).toBe('middle')
		expect(title.querySelector('title')).toBeNull()
	})

	it.each([AxisPositions.LEFT, AxisPositions.BOTTOM])(
		'handles a %s axis with no room for an ellipsis',
		position => {
			const { axis, holder } = renderAxis(position)
			vi.mocked(DOMUtils.getSVGElementSize).mockImplementation(element => {
				const node =
					typeof element.node === 'function' ? element.node() : (element as unknown as SVGElement)
				return node.tagName === 'text'
					? { width: Array.from(visibleText(node)).length * 7, height: 14 }
					: { width: 30, height: 30 }
			})
			axis.render(false)
			const title = holder.querySelector('text.axis-title')!
			expect(visibleText(title)).toBe('')
			expect(title.getAttribute('aria-label')).toBe(fullTitle)
		}
	)

	it('clears truncated title metadata in the empty state', () => {
		const { axis, model, holder } = renderAxis(AxisPositions.LEFT)
		vi.mocked(model.isDataEmpty).mockReturnValue(true)
		axis.render(false)
		const title = holder.querySelector('text.axis-title')!
		expect(visibleText(title)).toBe('')
		expect(title.querySelector('title')).toBeNull()
		expect(title.getAttribute('aria-label')).toBeNull()
	})
})
