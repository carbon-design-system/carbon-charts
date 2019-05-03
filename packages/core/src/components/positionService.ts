/**
 * Utilites to manipulate the position of elements relative to other elements
 */

export const PLACEMENTS = {
	LEFT: "left",
	RIGHT: "right",
	TOP: "top",
	BOTTOM: "bottom"
}

export interface AbsolutePosition {
	top: number;
	left: number;
	position?: AbsolutePosition;
}

export type Offset = { top: number, left: number };

export type ReferenceRect = {
	height: number;
	width: number;
};

export type Positions = {
	[key: string]: (referenceOffset: Offset, target: HTMLElement, referenceRect: ReferenceRect) => AbsolutePosition
};

export const defaultPositions: Positions = {
	[PLACEMENTS.LEFT]: (referenceOffset: Offset, target: HTMLElement, referenceRect: ReferenceRect): AbsolutePosition => ({
		top: referenceOffset.top - Math.round(target.offsetHeight / 2) + Math.round(referenceRect.height / 2),
		left: Math.round(referenceOffset.left - target.offsetWidth)
	}),
	[PLACEMENTS.RIGHT]: (referenceOffset: Offset, target: HTMLElement, referenceRect: ReferenceRect): AbsolutePosition => ({
		top: referenceOffset.top - Math.round(target.offsetHeight / 2) + Math.round(referenceRect.height / 2),
		left: Math.round(referenceOffset.left + referenceRect.width)
	}),
	[PLACEMENTS.TOP]: (referenceOffset: Offset, target: HTMLElement, referenceRect: ReferenceRect): AbsolutePosition => ({
		top: Math.round(referenceOffset.top - target.offsetHeight),
		left: referenceOffset.left - Math.round(target.offsetWidth / 2) + Math.round(referenceRect.width / 2)
	}),
	[PLACEMENTS.BOTTOM]: (referenceOffset: Offset, target: HTMLElement, referenceRect: ReferenceRect): AbsolutePosition => ({
		top: Math.round(referenceOffset.top + referenceRect.height),
		left: referenceOffset.left - Math.round(target.offsetWidth / 2) + Math.round(referenceRect.width / 2)
	})
};

export default class Position {
	protected positions = defaultPositions;

	constructor(positions: Positions = {}) {
		this.positions = Object.assign({}, defaultPositions, positions);
	}

	getRelativeOffset(target: HTMLElement): Offset {
		// start with the initial element offsets
		let offsets = {
			left: target.offsetLeft,
			top: target.offsetTop
		};
		// get each static (i.e. not absolute or relative) offsetParent and sum the left/right offsets
		while (target.offsetParent && getComputedStyle(target.offsetParent).position === "static") {
			offsets.left += target.offsetLeft;
			offsets.top += target.offsetTop;
			target = target.offsetParent as HTMLElement;
		}
		return offsets;
	}

	getAbsoluteOffset(target: HTMLElement): Offset {
		let currentNode = target;
		let margins = {
			top: 0,
			left: 0
		};

		// searches for containing elements with additional margins
		while (currentNode.offsetParent) {
			const computed = getComputedStyle(currentNode.offsetParent);
			// find static elements with additional margins
			// since they tend to throw off our positioning
			// (usually this is just the body)
			if (
				computed.position === "static" &&
				computed.marginLeft &&
				computed.marginTop
			) {
				if (parseInt(computed.marginTop, 10)) {
					margins.top += parseInt(computed.marginTop, 10);
				}
				if (parseInt(computed.marginLeft, 10)) {
					margins.left += parseInt(computed.marginLeft, 10);
				}
			}

			currentNode = currentNode.offsetParent as HTMLElement;
		}

		const targetRect = target.getBoundingClientRect();
		const relativeRect = document.body.getBoundingClientRect();
		return {
			top: targetRect.top - relativeRect.top + margins.top,
			left: targetRect.left - relativeRect.left + margins.left
		};
	}

	// finds the position relative to the `reference` element
	findRelative(reference: Element, target: Element, placement: string): AbsolutePosition {
		const referenceOffset = this.getRelativeOffset(reference as HTMLElement);
		const referenceRect = reference.getBoundingClientRect();
		return this.calculatePosition(referenceOffset, referenceRect, target, placement);
	}

	findAbsolute(reference: Element, target: Element, placement: string): AbsolutePosition {
		const referenceOffset = this.getAbsoluteOffset(reference as HTMLElement);
		const referenceRect = reference.getBoundingClientRect();
		return this.calculatePosition(referenceOffset, referenceRect, target, placement);
	}

