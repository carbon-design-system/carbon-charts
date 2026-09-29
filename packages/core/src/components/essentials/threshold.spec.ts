import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'
import type { ScatterChart } from '@/charts/scatter'
import { Threshold } from '@/components/essentials/threshold'
import { Events } from '@/interfaces/enums'
import { TestEnvironment } from '@/tests/test-environment'

global.ResizeObserver = ResizeObserver

describe('threshold component', () => {
	let chart: ScatterChart
	let setLabelPosition: ReturnType<typeof vi.spyOn>

	beforeEach(() => {
		const testEnvironment = new TestEnvironment()
		testEnvironment.render()
		chart = testEnvironment.getChartReference()
		setLabelPosition = vi
			.spyOn(Threshold.prototype, 'setThresholdLabelPosition')
			.mockImplementation(() => {})
	})

	afterEach(() => {
		chart.destroy()
		vi.restoreAllMocks()
	})

	it('handles a threshold event once, however often the chart renders', () => {
		chart.update(false)
		chart.update(false)

		chart.services.events.dispatchEvent(Events.Threshold.SHOW, {})

		expect(setLabelPosition).toHaveBeenCalledTimes(1)
	})

	it('stops handling threshold events once the chart is destroyed', () => {
		chart.destroy()

		chart.services.events.dispatchEvent(Events.Threshold.SHOW, {})

		expect(setLabelPosition).not.toHaveBeenCalled()
	})
})
