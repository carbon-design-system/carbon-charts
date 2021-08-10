import { Tools } from '../../tools';
import { Modal } from './modal';

// import the settings for the css prefix
import settings from 'carbon-components/es/globals/js/settings';

import { get } from 'lodash-es';

export class BinnedModal extends Modal {
	type = 'modal-binned';

	getModalHTML() {
		const options = this.model.getOptions();
		const { groupMapsTo } = options.data;

		const chartprefix = Tools.getProperty(options, 'style', 'prefix');

		const binnedStackedData = this.model.getBinnedStackedData();

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
			<div class="bx--modal-content">
				<table class="bx--data-table bx--data-table--no-border">
					<thead>
						<tr>
							<th scope="col">
								<div class="bx--table-header-label">Range</div>
							</th>
							${binnedStackedData
								.map(
									(datum) => `<th scope="col">
									<div class="bx--table-header-label">${get(datum, `0.${groupMapsTo}`)}</div>
								</th>`
								)
								.join('')}
						</tr>
					</thead>
					<tbody>${get(binnedStackedData, 0)
						.map(
							(d, i) => `
							<tr>
								<td>${get(d, 'data.x0')} - ${get(d, 'data.x1')}</td>
								${binnedStackedData.map(
									(datum) =>
										`<td>${get(
											datum[i],
											`data.${get(datum[i], groupMapsTo)}`
										)}</td>`
								)}
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
}
