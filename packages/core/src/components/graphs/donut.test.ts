// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it, vi } from 'vitest'
import { select } from 'd3'
import { Donut } from './donut'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { ChartModel } from '@/model/model'
import type { Services } from '@/interfaces/services'

function createDonut(values: number[], overrides: object = {}) {
	const chartOptions = mergeDefaultChartOptions(options.donutChart, {
		locale: { code: 'en-US' },
		...overrides
	})
	let rows = values.map((value, index) => ({ group: `Group ${index}`, value }))
	const model = {
		getOptions: () => chartOptions,
		getDisplayData: () => rows
	} as unknown as ChartModel
	const services = {
		domUtils: { getMainContainer: () => document.createElement('div') }
	} as unknown as Services
	const donut = new Donut(model, services)
	const text = select(document.createElementNS('http://www.w3.org/2000/svg', 'text')).text('0')
	return {
		donut,
		text,
		update: (next: number[]) => {
			rows = next.map((value, index) => ({ group: `Group ${index}`, value }))
		}
	}
}

describe('Donut center number formatting', () => {
	it.each([
		{ values: [1.5, 2.25], expected: '3.75' },
		{ values: [0.1, 0.15], expected: '0.25' },
		{ values: [4, 6], expected: '10' }
	])('formats the sum $expected without truncation', ({ values, expected }) => {
		const { donut, text } = createDonut(values)
		donut.centerNumberTween(text)(1)
		expect(text.text()).toBe(expected)
	})

	it.each([3.75, 0])('preserves the explicit center number %s', number => {
		const { donut, text } = createDonut([4, 6], { donut: { center: { number } } })
		donut.centerNumberTween(text)(1)
		expect(text.text()).toBe(String(number))
	})

	it('passes the complete value to the locale formatter', () => {
		const number = vi.fn((value: number, code: string) => value.toLocaleString(code))
		const { donut, text } = createDonut([1.5, 2.25], { locale: { code: 'de-DE', number } })
		donut.centerNumberTween(text)(1)
		expect(number).toHaveBeenLastCalledWith(3.75, 'de-DE')
		expect(text.text()).toBe('3,75')
	})

	it('preserves a custom center formatter', () => {
		const numberFormatter = vi.fn((value: number) => `custom:${value}`)
		const { donut, text } = createDonut([1.5, 2.25], { donut: { center: { numberFormatter } } })
		donut.centerNumberTween(text)(1)
		expect(numberFormatter).toHaveBeenLastCalledWith(3.75)
		expect(text.text()).toBe('custom:3.75')
	})

	it('preserves fractional totals after the data changes', () => {
		const { donut, text, update } = createDonut([1.5, 2.25])
		donut.centerNumberTween(text)(1)
		update([2.25, 2.25])
		donut.centerNumberTween(text)(1)
		expect(text.text()).toBe('4.5')
	})

	it.each(['en-US', 'de-DE'])('continues updates from the numeric value with locale %s', code => {
		const { donut, text, update } = createDonut([1.5, 2.25], { locale: { code } })
		donut.centerNumberTween(text)(1)
		update([2.25, 2.25])
		const tween = donut.centerNumberTween(text)
		tween(0)
		expect(text.text()).toBe((3.75).toLocaleString(code))
		tween(0.5)
		expect(text.text()).toBe((4.125).toLocaleString(code))
		tween(1)
		expect(text.text()).toBe((4.5).toLocaleString(code))
	})

	it('starts a newly created center element at zero', () => {
		const { donut, text } = createDonut([1.5, 2.25])
		donut.centerNumberTween(text)(1)
		const replacement = select(document.createElementNS('http://www.w3.org/2000/svg', 'text')).text(
			'0'
		)
		donut.centerNumberTween(replacement)(0)
		expect(replacement.text()).toBe('0')
	})

	it('continues an interrupted update from the last displayed numeric value', () => {
		const { donut, text, update } = createDonut([1.5, 2.25])
		donut.centerNumberTween(text)(1)
		update([2.25, 2.25])
		donut.centerNumberTween(text)(0.5)
		update([2.5, 3])
		const tween = donut.centerNumberTween(text)
		tween(0)
		expect(text.text()).toBe('4.125')
		tween(1)
		expect(text.text()).toBe('5.5')
	})

	it('recovers when valid data follows a non-finite center value', () => {
		const { donut, text, update } = createDonut([Number.NaN])
		donut.centerNumberTween(text)(1)
		update([4, 6])
		donut.centerNumberTween(text)(1)
		expect(text.text()).toBe('10')
	})
})
