import { select, type Selection } from 'd3'
import { get } from 'lodash-es'
import { Modal as CarbonModalComponent } from 'carbon-components' // /es/components/modal
import { getProperty } from '@/tools'
import { carbonPrefix } from '@/configuration-non-customizable' // CSS prefix
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import type { ChartModel } from '@/model/model'
import type { ChartOptions } from '@/interfaces/charts'
import { Events } from '@/interfaces/enums'
import { sanitizeText } from '@/utils/sanitizeHtml'

export class Modal extends Component {
	type = 'modal'

	// flag for checking whether tooltip event listener is added or not
	isEventListenerAdded = false
	modal: any

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs)

		this.init()
	}

	handleShowModal = () => {
		const id = this.services.domUtils.getChartID()
		this.modal
			.attr('data-modal', true)
			.attr('class', 'cds--modal')
			.attr('role', 'dialog')
			.attr('aria-modal', true)
			.attr('aria-labelledby', `${id}__modal-title`)
			.attr('aria-describedby', `${id}__modal-description`)
			.attr('tabindex', -1)

		this.modal.html(this.getModalHTML())
		this.modal
			.select('div.cds--modal-footer button.cds--btn')
			.on('click', () => this.model.exportToCSV())

		const modalInstance = CarbonModalComponent.create(this.modal.node())
		modalInstance.show()

		//catches when modal gets closed
		document.addEventListener('modal-hidden', this.handleHideModal)
	}

	handleHideModal = () => {
		this.modal
			.attr('role', null)
			.attr('aria-modal', null)
			.attr('aria-labelledby', null)
			.attr('aria-describedby', null)
			.attr('tabindex', null)

		//removes event listener when modal is closed
		document.removeEventListener('modal-hidden', this.handleHideModal)
	}

	addEventListeners() {
		// listen to show-modal Custom Events to render the modal
		this.services.events.addEventListener(Events.Modal.SHOW, this.handleShowModal)
	}

	removeEventListeners() {
		// remove show-modal Custom Events
		this.services.events.removeEventListener(Events.Modal.SHOW, this.handleShowModal)
	}

	getModalHTML() {
		const id = this.services.domUtils.getChartID()

		const options = this.model.getOptions()

		const { title, downloadAsCSV } = getProperty(options, 'locale', 'translations', 'tabularRep')

		const chartprefix = getProperty(options, 'style', 'prefix')

		const tableArray = this.model.getTabularDataArray()

		return `
		<div class="cds--modal-container">
			<div class="cds--modal-header">

				<p class="cds--modal-header__label cds--type-delta" id="modal-title">${title}</p>

				<p class="cds--modal-header__heading cds--type-beta" id="${id}__modal-description">${sanitizeText(
					options.title
				)}</p>

				<button class="cds--modal-close" type="button" data-modal-close aria-label="close modal"  data-modal-primary-focus>
					<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Close" width="20" height="20" viewBox="0 0 32 32" role="img" class="cds--modal-close__icon">
						<path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
					</svg>
				</button>
			</div>

			<div class="cds--modal-content">
				<table class="cds--data-table cds--data-table--no-border">
					<thead>
						<tr>
							${get(tableArray, 0)
								.map(
									(heading: any) => `<th scope="col">
								<div class="cds--table-header-label">${sanitizeText(heading)}</div>
							</th>`
								)
								.join('')}
						</tr>
					</thead>

					<tbody>${tableArray
						.slice(1)
						.map(
							(row: any) => `
							<tr>
								${row.map((column: any) => `<td>${sanitizeText(column)}</td>`).join('')}
							</tr>`
						)
						.join('')}
					</tbody>
				</table>
			</div>

			<div class="cds--modal-footer">
			  <div class="${carbonPrefix}--${chartprefix}-modal-footer-spacer"></div>
			  <button class="cds--btn cds--btn--primary" type="button" data-modal-primary-focus>${downloadAsCSV}</button>
			</div>
		</div>`
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = false) {
		const options = this.model.getOptions() as ChartOptions
		if (!this.isEventListenerAdded) {
			// Grab the tooltip element
			const holder = select(this.services.domUtils.getHolder()) as Selection<
				HTMLDivElement,
				any,
				Element,
				any
			>
			const chartprefix = getProperty(options, 'style', 'prefix') as string
			this.modal = DOMUtils.appendOrSelect(holder, `div.${carbonPrefix}--${chartprefix}--modal`)

			this.addEventListeners()
			this.isEventListenerAdded = true
		}
	}

	destroy() {
		// remove tooltip eventListener
		this.removeEventListeners()
		this.isEventListenerAdded = false
	}
}
