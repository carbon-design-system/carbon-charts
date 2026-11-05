import type { Chart } from '@carbon/charts'
import React from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import CirclePackChart from '../../src/charts/CirclePackChart'

export function runLifecycleScenario(strictMode: boolean) {
	const container = document.createElement('div')
	document.body.appendChild(container)
	const root = createRoot(container)
	const charts: Chart[] = []
	const holders: HTMLElement[] = []
	const fullscreenListeners = new Set<EventListenerOrEventListenerObject>()
	const observers = new Set<ResizeObserver>()
	const originalAdd = document.addEventListener
	const originalRemove = document.removeEventListener
	const OriginalResizeObserver = window.ResizeObserver
	let disconnectCount = 0
	let mountedCount = 0
	let updatedCount = 0

	document.addEventListener = function (
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions
	) {
		if (type === 'fullscreenchange') {
			fullscreenListeners.add(listener)
		}
		originalAdd.call(this, type, listener, options)
	}
	document.removeEventListener = function (
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions
	) {
		if (type === 'fullscreenchange') {
			fullscreenListeners.delete(listener)
		}
		originalRemove.call(this, type, listener, options)
	}
	window.ResizeObserver = class extends OriginalResizeObserver {
		constructor(callback: ResizeObserverCallback) {
			super(callback)
			observers.add(this)
		}
		disconnect() {
			disconnectCount++
			observers.delete(this)
			super.disconnect()
		}
	}

	try {
		for (let iteration = 0; iteration < 3; iteration++) {
			const ref = React.createRef<CirclePackChart>()
			const render = (value: number) => {
				const chart = React.createElement(CirclePackChart, {
					ref,
					data: [{ name: 'Application', value }],
					options: {
						width: '600px',
						height: '300px',
						animations: false,
						resizable: true,
						legend: { enabled: false },
						toolbar: { enabled: false }
					}
				})
				flushSync(() =>
					root.render(strictMode ? React.createElement(React.StrictMode, null, chart) : chart)
				)
			}
			render(10)
			const chart = ref.current!.chart!
			const holder = chart.services.domUtils.getHolder() as HTMLElement
			charts.push(chart)
			holders.push(holder)
			if (holder.isConnected && !chart.model.get('destroyed') && container.querySelector('svg')) {
				mountedCount++
			}
			render(20)
			if (ref.current!.chart === chart && chart.model.getData()[0].value === 20) {
				updatedCount++
			}
			flushSync(() => root.render(null))
		}

		// A holder whose chart still listens drops the class when nothing is fullscreen
		holders.forEach(holder => holder.classList.add('fullscreen'))
		document.dispatchEvent(new Event('fullscreenchange'))

		return {
			mountedCount,
			updatedCount,
			disconnectCount,
			activeObservers: observers.size,
			activeFullscreenListeners: fullscreenListeners.size,
			destroyedCount: charts.filter(chart => chart.model.get('destroyed')).length,
			connectedCount: holders.filter(holder => holder.isConnected).length,
			respondedCount: holders.filter(holder => !holder.classList.contains('fullscreen')).length
		}
	} finally {
		flushSync(() => root.unmount())
		container.remove()
		document.addEventListener = originalAdd
		document.removeEventListener = originalRemove
		window.ResizeObserver = OriginalResizeObserver
		for (const listener of fullscreenListeners) {
			originalRemove.call(document, 'fullscreenchange', listener)
		}
		for (const observer of observers) {
			observer.disconnect()
		}
	}
}
