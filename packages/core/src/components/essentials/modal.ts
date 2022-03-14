import { Component } from '../component';
import { Tools } from '../../tools';
import { DOMUtils } from '../../services';
import { ChartModel } from '../../model/model';
import { Events } from '../../interfaces';

// Carbon modal
import { Modal as CarbonModalComponent } from 'carbon-components';

// import the settings for the css prefix
import settings from 'carbon-components/es/globals/js/settings';

// D3 Imports
import { select } from 'd3-selection';

import { get } from 'lodash-es';

export class Modal extends Component {
	type = 'modal';

	// flag for checking whether tooltip event listener is added or not
	isEventListenerAdded = false;
	modal: any;

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);

		this.init();
	}

	handleShowModal = () => {
		this.modal.html(this.getModalHTML());
		this.modal
			.select('div.bx--modal-footer button.bx--btn')
			.on('click', () => this.model.exportToCSV());

		const modalInstance = CarbonModalComponent.create(this.modal.node());
		modalInstance.show();
	};

	addEventListeners() {
		// listen to show-modal Custom Events to render the modal
		this.services.events.addEventListener(
			Events.Modal.SHOW,
			this.handleShowModal
		);
	}

	removeEventListeners() {
		// remove show-modal Custom Events
		this.services.events.removeEventListener(
			Events.Modal.SHOW,
			this.handleShowModal
		);
	}

	getModalHTML() {
		const options = this.model.getOptions();

		const chartprefix = Tools.getProperty(options, 'style', 'prefix');

		const tableArray = this.model.getTabularDataArray();

		return `
		<div class="bx--modal-container cds--modal-container">
			<div class="bx--modal-header cds--modal-header">
				<p class="bx--modal-header__label bx--type-delta cds--modal-header__label cds--type-delta" id="modal-title">Tabular representation</p>

				<p class="bx--modal-header__heading bx--type-beta cds--modal-header__heading cds--type-beta" id="modal-description">${
					options.title
				}</p>

				<button class="bx--modal-close cds--modal-close" type="button" data-modal-close aria-label="close modal"  data-modal-primary-focus>
					<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Close" width="20" height="20" viewBox="0 0 32 32" role="img" class="bx--modal-close__icon cds--modal-close__icon">
						<path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
					</svg>
				</button>
			</div>

			<div class="bx--modal-content cds--modal-content">
				<table class="bx--data-table bx--data-table--no-border cds--data-table cds--data-table--no-border">
					<thead>
						<tr>
							${get(tableArray, 0)
								.map(
									(heading) => `<th scope="col">
								<div class="bx--table-header-label cds--table-header-label">${heading}</div>
							</th>`
								)
								.join('')}
						</tr>
					</thead>

					<tbody>${tableArray
						.slice(1)
						.map(
							(row) => `
							<tr>
								${row.map((column) => `<td>${column}</td>`).join('')}
							</tr>`
						)
						.join('')}
					</tbody>
				</table>
			</div>

			<div class="bx--modal-footer cds--modal-footer">
			  <div class="${settings.prefix}--${chartprefix}-modal-footer-spacer"></div>
			  <button class="bx--btn bx--btn--primary cds--btn cds--btn--primary" type="button" data-modal-primary-focus>Download as CSV</button>
			</div>
		</div>`;
	}

	render() {
		const options = this.model.getOptions();
		if (!this.isEventListenerAdded) {
			// Grab the tooltip element
			const holder = select(this.services.domUtils.getHolder());
			const chartprefix = Tools.getProperty(options, 'style', 'prefix');
			this.modal = DOMUtils.appendOrSelect(
				holder,
				`div.${settings.prefix}--${chartprefix}--modal`
			);

			this.addEventListeners();
			this.isEventListenerAdded = true;
			this.modal
				.attr('data-modal', true)
				.attr('class', 'bx--modal cds--modal')
				.attr('role', 'dialog')
				.attr('aria-modal', true)
				.attr('aria-labelledby', 'modal-title')
				.attr('aria-describedby', 'modal-description')
				.attr('tabindex', -1);
		}
	}

	destroy() {
		// remove tooltip eventListener
		this.removeEventListeners();
		this.isEventListenerAdded = false;
	}
}
