/*
SPDX-License-Identifier: Apache-2.0
*/
import { afterEach, describe, expect, it, vi } from 'vitest'
import { merge } from 'lodash-es'
import { legend, options } from '@/configuration'
import type { MeterChartOptions } from '@/interfaces/charts'
import type { Services } from '@/interfaces/services'
import { MeterChartModel } from '@/model/meter'
import { MeterTitle } from './title-meter'

afterEach(() => {
	document.body.replaceChildren()
})

function createTitle(overrides: MeterChartOptions = {}) {
	const holder = document.createElement('div')
	document.body.append(holder)
	const services = {
		domUtils: { getMainContainer: () => holder }
	} as unknown as Services
	const model = new MeterChartModel(services)
	model.set(
		{
			options: merge(
				{},
				options.proportionalMeterChart,
				{ meter: { proportional: { unit: 'units' } } },
				overrides
			)
		},
		{ skipUpdate: true }
	)
	const title = new MeterTitle(model, services)
	const render = (values = [4, 6]) => {
		model.set(
			{
				data: values.map((value, index) => ({ group: `Group ${index}`, value })),
				dataGroups: values.map((_, index) => ({
					name: `Group ${index}`,
					status: legend.items.status.ACTIVE
				}))
			},
			{ skipUpdate: true }
		)
		title.displayTotal()
		return holder.querySelector('text.proportional-meter-total')?.textContent
	}
	return { render }
}

describe('proportional meter total label', () => {
	it('shows the inferred total when no total is supplied and updates it with the data', () => {
		const { render } = createTitle()
		expect(render()).toBe('10 units total')
		expect(render([7, 8])).toBe('15 units total')
	})

	it('shows zero for an empty data set when no total is supplied', () => {
		expect(createTitle().render([])).toBe('0 units total')
	})

	it('keeps an explicitly supplied total when the data changes', () => {
		const { render } = createTitle({ meter: { proportional: { total: 100 } } })
		expect(render()).toBe('100 units total')
		expect(render([7, 8])).toBe('100 units total')
	})

	it('keeps the inferred total passed to a custom total formatter', () => {
		const totalFormatter = vi.fn((value: number) => `Capacity: ${value}`)
		const { render } = createTitle({ meter: { proportional: { totalFormatter } } })
		expect(render()).toBe('Capacity: 10')
		expect(totalFormatter).toHaveBeenCalledWith(10)
	})

	it('preserves an explicitly supplied zero total', () => {
		expect(createTitle({ meter: { proportional: { total: 0 } } }).render()).toBe('0 units total')
	})

	it('passes the inferred total and locale to the configured number formatter', () => {
		const number = vi.fn((value: number, code: string) => `${code}:${value}`)
		const { render } = createTitle({ locale: { code: 'de-DE', number } })
		expect(render()).toBe('de-DE:10 units total')
		expect(number).toHaveBeenCalledWith(10, 'de-DE')
	})
})
