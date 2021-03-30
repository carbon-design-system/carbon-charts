// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { Events, ColorClassNameTypes } from '../../interfaces';

// D3 Imports
import { select } from 'd3-selection';
import cloud from 'd3-cloud';

export class WordCloud extends Component {
	type = 'wordcloud';

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct words on legend item hovers
		eventsFragment.addEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);

		// Un-highlight words on legend item mouseouts
		eventsFragment.addEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
	}

	render(animate = true) {
		const self = this;
		const svg = this.getContainerSVG();

		const displayData = this.model.getDisplayData();
		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const { width, height } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true,
		});

		if (width === 0 || height === 0) {
			return;
		}

		const layout = cloud()
			.size([width, height])
			.words(
				displayData.map(function (d) {
					return {
						[groupMapsTo]: d[groupMapsTo],
						text: d.word,
						size: d.size,
					};
				})
			)
			.padding(5)
			.rotate(0)
			.fontSize(function (d) {
				return d.size;
			})
			.on('end', draw);

		layout.start();

		function draw(words) {
			const textGroup = DOMUtils.appendOrSelect(svg, 'g.words');
			textGroup.attr(
				'transform',
				`translate(${layout.size()[0] / 2}, ${layout.size()[1] / 2})`
			);

			const allText = textGroup
				.selectAll('text')
				.data(words, (d) => `${d[groupMapsTo]}-${d.text}`);

			// Remove texts that are no longer needed
			allText.exit().attr('opacity', 0).remove();

			const enteringText = allText
				.enter()
				.append('text')
				.attr('opacity', 0);

			enteringText
				.merge(allText)
				.style('font-size', function (d) {
					return d.size;
				})
				.text(function (d) {
					return d.text;
				})
				.attr('class', (d) =>
					self.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.FILL],
						dataGroupName: d[groupMapsTo],
						originalClassName: 'word',
					})
				)
				.attr('text-anchor', 'middle')
				.transition(
					self.services.transitions.getTransition(
						'wordcloud-text-update-enter',
						animate
					)
				)
				.attr('transform', function (d) {
					return (
						'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
					);
				})
				.attr('opacity', 1);
		}

		// Add event listeners
		this.addEventListeners();
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;
		const { groupMapsTo } = this.getOptions().data;

		this.parent
			.selectAll('text.word')
			.transition(
				this.services.transitions.getTransition('legend-hover-wordcloud')
			)
			.attr('opacity', (d) =>
				d[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1
			);
	};

	// Un-highlight all elements
	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll('text.word')
			.transition(
				this.services.transitions.getTransition('legend-mouseout-wordcloud')
			)
			.attr('opacity', 1);
	};

	addEventListeners() {
		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const self = this;
		this.parent
			.selectAll('text.word')
			.on('mouseover', function (datum) {
				const hoveredElement = this;
				select(hoveredElement).classed('hovered', true);

				self.parent
					.selectAll('text.word')
					.transition(
						self.services.transitions.getTransition(
							'wordcloud-word-hover'
						)
					)
					.attr('opacity', function (d) {
						if (this === hoveredElement) {
							return 1;
						}

						return 0.3;
					});

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOVER, {
					element: select(this),
					datum,
				});

				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					hoveredElement,
					items: [
						{
							label: 'Word',
							value: datum.text,
						},
						{
							label: 'Occurences',
							value: datum.size,
						},
						{
							label: options.tooltip.groupLabel || 'Group',
							value: datum[groupMapsTo],
							class: self.model.getColorClassName({
								classNameTypes: [ColorClassNameTypes.TOOLTIP],
								dataGroupName: datum[groupMapsTo],
							}),
						},
					],
				});
			})
			.on('mousemove', function (datum) {
				const hoveredElement = select(this);

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEMOVE, {
					element: hoveredElement,
					datum,
				});

				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.MOVE);
			})
			.on('click', function (datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Pie.SLICE_CLICK, {
					element: select(this),
					datum,
				});
			})
			.on('mouseout', function (datum) {
				const hoveredElement = select(this);
				hoveredElement.classed('hovered', false);

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOUT, {
					element: hoveredElement,
					datum,
				});

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement,
				});

				self.parent
					.selectAll('text.word')
					.transition(
						self.services.transitions.getTransition(
							'wordcloud-word-mouseout'
						)
					)
					.attr('opacity', 1);
			});
	}
}
