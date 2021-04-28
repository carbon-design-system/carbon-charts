// Internal Imports
import { Component } from '../component';
import { Tools } from '../../tools';
import { ColorClassNameTypes, LegendItemType } from '../../interfaces/enums';
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

		const addedLegendItems = legendItems
			.enter()
			.append('g')
			.classed('legend-item', true)
			.classed('active', function (d, i) {
				return d.status === Configuration.legend.items.status.ACTIVE;
			});

		const legendClickable = Tools.getProperty(
			this.getOptions(),
			'legend',
			'clickable'
		);
		svg.classed('clickable', legendClickable);

		const checkboxRadius = Configuration.legend.checkbox.radius;

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

		this.truncateLegendText(addedLegendItemsText);

		// Keep track of line numbers and positions
		const itemConfig = {
			startingPoint: 0,
			itemIndexInLine: 0,
			lineNumber: 0,
			lastLegendItemTextWidth: 0,
		};

		this.breakItemsIntoLines(addedLegendItems, 'legend-item', itemConfig);

		const additionalItemsOption = Tools.getProperty(
			options,
			'legend',
			'additionalItems'
		);

		// add additional legend items
		if (additionalItemsOption && dataGroups.length) {
			const self = this;

			const additionalItems = svg
				.selectAll('g.additional-item')
				.data(additionalItemsOption);

			additionalItems.exit().remove();

			const addedAdditionalItems = additionalItems
				.enter()
				.append('g')
				.merge(additionalItems)
				.classed('additional-item', true);

			// remove nested child elements that no longer needed
			addedAdditionalItems.selectAll('*').remove();

			// get index of item with same type to assign distinct classname
			let previousType;
			let indexOfItem = 1;

			// add different type of legend items
			addedAdditionalItems
				.append('g')
				.classed('icon', true)
				.each(function (d, i) {
					const additionalItem = select(this);

					if (!previousType || previousType != d.type) {
						previousType = d.type;
						indexOfItem = 1;
					} else {
						indexOfItem++;
					}

					self.addAdditionalItem(additionalItem, d, indexOfItem);
				});
			const addedAdditionalItemsText = addedAdditionalItems
				.append('text')
				.merge(addedAdditionalItems.select('text'));

			self.truncateLegendText(addedAdditionalItemsText);
			this.breakItemsIntoLines(
				addedAdditionalItems,
				'additional-item',
				itemConfig
			);
		}

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

	addAdditionalItem(additionalItem, itemConfig, indexOfItem) {
		const { width, height } = Configuration.legend.area;

		if (itemConfig.type === LegendItemType.RADIUS) {
			const { iconData, fill, stroke } = Configuration.legend.radius;

			const circleEnter = additionalItem
				.attr('fill', 'none')
				.selectAll('circle')
				.data(iconData)
				.enter();

			circleEnter
				.append('circle')
				.classed('radius', true)
				.attr('role', Roles.IMG)
				.attr('aria-label', 'radius')
				.attr('cx', (d) => d.cx)
				.attr('cy', (d) => d.cy)
				.attr('r', (d) => d.r)
				.style('fill', itemConfig.fill ? itemConfig.fill : fill)
				.style(
					'stroke',
					itemConfig.stroke ? itemConfig.stroke : stroke
				);
		} else if (itemConfig.type === LegendItemType.LINE) {
			const lineConfig = Configuration.legend.line;

			if (additionalItem.select('line.line').empty()) {
				additionalItem
					.append('line')
					.classed(`line-${indexOfItem}`, true)
					.attr('role', Roles.IMG)
					.attr('aria-label', 'line')
					.attr('x1', 0)
					.attr('y1', lineConfig.yPosition)
					.attr('x2', width)
					.attr('y2', lineConfig.yPosition)
					.style(
						'stroke',
						itemConfig.stroke
							? itemConfig.stroke
							: lineConfig.stroke
					)
					.style('stroke-width', lineConfig.strokeWidth);
			}
		} else if (itemConfig.type === LegendItemType.AREA) {
			if (additionalItem.select('rect.area').empty()) {
				additionalItem
					.append('rect')
					.classed(`area-${indexOfItem}`, true)
					.attr('role', Roles.IMG)
					.attr('aria-label', 'area')
					.attr('width', width)
					.attr('height', height)
					.style(
						'fill',
						indexOfItem > 3 && !itemConfig.fill
							? Configuration.legend.area.fill
							: itemConfig.fill
					)
					.style('stroke', itemConfig.stroke);
			}
		} else if (itemConfig.type === LegendItemType.SIZE) {
			const { iconData, fill, stroke } = Configuration.legend.size;

			const sizeEnter = additionalItem
				.attr('fill', 'none')
				.attr('role', Roles.IMG)
				.attr('aria-label', 'size')
				.selectAll('rect')
				.data(iconData)
				.enter();

			sizeEnter
				.append('rect')
				.classed('size', true)
				.attr('width', (d) => d.width)
				.attr('height', (d) => d.height)
				.attr('y', (d) => 24 - d.height)
				.style('fill', itemConfig.fill ? itemConfig.fill : fill)
				.style('stroke', itemConfig.stroke ? itemConfig.stroke : stroke)
				.style('stroke-width', 1);
		} else if (itemConfig.type === LegendItemType.QUARTILE) {
			const { iconData } = Configuration.legend.quartile;

			const quartileEnter = additionalItem
				.selectAll('rect')
				.attr('role', Roles.IMG)
				.attr('aria-label', 'quartile')
				.data(iconData)
				.enter();

			quartileEnter
				.append('rect')
				.attr(
					'class',
					(d, i) => `quartile-${i === 0 ? 'wrapper' : 'line'}`
				)
				.attr('x', (d) => d.x)
				.attr('y', (d) => d.y)
				.attr('width', (d) => d.width)
				.attr('height', (d) => d.height);
		}
	}

	truncateLegendText(addedLegendItemsText) {
		const trucationOptions = Tools.getProperty(
			this.getOptions(),
			'legend',
			'truncation'
		);
		// Truncation
		// get user provided custom values for truncation
		const truncationType = Tools.getProperty(trucationOptions, 'type');
		const truncationThreshold = Tools.getProperty(
			trucationOptions,
			'threshold'
		);
		const truncationNumCharacter = Tools.getProperty(
			trucationOptions,
			'numCharacter'
		);

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
	}

	breakItemsIntoLines(addedLegendItems, className, itemConfig) {
		const self = this;
		const svg = this.getContainerSVG();

		// Check if there are disabled legend items
		const { DISABLED } = Configuration.legend.items.status;
		const dataGroups = this.model.getDataGroups();
		const hasDeactivatedItems = dataGroups.some(
			(dataGroup) => dataGroup.status === DISABLED
		);

		addedLegendItems
			.merge(svg.selectAll(`g.${className}`))
			.each(function (d) {
				const legendItem = select(this);
				const svgDimensions = DOMUtils.getSVGElementSize(self.parent, {
					useAttr: true,
				});

				// Set item position based on item type
				if (!d.type) {
					itemConfig.hasDeactivatedItems = hasDeactivatedItems;
					self.setLegendItemPosition(
						legendItem,
						svgDimensions,
						itemConfig,
						LegendItemType.CHECKBOX
					);
				} else {
					self.setLegendItemPosition(
						legendItem,
						svgDimensions,
						itemConfig,
						d.type
					);
				}
			});
	}

	setLegendItemPosition(
		legendItem,
		parentSVGDimension,
		itemConfig,
		itemType
	) {
		const legendOrientation = Tools.getProperty(
			this.getOptions(),
			'legend',
			'orientation'
		);

		// Configs
		const legendItemsHorizontalSpacing =
			Configuration.legend.items.horizontalSpace;
		const legendItemsVerticalSpacing =
			Configuration.legend.items.verticalSpace;

		const legendTextYOffset = Configuration.legend.items.textYOffset;
		const iconWidth =
			itemType === LegendItemType.CHECKBOX ||
			itemType === LegendItemType.RADIUS
				? Configuration.legend.checkbox.radius * 2
				: Configuration.legend.area.width;
		const spaceAfter = Configuration.legend.items.spaceAfter;

		const legendItemTextDimensions = DOMUtils.getSVGElementSize(
			legendItem.select('text'),
			{ useBBox: true }
		);
		const translateOffset = Configuration.legend.area.width / 2 - 1;
		// Check and update position
		if (
			itemConfig.itemIndexInLine === 0 ||
			itemConfig.lastLegendItemTextWidth === 0 ||
			legendOrientation === LegendOrientations.VERTICAL
		) {
			if (itemConfig.itemIndexInLine > 0) {
				itemConfig.lineNumber++;
			}
		} else {
			itemConfig.startingPoint +=
				itemConfig.lastLegendItemTextWidth +
				iconWidth +
				spaceAfter +
				legendItemsHorizontalSpacing;

			// Place legends in a new line if space is not enough
			if (
				itemConfig.startingPoint +
					iconWidth +
					spaceAfter +
					legendItemTextDimensions.width >
				parentSVGDimension.width
			) {
				itemConfig.lineNumber++;
				itemConfig.startingPoint =
					iconWidth === 24 ? translateOffset : 0;
				itemConfig.itemIndexInLine = 0;
			}
		}

		itemConfig.lastLegendItemTextWidth = legendItemTextDimensions.width;

		const yPosition = itemConfig.lineNumber * legendItemsVerticalSpacing;
		const yTextPosition = legendTextYOffset + yPosition + 3;

		if (itemType === LegendItemType.CHECKBOX) {
			legendItem
				.select('rect.checkbox')
				.attr('x', itemConfig.startingPoint)
				.attr('y', yPosition);

			// Position text
			legendItem
				.select('text')
				.attr('x', itemConfig.startingPoint + iconWidth + spaceAfter)
				.attr('y', yTextPosition);

			// Test if legendItems are placed in the correct direction
			const testHorizontal =
				(!legendOrientation ||
					legendOrientation === LegendOrientations.HORIZONTAL) &&
				parseInt(legendItem.select('rect.checkbox').attr('y')) % 24 ===
					0;

			const testVertical =
				legendOrientation === LegendOrientations.VERTICAL &&
				legendItem.select('rect.checkbox').attr('x') === '0';

			const hasCorrectLegendDirection = testHorizontal || testVertical;

			// Render checkbox check icon
			if (
				itemConfig.hasDeactivatedItems &&
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
					.attr('width', iconWidth - 1)
					.attr('height', iconWidth - 1)
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
				!itemConfig.hasDeactivatedItems &&
				!legendItem.select('g.check').empty()
			) {
				legendItem.select('g.check').remove();
			}
		} else if (itemType === LegendItemType.RADIUS) {
			legendItem
				.selectAll('circle.radius')
				.attr('cx', (d) => itemConfig.startingPoint + d.cx)
				.attr('cy', (d) => yPosition + d.cy);

			legendItem
				.select('text')
				.attr('x', itemConfig.startingPoint + iconWidth + spaceAfter)
				.attr('y', yTextPosition);
		} else if (itemType === LegendItemType.SIZE) {
			legendItem
				.selectAll('g.icon')
				.attr(
					'transform',
					`translate(${itemConfig.startingPoint - translateOffset}, ${
						yPosition - 12
					})`
				);

			legendItem
				.select('text')
				.attr(
					'x',
					itemConfig.startingPoint +
						iconWidth +
						spaceAfter -
						translateOffset
				)
				.attr('y', yTextPosition);
		} else {
			legendItem
				.selectAll('g.icon')
				.attr(
					'transform',
					`translate(${
						itemConfig.startingPoint - translateOffset
					}, ${yPosition})`
				);

			legendItem
				.select('text')
				.attr(
					'x',
					itemConfig.startingPoint +
						iconWidth +
						spaceAfter -
						translateOffset
				)
				.attr('y', yTextPosition);
		}

		itemConfig.itemIndexInLine++;
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

		svg.selectAll('g.additional-item').on('mouseover', function () {
			const hoveredItem = select(this);

			const hoveredItemData = hoveredItem.datum() as any;
			if (hoveredItemData.name.length > truncationThreshold) {
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					hoveredElement: hoveredItem,
					content: hoveredItemData.name,
				});
			}
		});
	}
}
