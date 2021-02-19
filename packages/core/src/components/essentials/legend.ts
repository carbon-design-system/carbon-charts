// Internal Imports
import { Component } from '../component';
import { Tools } from '../../tools';
import { ColorClassNameTypes } from '../../interfaces/enums';
import {
	LegendOrientations,
	Roles,
	Events,
	TruncationTypes,
} from '../../interfaces';
import { DOMUtils } from '../../services';
import * as Configuration from '../../configuration';

// D3 Imports
import { select, event } from 'd3-selection';

export class Legend extends Component {
	type = 'legend';

	render() {
		const svg = this.getContainerSVG()
			.attr('role', Roles.GROUP)
			.attr('data-name', 'legend-items');
		const options = this.getOptions();
		const legendOptions = Tools.getProperty(options, 'legend');
		let dataGroups = this.model.getDataGroups();
		const legendOrder = Tools.getProperty(legendOptions, 'order');

		if (legendOrder) {
			dataGroups = this.sortDataGroups(dataGroups, legendOrder);
		}

		const legendItems = svg
			.selectAll('g.legend-item')
			.data(dataGroups, (dataGroup) => dataGroup.name);

		// this.getLegendItemArray()

		const addedLegendItems = legendItems
			.enter()
			.append('g')
			.classed('legend-item', true)
			.classed('active', function (d, i) {
				return d.status === Configuration.legend.items.status.ACTIVE;
			});

		// Configs
		const checkboxRadius = Configuration.legend.checkbox.radius;

		// Truncation
		// get user provided custom values for truncation
		const truncationType = Tools.getProperty(
			legendOptions,
			'truncation',
			'type'
		);
		const truncationThreshold = Tools.getProperty(
			legendOptions,
			'truncation',
			'threshold'
		);
		const truncationNumCharacter = Tools.getProperty(
			legendOptions,
			'truncation',
			'numCharacter'
		);

		const paletteOption = Tools.getProperty(
			options,
			'color',
			'pairing',
			'option'
		);

		const legendClickable = Tools.getProperty(
			this.getOptions(),
			'legend',
			'clickable'
		);
		svg.classed('clickable', legendClickable);

		addedLegendItems
			.append('rect')
			.classed('checkbox', true)
			.merge(legendItems.select('rect.checkbox'))
			.attr('role', Roles.CHECKBOX)
			.attr('tabindex', legendClickable ? 0 : -1)
			.attr('aria-label', (d) => d.name)
			.attr(
				'aria-checked',
				({ status }) =>
					status === Configuration.legend.items.status.ACTIVE
			)
			.attr('width', checkboxRadius * 2)
			.attr('height', checkboxRadius * 2)
			.attr('rx', 1)
			.attr('ry', 1)
			.attr('class', (d, i) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: d.name,
					originalClassName: 'checkbox',
				})
			)
			.style('fill', (d) =>
				d.status === Configuration.legend.items.status.ACTIVE
					? this.model.getFillColor(d.name) ||
					  this.model.getStrokeColor(d.name)
					: null
			)
			.classed('active', function (d, i) {
				return d.status === Configuration.legend.items.status.ACTIVE;
			});
		const addedLegendItemsText = addedLegendItems
			.append('text')
			.merge(legendItems.select('text'));

		// truncate the legend label if it's too long
		if (truncationType !== TruncationTypes.NONE) {
			addedLegendItemsText.html(function (d) {
				if (d.name.length > truncationThreshold) {
					return Tools.truncateLabel(
						d.name,
						truncationType,
						truncationNumCharacter
					);
				} else {
					return d.name;
				}
			});
		} else {
			addedLegendItemsText.html((d) => d.name);
		}

		this.breakItemsIntoLines(addedLegendItems);

		// Remove old elements as needed.
		legendItems
			.exit()
			.on('mouseover', null)
			.on('click', null)
			.on('mouseout', null)
			.remove();

		if (legendClickable && addedLegendItems.size() > 0) {
			this.addEventListeners();
		}

		const alignment = Tools.getProperty(legendOptions, 'alignment');

		const alignmentOffset = DOMUtils.getAlignmentOffset(
			alignment,
			svg,
			this.getParent()
		);
		svg.attr('transform', `translate(${alignmentOffset}, 0)`);
	}

	sortDataGroups(dataGroups, legendOrder) {
		// Sort data in user defined order
		dataGroups.sort(
			(dataA, dataB) =>
				legendOrder.indexOf(dataA.name) -
				legendOrder.indexOf(dataB.name)
		);

		// If user only defined partial ordering, ordered items are placed before unordered ones
		if (legendOrder.length < dataGroups.length) {
			const definedOrderIndex = dataGroups.length - legendOrder.length;
			const definedOrder = dataGroups.slice(definedOrderIndex);

			return definedOrder.concat(dataGroups.slice(0, definedOrderIndex));
		}
		return dataGroups;
	}

	breakItemsIntoLines(addedLegendItems) {
		const self = this;
		const svg = this.getContainerSVG();
		const options = this.getOptions();

		// Configs
		const checkboxRadius = Configuration.legend.checkbox.radius;
		const legendItemsHorizontalSpacing =
			Configuration.legend.items.horizontalSpace;
		const legendItemsVerticalSpacing =
			Configuration.legend.items.verticalSpace;
		const legendTextYOffset = Configuration.legend.items.textYOffset;
		const spaceNeededForCheckbox =
			checkboxRadius * 2 + Configuration.legend.checkbox.spaceAfter;

		// Check if there are disabled legend items
		const { DISABLED } = Configuration.legend.items.status;
		const dataGroups = this.model.getDataGroups();
		const hasDeactivatedItems = dataGroups.some(
			(dataGroup) => dataGroup.status === DISABLED
		);

		const legendOrientation = Tools.getProperty(
			options,
			'legend',
			'orientation'
		);

		// Keep track of line numbers and positions
		let startingPoint = 0;
		let lineNumber = 0;
		let itemIndexInLine = 0;
		let lastYPosition;
		addedLegendItems
			.merge(svg.selectAll('g.legend-item'))
			.each(function (d, i) {
				const legendItem = select(this);
				const previousLegendItem = select(
					svg.selectAll('g.legend-item').nodes()[i - 1]
				);

				if (
					itemIndexInLine === 0 ||
					previousLegendItem.empty() ||
					legendOrientation === LegendOrientations.VERTICAL
				) {
					if (
						legendOrientation === LegendOrientations.VERTICAL &&
						i !== 0
					) {
						lineNumber++;
					}
				} else {
					const svgDimensions = DOMUtils.getSVGElementSize(
						self.parent,
						{ useAttr: true }
					);
					const legendItemTextDimensions = DOMUtils.getSVGElementSize(
						select(this).select('text'),
						{ useBBox: true }
					);
					const lastLegendItemTextDimensions = DOMUtils.getSVGElementSize(
						previousLegendItem.select('text'),
						{ useBBox: true }
					);
					startingPoint =
						startingPoint +
						lastLegendItemTextDimensions.width +
						spaceNeededForCheckbox +
						legendItemsHorizontalSpacing;

					if (
						startingPoint +
							spaceNeededForCheckbox +
							legendItemTextDimensions.width >
						svgDimensions.width
					) {
						lineNumber++;
						startingPoint = 0;
						itemIndexInLine = 0;
					}
				}

				const yOffset = 0;

				// Position checkbox
				// TODO - Replace with layout component margins
				legendItem
					.select('rect.checkbox')
					.attr('x', startingPoint)
					.attr(
						'y',
						yOffset + lineNumber * legendItemsVerticalSpacing
					);

				// Position text
				// TODO - Replace with layout component margins
				const yPosition =
					legendTextYOffset + lineNumber * legendItemsVerticalSpacing;
				legendItem
					.select('text')
					.attr('x', startingPoint + spaceNeededForCheckbox)
					.attr('y', yOffset + yPosition + 3);

				lastYPosition = yPosition;

				// Test if legendItems are placed in the correct direction
				const testHorizontal =
					(!legendOrientation ||
						legendOrientation === LegendOrientations.HORIZONTAL) &&
					legendItem.select('rect.checkbox').attr('y') === '0';

				const testVertical =
					legendOrientation === LegendOrientations.VERTICAL &&
					legendItem.select('rect.checkbox').attr('x') === '0';

				const hasCorrectLegendDirection =
					testHorizontal || testVertical;

				// Render checkbox check icon
				if (
					hasDeactivatedItems &&
					legendItem.select('g.check').empty() &&
					hasCorrectLegendDirection
				) {
					legendItem.append('g').classed('check', true).html(`
							<svg focusable="false" preserveAspectRatio="xMidYMid meet"
								xmlns="http://www.w3.org/2000/svg" width="32" height="32"
								viewBox="0 0 32 32" aria-hidden="true"
								style="will-change: transform;">
								<path d="M13 21.2l-7.1-7.1-1.4 1.4 7.1 7.1L13 24 27.1 9.9l-1.4-1.5z"></path>
								<title>Checkmark</title>
							</svg>
						`);

					legendItem
						.select('g.check svg')
						.attr('width', checkboxRadius * 2 - 1)
						.attr('height', checkboxRadius * 2 - 1)
						.attr(
							'x',
							parseFloat(
								legendItem.select('rect.checkbox').attr('x')
							) + 0.5
						)
						.attr(
							'y',
							parseFloat(
								legendItem.select('rect.checkbox').attr('y')
							) + 0.5
						);
				} else if (
					!hasDeactivatedItems &&
					!legendItem.select('g.check').empty()
				) {
					legendItem.select('g.check').remove();
				}

				itemIndexInLine++;
			});
	}

	addEventListeners() {
		const self = this;
		const svg = this.getContainerSVG();
		const options = this.getOptions();
		const legendOptions = Tools.getProperty(options, 'legend');
		const truncationThreshold = Tools.getProperty(
			legendOptions,
			'truncation',
			'threshold'
		);

		svg.selectAll('g.legend-item')
			.on('mouseover', function () {
				self.services.events.dispatchEvent(Events.Legend.ITEM_HOVER, {
					hoveredElement: select(this),
				});

				// Configs
				const checkboxRadius = Configuration.legend.checkbox.radius;
				const hoveredItem = select(this);
				hoveredItem.select('rect.checkbox').classed('hovered', true);

				hoveredItem
					.append('rect')
					.classed('hover-stroke', true)
					.attr(
						'x',
						parseFloat(
							hoveredItem.select('rect.checkbox').attr('x')
						) - 2
					)
					.attr(
						'y',
						parseFloat(
							hoveredItem.select('rect.checkbox').attr('y')
						) - 2
					)
					.attr('width', checkboxRadius * 2 + 4)
					.attr('height', checkboxRadius * 2 + 4)
					.attr('rx', 3)
					.attr('ry', 3)
					.lower();

				const hoveredItemData = hoveredItem.datum() as any;
				if (hoveredItemData.name.length > truncationThreshold) {
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						hoveredElement: hoveredItem,
						content: hoveredItemData.name,
					});
				}
			})
			.on('mousemove', function () {
				self.services.events.dispatchEvent(Events.Tooltip.MOVE);
			})
			.on('click', function () {
				self.services.events.dispatchEvent(Events.Legend.ITEM_CLICK, {
					clickedElement: select(this),
				});

				const clickedItem = select(this);
				const clickedItemData = clickedItem.datum() as any;

				self.model.toggleDataLabel(clickedItemData.name);
			})
			.on('mouseout', function () {
				const hoveredItem = select(this);
				hoveredItem.select('rect.hover-stroke').remove();
				hoveredItem.select('rect.checkbox').classed('hovered', false);

				self.services.events.dispatchEvent(Events.Tooltip.HIDE);

				self.services.events.dispatchEvent(
					Events.Legend.ITEM_MOUSEOUT,
					{
						hoveredElement: hoveredItem,
					}
				);
			});

		svg.selectAll('g.legend-item rect.checkbox').on('keyup', function (d) {
			if (event.key && (event.key === 'Enter' || event.key === ' ')) {
				event.preventDefault();

				self.model.toggleDataLabel(d.name);
			}
		});
	}
}
