import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Chart } from '@/chart'
import { options } from '@/configuration'
import { Events } from '@/interfaces/enums'

class TestChart extends Chart {
	getComponents() {
		return []
	}
}

describe('chart destruction', () => {
	let holder: HTMLDivElement
	let chart: TestChart
	let resizeCallback: ResizeObserverCallback
	const disconnect = vi.fn()

	beforeEach(() => {
		vi.useFakeTimers()
		vi.stubGlobal(
			'ResizeObserver',
			class {
				constructor(callback: ResizeObserverCallback) {
					resizeCallback = callback
				}
				observe() {}
				disconnect = disconnect
			}
		)
		holder = document.createElement('div')
		document.body.appendChild(holder)
		chart = new TestChart(holder, { data: [], options: options.chart })
		chart.model.setOptions({ ...options.chart, resizable: true })
		chart.init(holder, { data: [], options: options.chart })
	})

	afterEach(() => {
		chart.destroy()
		holder.remove()
		vi.unstubAllGlobals()
		vi.restoreAllMocks()
		vi.clearAllMocks()
		vi.useRealTimers()
	})

	it('removes the holder and stops responding to fullscreen changes', () => {
		document.dispatchEvent(new Event('fullscreenchange'))
		expect(holder.classList.contains('fullscreen')).toBe(true)

		chart.destroy()
		document.dispatchEvent(new Event('fullscreenchange'))

		expect(holder.isConnected).toBe(false)
		expect(holder.classList.contains('fullscreen')).toBe(true)
		expect(disconnect).toHaveBeenCalledTimes(1)
		expect(chart.model.get('destroyed')).toBe(true)
	})

	it('is idempotent', () => {
		chart.destroy()
		chart.destroy()

		expect(disconnect).toHaveBeenCalledTimes(1)
	})

	it('can keep a framework-owned holder', () => {
		const mouseover = vi.fn()
		chart.services.events.addEventListener(Events.Chart.MOUSEOVER, mouseover)

		chart.destroy({ removeHolder: false })
		holder.dispatchEvent(new MouseEvent('mouseover'))

		expect(holder.isConnected).toBe(true)
		expect(holder.childElementCount).toBe(0)
		expect(mouseover).not.toHaveBeenCalled()
	})

	it('cancels pending resize callbacks', () => {
		const resized = vi.fn()
		chart.services.events.addEventListener(Events.Chart.RESIZE, resized)
		Object.defineProperty(holder, 'clientWidth', { value: 200 })
		resizeCallback([], {} as ResizeObserver)

		chart.destroy()
		vi.runAllTimers()

		expect(resized).not.toHaveBeenCalled()
	})

	it('does not render or emit pending render completion after destruction', async () => {
		const rendered = vi.fn()
		chart.services.events.addEventListener(Events.Chart.RENDER_FINISHED, rendered)
		chart.update()
		chart.destroy()
		const update = vi.spyOn(chart.services.domUtils, 'update')
		chart.update()
		await Promise.resolve()

		expect(update).not.toHaveBeenCalled()
		expect(rendered).not.toHaveBeenCalled()
	})
})
