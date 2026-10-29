import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'
import type { ScatterChart } from '@/charts/scatter'
import { TestEnvironment } from '@/tests/test-environment'

global.ResizeObserver = ResizeObserver

describe('DOMUtils fullscreen state', () => {
	let chart: ScatterChart
	let holder: HTMLElement

	beforeEach(() => {
		const testEnvironment = new TestEnvironment()
		testEnvironment.render()
		chart = testEnvironment.getChartReference()
		holder = chart.services.domUtils.getHolder()
	})

	afterEach(() => {
		chart.destroy()
		Reflect.deleteProperty(document, 'fullscreenElement')
	})

	it('marks the holder as fullscreen only while it is the fullscreen element', () => {
		const changeFullscreenElement = (element: Element | null) => {
			Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: element })
			document.dispatchEvent(new Event('fullscreenchange'))
			return holder.classList.contains('fullscreen')
		}

		expect(changeFullscreenElement(document.createElement('video'))).toBe(false)
		expect(changeFullscreenElement(holder)).toBe(true)
		expect(changeFullscreenElement(null)).toBe(false)
	})
})
