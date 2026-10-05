import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'
import type { ScatterChart } from '@/charts/scatter'
import { Events } from '@/interfaces/enums'
import { TestEnvironment } from '@/tests/test-environment'

global.ResizeObserver = ResizeObserver

describe('toolbar component', () => {
	let chart: ScatterChart

	beforeEach(() => {
		const testEnvironment = new TestEnvironment()
		testEnvironment.render()
		chart = testEnvironment.getChartReference()
	})

	afterEach(() => {
		chart.destroy()
		vi.restoreAllMocks()
	})

	it('removes its page click listener when the chart is destroyed with the overflow menu open', () => {
		const addListener = vi.spyOn(document.body, 'addEventListener')
		const removeListener = vi.spyOn(document.body, 'removeEventListener')
		chart.services.events.dispatchEvent(Events.Toolbar.SHOW_OVERFLOW_MENU)
		const clickListener = addListener.mock.calls.find(([type]) => type === 'click')?.[1]

		chart.destroy()

		expect(clickListener).toBeDefined()
		expect(removeListener).toHaveBeenCalledWith('click', clickListener)
	})
})
