import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'
import type { ScatterChart } from '@/charts/scatter'
import { Events } from '@/interfaces/enums'
import { TestEnvironment } from '@/tests/test-environment'

global.ResizeObserver = ResizeObserver

describe('modal component', () => {
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

	it('removes its Escape key listener when the chart is destroyed while it is open', () => {
		const addListener = vi.spyOn(window, 'addEventListener')
		const removeListener = vi.spyOn(window, 'removeEventListener')
		chart.services.events.dispatchEvent(Events.Modal.SHOW)
		const keydownListener = addListener.mock.calls.find(([type]) => type === 'keydown')?.[1]

		chart.destroy()

		expect(keydownListener).toBeDefined()
		expect(removeListener).toHaveBeenCalledWith('keydown', keydownListener)
	})
})
