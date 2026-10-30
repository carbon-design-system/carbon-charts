/*
SPDX-License-Identifier: Apache-2.0
*/
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { merge } from 'lodash-es'
import { options } from '@/configuration'
import { RadarChartModel } from '@/model/radar'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events } from '@/services/essentials/events'
import { Transitions } from '@/services/essentials/transitions'
import type { Services } from '@/interfaces/services'
import { Radar } from './radar'

const radars: Radar[] = []
const originalTransform = Object.getOwnPropertyDescriptor(SVGElement.prototype, 'transform')
beforeAll(() => {
	// D3's transitions also read this SVG geometry API, which jsdom does not implement.
	Object.defineProperty(SVGElement.prototype, 'transform', {
		configurable: true,
		value: { baseVal: { consolidate: () => null } }
	})
})

afterAll(() => {
	if (originalTransform) {
		Object.defineProperty(SVGElement.prototype, 'transform', originalTransform)
	} else {
		Reflect.deleteProperty(SVGElement.prototype, 'transform')
	}
})

afterEach(() => {
	for (const radar of radars.splice(0)) {
		radar.destroy()
	}
	vi.restoreAllMocks()
	document.body.replaceChildren()
})

function createRadar() {
	const holder = document.createElement('div')
	document.body.append(holder)
	const services = {
		domUtils: { getMainContainer: () => holder }
	} as unknown as Services
	const model = new RadarChartModel(services)
	model.set(
		{ options: merge({}, options.radarChart, { animations: false, radar: { maxValue: 100 } }) },
		{ skipUpdate: true }
	)
	services.events = new Events(model, services)
	services.transitions = new Transitions(model, services)
	// jsdom has no SVG layout. These tests check label content, not geometry.
	vi.spyOn(DOMUtils, 'getSVGElementSize').mockReturnValue({ width: 600, height: 400 })
	const radar = new Radar(model, services)
	radars.push(radar)
	vi.spyOn(radar, 'getLabelDimensions').mockReturnValue({ width: 40, height: 14 })
	const render = async (keys: string[], valueOffset = 0) => {
		model.setData(keys.map((key, i) => ({ group: 'Data', key, value: i + 1 + valueOffset })))
		radar.render(false)
		await Promise.all(
			Object.values(services.transitions.getPendingTransitions()).map(transition =>
				transition.end()
			)
		)
	}
	const labels = () =>
		Array.from(holder.querySelectorAll('.x-labels text')).map(label => label.textContent)
	return { render, labels }
}

describe('radar axis labels', () => {
	it.each([
		['replacement', ['X', 'Y', 'Z']],
		['reordered', ['C', 'A', 'B']],
		['more', ['W', 'X', 'Y', 'Z']],
		['fewer', ['X', 'Y']],
		['localized', ['一月', '二月', '三月']]
	])('shows the current labels with %s categories', async (_, keys: string[]) => {
		const { render, labels } = createRadar()
		await render(['A', 'B', 'C'])
		expect(labels()).toEqual(['A', 'B', 'C'])
		await render(keys)
		expect(labels()).toEqual(keys)
	})

	it('keeps labels when only values change', async () => {
		const { render, labels } = createRadar()
		const keys = ['A', 'B', 'C']
		await render(keys)
		await render(keys, 3)
		expect(labels()).toEqual(keys)
	})

	it('updates labels on repeated data changes', async () => {
		const { render, labels } = createRadar()
		for (const keys of [
			['A', 'B', 'C'],
			['X', 'Y', 'Z'],
			['One', 'Two', 'Three']
		]) {
			await render(keys)
			expect(labels()).toEqual(keys)
		}
	})
})
