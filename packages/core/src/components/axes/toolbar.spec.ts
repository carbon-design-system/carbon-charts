/*
Copyright IBM Corp. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { options } from '@/configuration'
import { ToolbarControlTypes } from '@/interfaces/enums'
import type { Services } from '@/interfaces/services'
import { ChartModel } from '@/model/model'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events } from '@/services/essentials/events'
import { Toolbar } from './toolbar'

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
