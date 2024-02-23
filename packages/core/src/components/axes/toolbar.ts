import { select } from 'd3'
import { getProperty } from '@/tools'
import { Component } from '@/components/component'
import { Events, RenderTypes, ToolbarControlTypes } from '@/interfaces/enums'
import { sanitizeSVG, sanitizeText } from '@/utils/sanitizeHtml'

export class Toolbar extends Component {
	static buttonID = 0
	type = 'toolbar'
	renderType = RenderTypes.HTML

	// overflow menu button to control background color
	overflowButton: any

	// div options list element
	overflowMenu: any

	init() {
		const bodyOnClickHandler = () => this.updateOverflowMenu(false)

		// Grab the tooltip element
		this.services.events.addEventListener(Events.Toolbar.SHOW_OVERFLOW_MENU, () => {
			this.renderOverflowMenu()

			// hide overflow menu if user clicks on somewhere in web page
			document.body.addEventListener('click', bodyOnClickHandler)
		})

		// listen to hide overflow menu event to hide the overflow menu
		this.services.events.addEventListener(Events.Toolbar.HIDE_OVERFLOW_MENU, () => {
			// // hide overflow menu if user clicks on somewhere in web page
			document.body.removeEventListener('click', bodyOnClickHandler)
		})
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = true) {
		const container = this.getComponentContainer()
			.attr('role', 'toolbar')
			.attr('aria-label', `chart toolbar`)

		const isDataLoading = getProperty(this.getOptions(), 'data', 'loading')

		if (isDataLoading) {
			container.html('')
			// Set overflow menu to null if data is loading
			// This will render in a new overflow menu when data is done loading
			this.overflowMenu = null
		} else {
			if (!this.overflowMenu) {
				this.overflowMenu = container
					.append('div')
					.attr(
						'class',
						'cds--overflow-menu-options cds--overflow-menu--flip cds--overflow-menu-options cds--overflow-menu--flip'
					)
					.attr('tabindex', -1)
					.html(`<ul role='menu'></ul>`)
			}

			// get the toolbar buttons
			const { buttonList, overflowMenuItemList } = this.getControlConfigs()

			// overflow button is required only if overflow menu item list is valid
			if (overflowMenuItemList) {
				buttonList.push(this.getOverflowButtonConfig())
			}

			const toolbarControls = container
				.selectAll('div.toolbar-control')
				.data(buttonList, (button: any) => button.id)

			toolbarControls.exit().remove()

			const enteringToolbarControls = toolbarControls
				.enter()
				.append('div')
				.attr('class', 'toolbar-control cds--overflow-menu cds--overflow-menu')

			const self = this
			enteringToolbarControls
				.merge(toolbarControls as any)
				.classed('disabled', (d: any) => d.shouldBeDisabled())
				.attr('role', 'button')
				.attr('aria-disabled', (d: any) => d.shouldBeDisabled())
				.attr('aria-label', (d: any) => d.title)
				.html((d: any) => {
					return `
			<button
				class="cds--overflow-menu__trigger cds--overflow-menu__trigger"
				aria-haspopup="true" aria-expanded="false" id="${this.services.domUtils.generateElementIDString(
					`control-${sanitizeText(d.id)}`
				)}" aria-label="${sanitizeText(d.title)}">
				<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" class="cds--overflow-menu__icon cds--overflow-menu__icon" viewBox="0 0 32 32" aria-hidden="true">
					${sanitizeSVG(d.iconSVG.content)}
				</svg>
			</button>`
				})
				.each(function (d: any, index: number) {
					select(this)
						.select('svg')
						.style('will-change', 'transform')
						.style('width', d.iconSVG.width !== undefined ? d.iconSVG.width : '20px')
						.style('height', d.iconSVG.height !== undefined ? d.iconSVG.height : '20px')

					select(this)
						.select('button')
						.on('click', (event: CustomEvent<MouseEvent>) => {
							if (!d.shouldBeDisabled()) {
								self.triggerFunctionAndEvent(d, event, this)
							}
						})
						.on('keydown', (event: any) => {
							if ((event.key && event.key === 'Enter') || event.key === ' ') {
								event.preventDefault()
								self.triggerFunctionAndEvent(d, event, this)
							} else if (event.key && event.key === 'ArrowLeft') {
								self.focusOnPreviousEnabledToolbarItem(index)
							} else if (event.key && event.key === 'ArrowRight') {
								self.focusOnNextEnabledToolbarItem(index)
							}
						})
				})

			this.overflowButton = this.getComponentContainer().select(
				`button.cds--overflow-menu__trigger#${this.services.domUtils.generateElementIDString(
					'control-toolbar-overflow-menu'
				)}`
			)
		}
	}