	findPosition(reference: Element,
		target: Element,
		placement: string,
		offsetFunction = this.getAbsoluteOffset): AbsolutePosition {
		const referenceOffset = offsetFunction(reference as HTMLElement);
		const referenceRect = reference.getBoundingClientRect();
		return this.calculatePosition(referenceOffset, referenceRect, target, placement);
	}

	findPositionAt(offset: Offset, target: Element, placement: string): AbsolutePosition {
		return this.calculatePosition(offset, { height: 0, width: 0 }, target, placement);
	}

	/**
	 * Get the dimensions of an element from an AbsolutePosition and a reference element
	 */
	getPlacementBox(target: HTMLElement, position: AbsolutePosition) {
		const targetBottom = target.offsetHeight + position.top;
		const targetRight = target.offsetWidth + position.left;

		return {
			top: position.top,
			bottom: targetBottom,
			left: position.left,
			right: targetRight
		};
	}

	addOffset(position: AbsolutePosition, top = 0, left = 0): AbsolutePosition {
		return Object.assign({}, position, {
			top: position.top + top,
			left: position.left + left
		});
	}

	setElement(element: Element, position: AbsolutePosition): void {
		(element as HTMLElement).style.top = `${position.top}px`;
		(element as HTMLElement).style.left = `${position.left}px`;
	}

	findBestPlacement(reference: Element, target: Element, placements: string[]) {
		/**
		 * map over the array of placements and weight them based on the percentage of visible area
		 * where visible area is defined as the area not obscured by the window borders
		 */
		const weightedPlacements = placements.map(placement => {
			const pos = this.findPosition(reference, target, placement);
			let box = this.getPlacementBox((target as HTMLElement), pos);
			let hiddenHeight = box.bottom - window.innerHeight - window.scrollY;
			let hiddenWidth = box.right - window.innerWidth - window.scrollX;
			// if the hiddenHeight or hiddenWidth is negative, reset to offsetHeight or offsetWidth
			hiddenHeight = hiddenHeight < 0 ? (target as HTMLElement).offsetHeight : hiddenHeight;
			hiddenWidth = hiddenWidth < 0 ? (target as HTMLElement).offsetWidth : hiddenWidth;
			const area = (target as HTMLElement).offsetHeight * (target as HTMLElement).offsetWidth;
			const hiddenArea = hiddenHeight * hiddenWidth;
			let visibleArea = area - hiddenArea;
			// if the visibleArea is 0 set it back to area (to calculate the percentage in a useful way)
			visibleArea = visibleArea === 0 ? area : visibleArea;
			const visiblePercent = visibleArea / area;
			return {
				placement,
				weight: visiblePercent
			};
		});

		// sort the placements from best to worst
		weightedPlacements.sort((a, b) => b.weight - a.weight);
		// pick the best!
		return weightedPlacements[0].placement;
	}

	findBestPlacementAt(offset: Offset, reference: Element, target: Element, placements: string[]) {
		/**
		 * map over the array of placements and weight them based on the percentage of visible area
		 * where visible area is defined as the area not obscured by the reference borders
		 */
		const weightedPlacements = placements.map(placement => {
			const pos = this.findPositionAt(offset, target, placement);
			let box = this.getPlacementBox((target as HTMLElement), pos);
			let hiddenHeight = box.bottom - (reference as HTMLElement).offsetHeight;
			let hiddenWidth = box.right - (reference as HTMLElement).offsetWidth;
			// if the hiddenHeight or hiddenWidth is negative, reset to offsetHeight or offsetWidth
			hiddenHeight = hiddenHeight < 0 ? (target as HTMLElement).offsetHeight : hiddenHeight;
			hiddenWidth = hiddenWidth < 0 ? (target as HTMLElement).offsetWidth : hiddenWidth;
			const area = (target as HTMLElement).offsetHeight * (target as HTMLElement).offsetWidth;
			const hiddenArea = hiddenHeight * hiddenWidth;
			let visibleArea = area - hiddenArea;
			// if the visibleArea is 0 set it back to area (to calculate the percentage in a useful way)
			visibleArea = visibleArea === 0 ? area : visibleArea;

			const visiblePercent = visibleArea / area;
			return {
				placement,
				weight: visiblePercent
			};
		});

		// sort the placements from best to worst
		weightedPlacements.sort((a, b) => b.weight - a.weight);
		// pick the best!
		return weightedPlacements[0].placement;
	}

	protected calculatePosition(
		referenceOffset: Offset,
		referenceRect: ReferenceRect,
		target: Element,
		placement: string): AbsolutePosition {

		if (this.positions[placement]) {
			return this.positions[placement](referenceOffset, target as HTMLElement, referenceRect);
		}
		console.error("No function found for placement, defaulting to 0,0");
		return { left: 0, top: 0 };
	}
}

export const position = new Position();
