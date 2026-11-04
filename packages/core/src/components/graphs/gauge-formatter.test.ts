// SPDX-License-Identifier: Apache-2.0
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Gauge } from './gauge'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { DOMUtils } from '@/services/essentials/dom-utils'
import type { ChartModel } from '@/model/model'
import type { Services } from '@/interfaces/services'

function createGauge(value: number, delta: number, overrides: object = {}) {
	const chartOptions = mergeDefaultChartOptions(options.gaugeChart, overrides)
	const holder = document.createElement('div')
	const model = {
		getOptions: () => chartOptions,
		getData: () => [
			{ group: 'value', value },
			{ group: 'delta', value: delta }
		]
	} as unknown as ChartModel
	const services = {
		domUtils: { getMainContainer: () => holder }
	} as unknown as Services
	vi.spyOn(DOMUtils, 'getSVGElementSize').mockReturnValue({ width: 160, height: 160 })
	return { gauge: new Gauge(model, services), holder }
}

afterEach(() => vi.restoreAllMocks())

describe('Gauge custom number formatter arguments', () => {
	it.each([66.67, 65, 0])('passes the numeric value %s to the custom formatter', value => {
		const numberFormatter = vi.fn((number: number) => number.toFixed(1))
		const { gauge, holder } = createGauge(value, 0, { gauge: { numberFormatter } })
		gauge.drawValueNumber()
		expect(numberFormatter).toHaveBeenCalledWith(value)
		expect(holder.querySelector('text.gauge-value-number')?.textContent).toBe(value.toFixed(1))
	})

	it.each([-2.25, 3.5])('passes the numeric delta %s to the custom formatter', delta => {
		const numberFormatter = vi.fn((number: number) => number.toFixed(1))
		const { gauge, holder } = createGauge(65, delta, { gauge: { numberFormatter } })
		gauge.drawDelta()
		expect(numberFormatter).toHaveBeenCalledWith(delta)
		expect(holder.querySelector('text.gauge-delta-number')?.textContent).toBe(
			`${delta.toFixed(1)}%`
		)
	})

	it('retains the existing two-decimal rounding before custom formatting', () => {
		const numberFormatter = vi.fn((number: number) => String(number))
		const { gauge } = createGauge(66.678, -2.256, { gauge: { numberFormatter } })
		gauge.drawValueNumber()
		expect(numberFormatter).toHaveBeenLastCalledWith(66.68)
		gauge.drawDelta()
		expect(numberFormatter).toHaveBeenLastCalledWith(-2.26)
	})

	it('preserves default locale formatting without a custom formatter', () => {
		const { gauge, holder } = createGauge(66.67, -2.25, { locale: { code: 'de-DE' } })
		gauge.drawValueNumber()
		gauge.drawDelta()
		expect(holder.querySelector('text.gauge-value-number')?.textContent).toBe('66,67')
		expect(holder.querySelector('text.gauge-delta-number')?.textContent).toBe('-2,25%')
	})
})