	renderOverflowMenu() {
		const { overflowMenuItemList } = this.getControlConfigs()

		const overflowMenuControls = this.overflowMenu
			.select('ul')
			.selectAll('li.cds--overflow-menu-options__option')
			.data(overflowMenuItemList, (button: any) => getProperty(button, 'id'))

		overflowMenuControls.exit().remove()

		const enteringOverflowMenuControls = overflowMenuControls
			.enter()
			.append('li')
			.attr('id', (d: any) => this.services.domUtils.generateElementIDString(`control-${d.id}`))
			.attr('class', 'cds--overflow-menu-options__option cds--overflow-menu-options__option')
			.attr('role', 'menuitem')
			.attr('tabindex', 1)

		enteringOverflowMenuControls
			.append('button')
			.attr('class', 'cds--overflow-menu-options__btn cds--overflow-menu-options__btn')

		enteringOverflowMenuControls
			.merge(overflowMenuControls)
			.classed('cds--overflow-menu-options__option--disabled', (d: any) => d.shouldBeDisabled())
			.classed('cds--overflow-menu-options__option--disabled', (d: any) => d.shouldBeDisabled())
			.attr('aria-disabled', (d: any) => d.shouldBeDisabled())
			.selectAll('button')
			.text((d: any) => d.title)
	}

	isOverflowMenuOpen() {
		return this.overflowMenu.classed('is-open')
	}

	// show/hide overflow menu
	updateOverflowMenu(show: boolean) {
		if (!this.overflowMenu) {
			return
		}
		this.overflowMenu.classed('is-open', show)

		// update overflow button background
		if (this.overflowButton) {
			this.overflowButton.attr('aria-expanded', show)
			select(this.overflowButton.node().parentNode)
				.classed('cds--overflow-menu--open', show)
				.classed('cds--overflow-menu--open', show)
		}

		if (show) {
			this.services.events.dispatchEvent(Events.Toolbar.SHOW_OVERFLOW_MENU)
		} else {
			this.services.events.dispatchEvent(Events.Toolbar.HIDE_OVERFLOW_MENU)
		}
	}

	// Toolbar controllers
	focusOnPreviousEnabledToolbarItem(currentItemIndex: number) {
		const buttonList = this.getToolbarButtonItems()
		let previousItemIndex = buttonList.length

		for (let i = currentItemIndex - 1; i >= 0; i--) {
			const previousButtonItem = buttonList[i]
			if (!previousButtonItem.shouldBeDisabled()) {
				previousItemIndex = i
				break
			}
		}

		// only if previous enabled menu item found
		if (previousItemIndex < buttonList.length) {
			const previousItemNode = select(
				`button#${this.services.domUtils.generateElementIDString(
					`control-${buttonList[previousItemIndex].id}`
				)}`
			).node()
			if ('focus' in previousItemNode) {
				previousItemNode.focus()
			}
		}
	}

	focusOnNextEnabledToolbarItem(currentItemIndex: number) {
		const buttonList = this.getToolbarButtonItems()
		let nextItemIndex = -1

		for (let i = currentItemIndex + 1; i < buttonList.length; i++) {
			const nextOverflowMenuItem = buttonList[i]
			if (!nextOverflowMenuItem.shouldBeDisabled()) {
				nextItemIndex = i
				break
			}
		}

		// only if next enabled menu item found
		if (nextItemIndex > -1) {
			const nextItemNode = select(
				`button#${this.services.domUtils.generateElementIDString(
					`control-${buttonList[nextItemIndex].id}`
				)}`
			).node()

			if ('focus' in nextItemNode) {
				nextItemNode.focus()
			}
		}
	}

