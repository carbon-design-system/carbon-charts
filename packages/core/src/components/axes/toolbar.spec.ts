/*
Copyright IBM Corp. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'
import type { ScatterChart } from '@/charts/scatter'
import { options } from '@/configuration'
import { Events as ChartEvents, ToolbarControlTypes } from '@/interfaces/enums'
import type { Services } from '@/interfaces/services'
import { ChartModel } from '@/model/model'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events } from '@/services/essentials/events'
import { TestEnvironment } from '@/tests/test-environment'
import { Toolbar } from './toolbar'

global.ResizeObserver = ResizeObserver

describe('toolbar overflow focus', () => {
	let toolbar: Toolbar
	let trigger: HTMLButtonElement
	let outside: HTMLButtonElement
	let actionTarget: HTMLInputElement

	beforeEach(() => {
		const holder = document.createElement('div')
		outside = document.createElement('button')
		actionTarget = document.createElement('input')
		document.body.append(holder, outside, actionTarget)
		const services: Services = {}
		const model = new ChartModel(services)
		model.set(
			{
				holder,
				options: {
					...options.chart,
					resizable: false,
					toolbar: {
						numberOfIcons: 1,
						controls: [
							{
								type: ToolbarControlTypes.CUSTOM,
								id: 'disabled',
								title: 'Disabled',
								shouldBeDisabled: () => true
							},
							{
								type: ToolbarControlTypes.CUSTOM,
								id: 'action',
								title: 'Action',
								clickFunction: () => actionTarget.focus()
							},
							{ type: ToolbarControlTypes.CUSTOM, id: 'other', title: 'Other' }
						]
					}
				}
			},
			{ skipUpdate: true }
		)
		services.events = new Events(model, services)
		services.domUtils = new DOMUtils(model, services)
		toolbar = new Toolbar(model, services)
		toolbar.init()
		toolbar.render()
		trigger = holder.querySelector('button')!
		trigger.focus()
		trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
		expect(document.activeElement?.textContent).toBe('Action')
	})

	afterEach(() => {
		toolbar.updateOverflowMenu(false)
		document.body.replaceChildren()
	})

	it.each([false, true])('returns focus to the trigger on Escape (move first: %s)', moveFirst => {
		if (moveFirst) {
			document.activeElement!.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
			)
			expect(document.activeElement?.textContent).toBe('Other')
		}
		document.activeElement!.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
		)
		expect(toolbar.isOverflowMenuOpen()).toBe(false)
		expect(trigger.getAttribute('aria-expanded')).toBe('false')
		expect(document.activeElement).toBe(trigger)
	})

	it('keeps focus on an outside control when it closes the menu', () => {
		outside.focus()
		outside.click()
		expect(toolbar.isOverflowMenuOpen()).toBe(false)
		expect(document.activeElement).toBe(outside)
	})

	it('preserves focus set by a menu action', () => {
		;(document.activeElement as HTMLButtonElement).click()
		expect(toolbar.isOverflowMenuOpen()).toBe(false)
		expect(document.activeElement).toBe(actionTarget)
	})
})

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
		chart.services.events.dispatchEvent(ChartEvents.Toolbar.SHOW_OVERFLOW_MENU)
		const clickListener = addListener.mock.calls.find(([type]) => type === 'click')?.[1]

		chart.destroy()

		expect(clickListener).toBeDefined()
		expect(removeListener).toHaveBeenCalledWith('click', clickListener)
	})

	it('stops handling overflow menu events once the chart is destroyed', () => {
		const renderOverflowMenu = vi
			.spyOn(Toolbar.prototype, 'renderOverflowMenu')
			.mockImplementation(() => {})

		chart.destroy()
		chart.services.events.dispatchEvent(ChartEvents.Toolbar.SHOW_OVERFLOW_MENU)

		expect(renderOverflowMenu).not.toHaveBeenCalled()
	})
})
