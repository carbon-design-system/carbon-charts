/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright (c) 2026 Minwook Shin
 */

import { describe, expect, it, vi } from 'vitest'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { ChartModel } from '@/model/model'
import { AxisPositions, ScaleTypes } from '@/interfaces/enums'
import { CartesianScales } from './scales-cartesian'

function createScales(values: Array<number | null>, axisOptions = {}) {
	const model = new ChartModel({ events: { dispatchEvent: vi.fn() } })
	model.setOptions(
		mergeDefaultChartOptions(options.lollipopChart, {
			axes: { left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, ...axisOptions } },
			data: { groupMapsTo: 'group' }
		})
	)
	model.setData(values.map(value => ({ group: 'Data', value })))
	return new CartesianScales(model, {})
}

describe('inferred zero-only linear domains', () => {
	it('keeps zero at the start of a non-degenerate domain', () => {
		const domain = createScales([0, 0, null]).getScaleDomain(AxisPositions.LEFT)
		expect(domain[0]).toBe(0)
		expect(domain[1]).toBeGreaterThan(0)
	})

	it('preserves an explicitly supplied degenerate domain', () => {
		expect(createScales([0], { domain: [0, 0] }).getScaleDomain(AxisPositions.LEFT)).toEqual([0, 0])
	})

	it('preserves nonzero domains', () => {
		expect(createScales([0, 10]).getScaleDomain(AxisPositions.LEFT)).toEqual([0, 11])
	})

	it('preserves negative-only domains', () => {
		expect(createScales([-10, 0]).getScaleDomain(AxisPositions.LEFT)).toEqual([-11, 0])
	})

	it('preserves empty domains', () => {
		expect(createScales([]).getScaleDomain(AxisPositions.LEFT)).toEqual([])
	})

	it('leaves time domains unchanged', () => {
		expect(
			createScales([0, 0], { scaleType: ScaleTypes.TIME }).getScaleDomain(AxisPositions.LEFT)
		).toEqual([new Date(0), new Date(0)])
	})

	it('continues to reject zero on a logarithmic axis', () => {
		expect(() =>
			createScales([0], { scaleType: ScaleTypes.LOG }).getScaleDomain(AxisPositions.LEFT)
		).toThrow()
	})
})
