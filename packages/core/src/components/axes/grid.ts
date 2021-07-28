// Internal Imports
import { Component } from '../component';
import { Tools } from '../../tools';
import { DOMUtils } from '../../services';
import { RenderTypes } from '../../interfaces';

// D3 Imports
import { axisBottom, axisLeft } from 'd3-axis';

import { transition } from 'd3-transition';

export class Grid extends Component {
	type = 'grid';
	renderType = RenderTypes.SVG;

	backdrop: any;

	render(animate = true) {
		const isXGridEnabled = Tools.getProperty(
			this.getOptions(),
			'grid',
			'x',
			'enabled'
		);
		const isYGridEnabled = Tools.getProperty(
			this.getOptions(),
			'grid',
			'y',
			'enabled'
		);

		// Draw the backdrop
		this.drawBackdrop(isXGridEnabled, isYGridEnabled);

		if (!isXGridEnabled && !isYGridEnabled) {
			return;
		}

		if (isXGridEnabled) {
			DOMUtils.appendOrSelect(this.backdrop, 'g.x.grid');
			this.drawXGrid(animate);
		}

		if (isYGridEnabled) {
			DOMUtils.appendOrSelect(this.backdrop, 'g.y.grid');
			this.drawYGrid(animate);
		}
	}

	drawXGrid(animate: boolean) {
		const svg = this.parent;

		const height = this.backdrop.attr('height');

		const mainXScale = this.services.cartesianScales.getMainXScale();
		const xGrid = axisBottom(mainXScale)
			.tickSizeInner(-height)
			.tickSizeOuter(0);

		// if the main range axis has a custom domain, align the gridlines to the ticks
		const alignToTicks = Tools.getProperty(
			this.getOptions(),
			'grid',
			'x',
			'alignWithAxisTicks'
		);

		if (alignToTicks) {
			const mainXPosition = this.services.cartesianScales.getDomainAxisPosition();
			const customDomain = Tools.getProperty(
				this.getOptions(),
				'axes',
				mainXPosition,
				'ticks',
				'values'
			);
			// use custom domain if there is one
			// otherwise d3 defaults to using one gridline per tick
			if (customDomain) {
				xGrid.tickValues(customDomain);
			}
		} else {
			// Determine number of ticks
			const numberOfTicks = Tools.getProperty(
				this.getOptions(),
				'grid',
				'x',
				'numberOfTicks'
			);

			xGrid.ticks(numberOfTicks);
		}

		const g = svg
			.select('.x.grid')
			.attr(
				'transform',
				`translate(${-this.backdrop.attr('x')}, ${height})`
			);

		if (animate) {
			g.transition()
				.call((t) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'grid-update',
						animate,
					})
				)
				.call(xGrid);
		} else {
			g.call(xGrid);
		}

		this.cleanGrid(g);
	}

	drawYGrid(animate: boolean) {
		const svg = this.parent;
		const width = this.backdrop.attr('width');

		const mainYScale = this.services.cartesianScales.getMainYScale();
		const yGrid = axisLeft(mainYScale)
			.tickSizeInner(-width)
			.tickSizeOuter(0);

		// if the main range axis has a custom domain, align the gridlines to the ticks
		const alignToTicks = Tools.getProperty(
			this.getOptions(),
			'grid',
			'y',
			'alignWithAxisTicks'
		);

		if (alignToTicks) {
			const mainYPosition = this.services.cartesianScales.getRangeAxisPosition();

			const customDomain = Tools.getProperty(
				this.getOptions(),
				'axes',
				mainYPosition,
				'ticks',
				'values'
			);

			// use custom domain if there is one
			// otherwise d3 defaults to using one gridline per tick
			if (customDomain) {
				yGrid.tickValues(customDomain);
			}
		} else {
			// Determine number of ticks
			const numberOfTicks = Tools.getProperty(
				this.getOptions(),
				'grid',
				'y',
				'numberOfTicks'
			);

			yGrid.ticks(numberOfTicks);
		}

		const g = svg
			.select('.y.grid')
			.attr('transform', `translate(0, ${-this.backdrop.attr('y')})`);

		if (animate) {
			g.transition()
				.call((t) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'grid-update',
						animate,
					})
				)
				.call(yGrid);
		} else {
			g.call(yGrid);
		}

		this.cleanGrid(g);
	}

	/**
	 * Returns the threshold for the gridline tooltips based on the mouse location.
	 * Calculated based on the mouse position between the two closest gridlines or edges of chart.
	 */
	getGridlineThreshold(mousePos) {
		// use the space between axis grid ticks to adjust the threshold for the tooltips
		const svg = this.parent;

		// sort in ascending x translation value order
		const gridlinesX = svg
			.selectAll('.x.grid .tick')
			.nodes()
			.sort((a, b) => {
				return (
					Number(Tools.getTranslationValues(a).tx) -
					Number(Tools.getTranslationValues(b).tx)
				);
			});

		// find the 2 gridlines on either side of the mouse
		let floor = -1;
		let ceiling;
		if (!gridlinesX.length) {
			return;
		}

		gridlinesX.forEach((line: HTMLElement, i: any) => {
			if (mousePos[0] >= +Tools.getTranslationValues(line).tx) {
				floor++;
			}
		});
		ceiling = floor + 1 < gridlinesX.length ? floor + 1 : gridlinesX.length;

		// get the 'step' between chart gridlines
		const line1 = gridlinesX[floor];
		const line2 = gridlinesX[ceiling];
		let lineSpacing;

		// if the mouse is on edge of charts (mouseX < first gridline || mouseX > last gridline)
		// we can use the chart edge to determind the threshold for the gridlines
		if (!line1) {
			// we are between the first gridline and the chart edge
			lineSpacing = +Tools.getTranslationValues(line2).tx;
		} else if (!line2) {
			// we need to use the chart right bounds in case there isnt a domain axis
			const gridElement = svg.select('rect.chart-grid-backdrop').node();
			const width = DOMUtils.getSVGElementSize(gridElement).width;

			lineSpacing = width - +Tools.getTranslationValues(line1).tx;
		} else {
			// there are two gridlines to use
			lineSpacing =
				+Tools.getTranslationValues(line2).tx -
				+Tools.getTranslationValues(line1).tx;
		}
		const { threshold } = this.getOptions().tooltip.gridline;
		// return the threshold
		return lineSpacing * threshold;
	}

	/**
	 * Returns the active gridlines based on the gridline threshold and mouse position.
	 * @param position mouse positon
	 */
	getActiveGridline(position) {
		const userSpecifiedThreshold = Tools.getProperty(
			this.getOptions,
			'tooltip',
			'gridline',
			'threshold'
		);
		const threshold = userSpecifiedThreshold
			? userSpecifiedThreshold
			: this.getGridlineThreshold(position);
		const svg = this.parent;

		const xGridlines = svg.selectAll('.x.grid .tick').filter(function () {
			const translations = Tools.getTranslationValues(this);

			// threshold for when to display a gridline tooltip
			const bounds = {
				min: Number(translations.tx) - threshold,
				max: Number(translations.tx) + threshold,
			};

			return bounds.min <= position[0] && position[0] <= bounds.max;
		});

		return xGridlines;
	}

	drawBackdrop(isXGridEnabled, isYGridEnabled) {
		const svg = this.parent;

		const mainXScale = this.services.cartesianScales.getMainXScale();
		const mainYScale = this.services.cartesianScales.getMainYScale();

		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		// Get height from the grid
		this.backdrop = DOMUtils.appendOrSelect(svg, 'svg.chart-grid-backdrop');
		const backdropRect = DOMUtils.appendOrSelect(
			this.backdrop,
			isXGridEnabled || isYGridEnabled
				? 'rect.chart-grid-backdrop.stroked'
				: 'rect.chart-grid-backdrop'
		);

		this.backdrop
			.merge(backdropRect)
			.attr('x', xScaleStart)
			.attr('y', yScaleStart)
			.attr('width', Math.abs(xScaleEnd - xScaleStart))
			.attr('height', Math.abs(yScaleEnd - yScaleStart))
			.lower();

		backdropRect.attr('width', '100%').attr('height', '100%');
	}

	cleanGrid(g) {
		// Remove extra elements
		g.selectAll('text').remove();
		g.select('.domain').remove();
	}
}