	focusOnPreviousEnabledMenuItem(currentItemIndex: number) {
		const overflowMenuItems = this.getOverflowMenuItems()
		let previousItemIndex = overflowMenuItems.length

		for (let i = currentItemIndex - 1; i >= 0; i--) {
			const previousOverflowMenuItem = overflowMenuItems[i]
			if (!previousOverflowMenuItem.shouldBeDisabled()) {
				previousItemIndex = i
				break
			}
		}

		// only if previous enabled menu item found
		if (previousItemIndex < overflowMenuItems.length) {
			const previousItemNode = select(
				`#${this.services.domUtils.generateElementIDString(
					`control-${overflowMenuItems[previousItemIndex].id}`
				)} button`
			).node()
			if ('focus' in previousItemNode) {
				previousItemNode.focus()
			}
		}
	}

	focusOnNextEnabledMenuItem(currentItemIndex: number) {
		const overflowMenuItems = this.getOverflowMenuItems()
		let nextItemIndex = -1

		for (let i = currentItemIndex + 1; i < overflowMenuItems.length; i++) {
			const nextOverflowMenuItem = overflowMenuItems[i]
			if (!nextOverflowMenuItem.shouldBeDisabled()) {
				nextItemIndex = i
				break
			}
		}

		// only if next enabled menu item found
		if (nextItemIndex > -1) {
			const nextItemNode = select(
				`#${this.services.domUtils.generateElementIDString(
					`control-${overflowMenuItems[nextItemIndex].id}`
				)} button`
			).node()

			if ('focus' in nextItemNode) {
				nextItemNode.focus()
			}
		}
	}

	toggleOverflowMenu(event: any) {
		if (this.isOverflowMenuOpen()) {
			// hide overflow menu
			this.updateOverflowMenu(false)
		} else {
			// show overflow menu
			this.updateOverflowMenu(true)

			// setup overflow menu item event listener
			const self = this
			const overflowMenuItems = this.getOverflowMenuItems()
			overflowMenuItems.forEach((menuItem: any, index) => {
				const element = select(
					`#${this.services.domUtils.generateElementIDString(`control-${menuItem.id}`)}`
				)
				if (element !== null) {
					element.on('click', () => {
						self.triggerFunctionAndEvent(menuItem, event, element.node())

						// hide overflow menu
						self.updateOverflowMenu(false)
					})

					element.on('keydown', (keyEvent: KeyboardEvent) => {
						if (keyEvent && keyEvent.key === 'Enter') {
							self.triggerFunctionAndEvent(menuItem, event, element.node())
						} else if (keyEvent && keyEvent.key === 'ArrowUp') {
							// focus on previous menu item
							self.focusOnPreviousEnabledMenuItem(index)
						} else if (keyEvent && keyEvent.key === 'ArrowDown') {
							// focus on next menu item
							self.focusOnNextEnabledMenuItem(index)
						} else if (keyEvent && keyEvent.key === 'Escape') {
							self.updateOverflowMenu(false)
						}

						// Not hide overflow menu by keyboard arrow up/down event
						// Prevent page from scrolling up/down
						keyEvent.preventDefault()
					})
				}
			})

			// default to focus on the first enabled menu item
			self.focusOnNextEnabledMenuItem(-1)
		}

		// propogation should not be stopped for keyboard events
		if (event) {
			event.stopImmediatePropagation()
		}
	}

	// Calls passed function && dispatches event
	triggerFunctionAndEvent(control: any, event: CustomEvent, element?: any) {
		// Check if trigger is disabled
		if (typeof control.shouldBeDisabled === 'function' && control.shouldBeDisabled()) {
			return
		}

		// Call custom function only if it exists
		if (typeof control.clickFunction === 'function') {
			control.clickFunction(event)
		}

		// Dispatch selection event
		this.services.events.dispatchEvent(Events.Toolbar.BUTTON_CLICK, {
			control,
			event,
			element
		})
	}

