// SPDX-License-Identifier: Apache-2.0
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Gauge } from './gauge'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { DOMUtils } from '@/services/essentials/dom-utils'
import type { ChartModel } from '@/model/model'
import type { Services } from '@/interfaces/services'

function createGauge(overrides: object = {}) {
	const chartOptions = mergeDefaultChartOptions(options.gaugeChart, overrides)
	let delta = 5
	const holder = document.createElement('div')
	const model = {
		getOptions: () => chartOptions,
		getData: () => [{ group: 'delta', value: delta }]
	} as unknown as ChartModel
	const services = {
		domUtils: { getMainContainer: () => holder }
	} as unknown as Services
	vi.spyOn(DOMUtils, 'getSVGElementSize').mockReturnValue({ width: 160, height: 160 })
	const gauge = new Gauge(model, services)
	return {
		gauge,
		holder,
		chartOptions,
		render: (value = delta) => {
			delta = value
			gauge.drawDelta()
		}
	}
}

afterEach(() => vi.restoreAllMocks())

describe('Gauge delta arrow updates', () => {
	it('keeps one arrow and updates its direction without a status', () => {
		const { holder, render } = createGauge()
		render(5)
		const arrow = holder.querySelector('svg.gauge-delta-arrow polygon')
		for (const delta of [-7, 9, -2]) {
			render(delta)
			const arrows = holder.querySelectorAll('svg.gauge-delta-arrow polygon')
			expect(arrows).toHaveLength(1)
			expect(arrows[0]).toBe(arrow)
			expect(arrow?.getAttribute('points')).toBe(delta > 0 ? '4,10 8,6 12,10' : '12,6 8,10 4,6')
		}
	})

	it('reuses the same arrow when a status is cleared', () => {
		const { holder, render, chartOptions } = createGauge({ gauge: { status: 'success' } })
		render()
		const arrow = holder.querySelector('polygon.gauge-delta-arrow')
		expect(arrow?.classList.contains('status--success')).toBe(true)
		chartOptions.gauge.status = null
		render(-7)
		render(9)
		expect(holder.querySelectorAll('svg.gauge-delta-arrow polygon')).toHaveLength(1)
		expect(holder.querySelector('polygon.gauge-delta-arrow')).toBe(arrow)
		expect(arrow?.classList.contains('status--success')).toBe(false)
	})

	it('retains status styling during updates', () => {
		const { holder, render } = createGauge({ gauge: { status: 'warning' } })
		render()
		render(-7)
		expect(holder.querySelectorAll('svg.gauge-delta-arrow polygon')).toHaveLength(1)
		expect(
			holder.querySelector('polygon.gauge-delta-arrow')?.classList.contains('status--warning')
		).toBe(true)
	})

	it('does not create an arrow when disabled', () => {
		const { holder, render } = createGauge({ gauge: { deltaArrow: { enabled: false } } })
		render()
		render(-7)
		expect(holder.querySelectorAll('svg.gauge-delta-arrow')).toHaveLength(0)
	})

	it('removes the delta group for zero and recreates one arrow afterward', () => {
		const { holder, render } = createGauge()
		render()
		render(0)
		expect(holder.querySelector('g.gauge-delta')).toBeNull()
		render(-7)
		expect(holder.querySelectorAll('svg.gauge-delta-arrow polygon')).toHaveLength(1)
	})
})
