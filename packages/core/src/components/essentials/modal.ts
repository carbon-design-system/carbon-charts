import { Component } from '../component';
import { Tools } from '../../tools';
import { DOMUtils } from '../../services';
import { ChartModel } from '../../model';
import { Events, ScaleTypes } from '../../interfaces';

// Carbon modal
import { Modal as CarbonModalComponent } from 'carbon-components';

// import the settings for the css prefix
import settings from 'carbon-components/es/globals/js/settings';

// D3 Imports
import { select } from 'd3-selection';

// date formatting
import { format } from 'date-fns';

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

	handleHideModal = () => {};

	addEventListeners() {
		// listen to show-modal Custom Events to render the modal
		this.services.events.addEventListener(
			Events.Modal.SHOW,
			this.handleShowModal
		);

		// listen to hide-modal Custom Events to hide the modal
		this.services.events.addEventListener(
			Events.Modal.HIDE,
			this.handleHideModal
		);
	}

	removeEventListeners() {
		// remove show-modal Custom Events
		this.services.events.removeEventListener(
			Events.Modal.SHOW,
			this.handleShowModal
		);

		// remove hide-modal Custom Events
		this.services.events.removeEventListener(
			Events.Modal.HIDE,
			this.handleHideModal
		);
	}

	// get the scales information
	assignRangeAndDomains() {
		const { cartesianScales } = this.services;
		const options = this.model.getOptions();
		const isDualAxes = cartesianScales.isDualAxes();

		const scales = {
			primaryDomain: cartesianScales.domainAxisPosition,
			primaryRange: cartesianScales.rangeAxisPosition,
			secondaryDomain: null,
			secondaryRange: null,
		};
		if (isDualAxes) {
			scales.secondaryDomain =
				cartesianScales.secondaryDomainAxisPosition;
			scales.secondaryRange = cartesianScales.secondaryRangeAxisPosition;
		}

		Object.keys(scales).forEach((scale) => {
			const position = scales[scale];
			if (cartesianScales.scales[position]) {
				scales[scale] = {
					position: position,
					label: cartesianScales.getScaleLabel(position),
					identifier: Tools.getProperty(
						options,
						'axes',
						position,
						'mapsTo'
					),
				};
			} else {
				scales[scale] = null;
			}
		});

		return scales;
	}

	getModalHTML() {
		const displayData = this.model.getDisplayData();
		const options = this.model.getOptions();
		const { groupMapsTo } = options.data;

		const { cartesianScales } = this.services;
		const {
			primaryDomain,
			primaryRange,
			secondaryDomain,
			secondaryRange,
		} = this.assignRangeAndDomains();

		const domainScaleType = cartesianScales.getDomainAxisScaleType();
		let domainValueFormatter;
		if (domainScaleType === ScaleTypes.TIME) {
			domainValueFormatter = (d) => format(d, 'MMM d, yyyy');
		}

		const chartprefix = Tools.getProperty(options, 'style', 'prefix');

		return `
		<div class="bx--modal-container">
			<div class="bx--modal-header">
				<p class="bx--modal-header__label bx--type-delta">Tabular representation</p>
				<p class="bx--modal-header__heading bx--type-beta">${options.title}</p>
				<button class="bx--modal-close" type="button" data-modal-close aria-label="close modal"  data-modal-primary-focus>
					<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Close" width="20" height="20" viewBox="0 0 32 32" role="img" class="bx--modal-close__icon">
						<path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
					</svg>
				</button>
			</div>
			<div class="bx--modal-content"><table class="bx--data-table bx--data-table--no-border">
					<thead>
						<tr>
							<th scope="col">
								<div class="bx--table-header-label">Group</div>
							</th>
							<th scope="col">
								<div class="bx--table-header-label">${primaryDomain.label}</div>
							</th>
							<th scope="col">
								<div class="bx--table-header-label">${primaryRange.label}</div>
							</th>
							${
								secondaryDomain
									? `<th scope="col"><div class="bx--table-header-label">${secondaryDomain.label}</div></th>`
									: ``
							}
							${
								secondaryRange
									? `<th scope="col"><div class="bx--table-header-label">${secondaryRange.label}</div></th>`
									: ``
							}
						</tr>
					</thead>
					<tbody>${displayData
						.map(
							(datum) => `
							<tr>
								<td>${datum[groupMapsTo]}</td>
								<td>${
									datum[primaryDomain.identifier] === null
										? '&ndash;'
										: domainValueFormatter
										? domainValueFormatter(
												datum[primaryDomain.identifier]
										  )
										: datum[primaryDomain.identifier]
								}</td>
										<td>${
											datum[primaryRange.identifier] ===
												null ||
											isNaN(
												datum[primaryRange.identifier]
											)
												? '&ndash;'
												: datum[
														primaryRange.identifier
												  ].toLocaleString()
										}</td>
								${
									secondaryDomain
										? `<td>${
												datum[
													secondaryDomain.identifier
												] === null
													? '&ndash;'
													: datum[
															secondaryDomain
																.identifier
													  ]
										  }
								</td>`
										: ''
								}
								${
									secondaryRange
										? `<td>${
												datum[
													secondaryRange.identifier
												] === null ||
												isNaN(
													datum[
														secondaryRange
															.identifier
													]
												)
													? '&ndash;'
													: datum[
															secondaryRange
																.identifier
													  ]
										  }
								</td>`
										: ''
								}
							</tr>
						`
						)
						.join('')}
					</tbody>
				</table>
			</div>
			<div class="bx--modal-footer">
			  <div class="${settings.prefix}--${chartprefix}-modal-footer-spacer"></div>
			  <button class="bx--btn bx--btn--primary" type="button" data-modal-primary-focus>Download as CSV</button>
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
				.attr('class', 'bx--modal')
				.attr('role', 'dialog')
				.attr('aria-modal', true)
				.attr('aria-labelledby', 'modal-5ppouesvfhc-label')
				.attr('aria-describedby', 'modal-5ppouesvfhc-heading')
				.attr('tabindex', -1);
		}
	}

	destroy() {
		// remove tooltip eventListener
		this.removeEventListeners();
		this.isEventListenerAdded = false;
	}
}