	getControlConfigs() {
		const numberOfIcons = getProperty(this.getOptions(), 'toolbar', 'numberOfIcons') - 1
		const controls = getProperty(this.getOptions(), 'toolbar', 'controls')
		const overflowSpecificControls: any[] = []
		const buttonList: any[] = []
		const overflowList: any[] = []

		controls.forEach((control: any) => {
			let controlConfig = null
			// check if button is custom or default control
			if (control.type === ToolbarControlTypes.CUSTOM) {
				// add generic id if missing
				if (getProperty(control, 'id') === null) {
					// add id directly to the data passed so that id isn't reassigned on rerender
					control.id = `toolbar-button-${Toolbar.buttonID++}`
				}
				// define function if missing
				if (getProperty(control, 'shouldBeDisabled') === null) {
					control.shouldBeDisabled = () => false
				}

				controlConfig = control
			} else {
				const isFullScreenMode = this.services.domUtils.isFullScreenMode()
				// toggle fullscreen configs by current display modes
				if (control.type === ToolbarControlTypes.MAKE_FULLSCREEN && isFullScreenMode) {
					control.type = ToolbarControlTypes.EXIT_FULLSCREEN
				} else if (control.type === ToolbarControlTypes.EXIT_FULLSCREEN && !isFullScreenMode) {
					control.type = ToolbarControlTypes.MAKE_FULLSCREEN
				}
				controlConfig = this.getControlConfigByType(control.type)
			}

			// add to list if config is valid
			if (controlConfig) {
				controlConfig.text = control.text ? control.text : control.type

				if (controlConfig.id.indexOf('toolbar-export') !== -1) {
					overflowSpecificControls.push(controlConfig)
				} else if (buttonList.length < numberOfIcons) {
					// check if icon exists else assign to the overflow list
					if (getProperty(controlConfig, 'iconSVG', 'content') === null) {
						overflowList.push(controlConfig)
					} else {
						buttonList.push(controlConfig)
					}
				} else {
					overflowList.push(controlConfig)
				}
			}
		})

		// Ensures the `export` controls are always at the bottom
		overflowList.push(...overflowSpecificControls)

		if (!overflowList.length) {
			return {
				buttonList
			}
		}

		return {
			buttonList,
			overflowMenuItemList: overflowList
		}
	}

	getToolbarButtonItems() {
		const { buttonList, overflowMenuItemList } = this.getControlConfigs()
		if (overflowMenuItemList) {
			buttonList.push(this.getOverflowButtonConfig())
		}
		if (buttonList) {
			return buttonList
		}

		return []
	}

	getOverflowMenuItems() {
		const { overflowMenuItemList } = this.getControlConfigs()
		if (overflowMenuItemList) {
			return overflowMenuItemList
		} else {
			return []
		}
	}

	// special button config for overflow button
	getOverflowButtonConfig() {
		return {
			id: 'toolbar-overflow-menu',
			title: 'More options',
			shouldBeDisabled: () => false,
			iconSVG: {
				content: `<circle cx="16" cy="8" r="2"></circle>
				<circle cx="16" cy="16" r="2"></circle>
				<circle cx="16" cy="24" r="2"></circle>`
			},
			clickFunction: (event: any) => this.toggleOverflowMenu(event)
		}
	}

	getControlConfigByType(controlType: ToolbarControlTypes) {
		const isZoomBarEnabled =
			this.services.zoom &&
			this.services.zoom.isZoomBarEnabled() &&
			!this.services.zoom.isEmptyState()

		const displayData = this.model.getDisplayData()
		const options = this.model.getOptions()
		const { exportAsCSV, exportAsJPG, exportAsPNG } = getProperty(
			options,
			'locale',
			'translations',
			'toolbar'
		)

		let controlConfig: any
		switch (controlType) {
			case ToolbarControlTypes.ZOOM_IN:
				if (isZoomBarEnabled) {
					controlConfig = {
						id: 'toolbar-zoomIn',
						title: 'Zoom in',
						shouldBeDisabled: () => this.services.zoom.isMinZoomDomain(),
						iconSVG: {
							content: this.getControlIconByType(controlType)
						},
						clickFunction: () => this.services.zoom.zoomIn()
					}
				}
				break
			case ToolbarControlTypes.ZOOM_OUT:
				if (isZoomBarEnabled) {
					controlConfig = {
						id: 'toolbar-zoomOut',
						title: 'Zoom out',
						shouldBeDisabled: () => this.services.zoom.isMaxZoomDomain(),
						iconSVG: {
							content: this.getControlIconByType(controlType)
						},
						clickFunction: () => this.services.zoom.zoomOut()
					}
				}
				break
			case ToolbarControlTypes.RESET_ZOOM:
				if (isZoomBarEnabled) {
					controlConfig = {
						id: 'toolbar-resetZoom',
						title: 'Reset zoom',
						shouldBeDisabled: () => this.services.zoom.isMaxZoomDomain(),
						iconSVG: {
							content: this.getControlIconByType(controlType)
						},
						clickFunction: () => this.services.zoom.resetZoomDomain()
					}
				}
				break
			case ToolbarControlTypes.MAKE_FULLSCREEN:
				controlConfig = {
					id: 'toolbar-makefullscreen',
					iconSVG: {
						content: this.getControlIconByType(controlType),
						width: '15px',
						height: '15px'
					},
					title: 'Make fullscreen',
					shouldBeDisabled: () => false,
					clickFunction: () => {
						this.services.domUtils.toggleFullscreen()
					}
				}
				break
			case ToolbarControlTypes.EXIT_FULLSCREEN:
				controlConfig = {
					id: 'toolbar-exitfullscreen',
					iconSVG: {
						content: this.getControlIconByType(controlType),
						width: '15px',
						height: '15px'
					},
					title: 'Exit fullscreen',
					shouldBeDisabled: () => false,
					clickFunction: () => {
						this.services.domUtils.toggleFullscreen()
					}
				}
				break
			case ToolbarControlTypes.SHOW_AS_DATATABLE:
				controlConfig = {
					id: 'toolbar-showasdatatable',
					iconSVG: {
						content: this.getControlIconByType(controlType)
					},
					title: 'Show as table',
					shouldBeDisabled: () => displayData.length === 0,
					clickFunction: () => this.services.events.dispatchEvent(Events.Modal.SHOW)
				}
				break
			case ToolbarControlTypes.EXPORT_CSV:
				controlConfig = {
					id: 'toolbar-export-CSV',
					title: exportAsCSV,
					shouldBeDisabled: () => false,
					iconSVG: {
						content: this.getControlIconByType(controlType)
					},
					clickFunction: () => this.model.exportToCSV()
				}
				break
			case ToolbarControlTypes.EXPORT_PNG:
				controlConfig = {
					id: 'toolbar-export-PNG',
					title: exportAsPNG,
					shouldBeDisabled: () => false,
					iconSVG: {
						content: this.getControlIconByType(controlType)
					},
					clickFunction: () => this.services.domUtils.exportToPNG()
				}
				break
			case ToolbarControlTypes.EXPORT_JPG:
				controlConfig = {
					id: 'toolbar-export-JPG',
					title: exportAsJPG,
					shouldBeDisabled: () => false,
					iconSVG: {
						content: this.getControlIconByType(controlType)
					},
					clickFunction: () => this.services.domUtils.exportToJPG()
				}
				break
			// add more toolbar control configuration here

			default:
				throw Error('Not supported toolbar control type: ' + controlType)
		}
		return controlConfig
	}

	getControlIconByType(controlType: ToolbarControlTypes) {
		switch (controlType) {
			case ToolbarControlTypes.ZOOM_IN:
				return `<polygon points="19 13 15 13 15 9 13 9 13 13 9 13 9 15 13 15 13 19 15 19 15 15 19 15 19 13"/>
						<path d="M22.45,21A10.87,10.87,0,0,0,25,14,11,11,0,1,0,14,25a10.87,10.87,0,0,0,7-2.55L28.59,30,30,28.59ZM14,23a9,9,0,1,1,9-9A9,9,0,0,1,14,23Z"/>`
			case ToolbarControlTypes.ZOOM_OUT:
				return `<rect x="9" y="13" width="10" height="2"/>
						<path d="M22.45,21A10.87,10.87,0,0,0,25,14,11,11,0,1,0,14,25a10.87,10.87,0,0,0,7-2.55L28.59,30,30,28.59ZM14,23a9,9,0,1,1,9-9A9,9,0,0,1,14,23Z"/>`
			case ToolbarControlTypes.RESET_ZOOM:
				return `<path d="M22.4478,21A10.855,10.855,0,0,0,25,14,10.99,10.99,0,0,0,6,6.4658V2H4v8h8V8H7.332a8.9768,8.9768,0,1,1-2.1,8H3.1912A11.0118,11.0118,0,0,0,14,25a10.855,10.855,0,0,0,7-2.5522L28.5859,30,30,28.5859Z"/>`
			case ToolbarControlTypes.MAKE_FULLSCREEN:
				return `<polygon points="21 2 21 4 26.59 4 17 13.58 18.41 15 28 5.41 28 11 30 11 30 2 21 2"/><polygon points="15 18.42 13.59 17 4 26.59 4 21 2 21 2 30 11 30 11 28 5.41 28 15 18.42"/>`
			case ToolbarControlTypes.EXIT_FULLSCREEN:
				return `<polygon points="4 18 4 20 10.586 20 2 28.582 3.414 30 12 21.414 12 28 14 28 14 18 4 18"/><polygon points="30 3.416 28.592 2 20 10.586 20 4 18 4 18 14 28 14 28 12 21.414 12 30 3.416"/>`
			case ToolbarControlTypes.SHOW_AS_DATATABLE:
				return `<rect x="4" y="6" width="18" height="2"/><rect x="4" y="12" width="18" height="2"/><rect x="4" y="18" width="18" height="2"/><rect x="4" y="24" width="18" height="2"/><rect x="26" y="6" width="2" height="2"/><rect x="26" y="12" width="2" height="2"/><rect x="26" y="18" width="2" height="2"/><rect x="26" y="24" width="2" height="2"/>`
			case ToolbarControlTypes.EXPORT_CSV:
				return `<path d="M22.4478,21A10.855,10.855,0,0,0,25,14,10.99,10.99,0,0,0,6,6.4658V2H4v8h8V8H7.332a8.9768,8.9768,0,1,1-2.1,8H3.1912A11.0118,11.0118,0,0,0,14,25a10.855,10.855,0,0,0,7-2.5522L28.5859,30,30,28.5859Z"/>`
			case ToolbarControlTypes.EXPORT_JPG:
				return `<path d="M22.4478,21A10.855,10.855,0,0,0,25,14,10.99,10.99,0,0,0,6,6.4658V2H4v8h8V8H7.332a8.9768,8.9768,0,1,1-2.1,8H3.1912A11.0118,11.0118,0,0,0,14,25a10.855,10.855,0,0,0,7-2.5522L28.5859,30,30,28.5859Z"/>`
			case ToolbarControlTypes.EXPORT_PNG:
				return `<path d="M22.4478,21A10.855,10.855,0,0,0,25,14,10.99,10.99,0,0,0,6,6.4658V2H4v8h8V8H7.332a8.9768,8.9768,0,1,1-2.1,8H3.1912A11.0118,11.0118,0,0,0,14,25a10.855,10.855,0,0,0,7-2.5522L28.5859,30,30,28.5859Z"/>` // add more icons here
			// svg icon must be with 32x32 viewBox

			default:
				throw Error('Not supported toolbar control type: ' + controlType)
		}
	}
}
