// Functions
export namespace Tools {
	export function debounce(func, wait, immediate) {
		let timeout;
		return function() {
			const context = this, args = arguments;
			const later = function() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) {
				func.apply(context, args);
			}
		};
	}

	export function addCloseBtn(tooltip, size, color?) {
		const closeBtn = tooltip.append("button");
		let classNames = `close--${size}`;
		classNames = color ? " close--" + color : classNames;

		const iconHolder = document.createElement("span");
		iconHolder.innerHTML = `Close`;
		closeBtn.attr("class", classNames)
			.attr("type", "button")
			.attr("aria-label", "Close");

		closeBtn.node()
			.appendChild(iconHolder);

			// TODO - Finish
			// console.log(iconHolder);
		return closeBtn;
	}

	export function clone(obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	/**************************************
	 *  DOM-related operations            *
	 *************************************/

	/**
	 * Get width & height of an element
	 *
	 * @export
	 * @param {any} el element to get dimensions from
	 * @returns an object containing the width and height of el
	 */
	export function getDimensions(el) {
		return {
			width: parseFloat(el.style.width.replace("px", "") || el.offsetWidth),
			height: parseFloat(el.style.height.replace("px", "") || el.offsetHeight)
		};
	}

	/**************************************
	 *  Formatting & calculations         *
	 *************************************/

	/**
	 * Gets x and y coordinates from a HTML transform attribute
	 *
	 * @export
	 * @param {any} string the transform attribute string ie. transform(x,y)
	 * @returns Returns an object with x and y offsets of the transform
	 */
	export function getTranformOffsets(string) {
		const regExp = /\(([^)]+)\)/;
		const match = regExp.exec(string)[1];
		const xyString = match.split(",");

		return {
			x: parseFloat(xyString[0]),
			y: parseFloat(xyString[1])
		};
	}

	export function formatWidthHeightValues(value) {
		const stringValue = value.toString();

		// If the value provided contains any letters
		// Return it the same way
		if (stringValue.match(/[a-z]/i)) {
			return stringValue;
		}

		return stringValue + "px";
	}

	/**
	 * Capitalizes first letter of a string
	 *
	 * @export
	 * @param {any} string the string whose first letter you'd like to capitalize
	 * @returns The input string with its first letter capitalized
	 */
	export function capitalizeFirstLetter(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	/**
	 * Get the percentage of a datapoint compared to the entire data-set
	 *
	 * @export
	 * @param {any} item
	 * @param {any} fullData
	 * @returns The percentage in the form of a string "87%"
	 */
	export function convertValueToPercentage(item, fullData) {
		return Math.floor(item / fullData.reduce((accum, val) => accum + val.value, 0) * 100) + "%";
	}

	/**************************************
	 *  Object/array related checks       *
	 *************************************/
	/**
	 * Get the difference between two arrays' items
	 *
	 * @export
	 * @param {any[]} oldArray
	 * @param {any[]} newArray
	 * @returns The items missing in newArray from oldArray, and items added to newArray compared to oldArray
	 */
	export function arrayDifferences(oldArray: any[], newArray: any[]) {
		const difference = {
			missing: [],
			added: []
		};

		oldArray.forEach(element => {
			if (newArray.indexOf(element) === -1) {
				difference.missing.push(element);
			}
		});

		newArray.forEach(element => {
			if (oldArray.indexOf(element) === -1) {
				difference.added.push(element);
			}
		});

		return difference;
	}

	/**
	 * Lists out the duplicated keys in an array of data
	 *
	 * @export
	 * @param {*} data - array of data
	 * @returns A list of the duplicated keys in data
	 */
	export function getDuplicateValues(arr: any) {
		const values = [];
		const duplicateValues = [];

		arr.forEach(value => {
			if (values.indexOf(value) !== -1 && duplicateValues.indexOf(value) === -1) {
				duplicateValues.push(value);
			}

			values.push(value);
		});

		return duplicateValues;
	}

	export function removeArrayDuplicates(arr): any[] {
		// Casting to any because of the lack of typescript types
		// Set removes duplicates automatically
		const result = new Set(arr) as any;

		// Spread operator appends all elements from result into []
		return [...result];
	}

	// ================================================================================
	// D3 Extensions
	// ================================================================================
	/**
	 * In D3, moves an element to the front of the canvas
	 *
	 * @export
	 * @param {any} element
	 * @returns The function to be used by D3 to push element to the top of the canvas
	 */
	export function moveToFront(element) {
		return element.each(function() {
			this.parentNode.appendChild(this);
		});
	}

	// ================================================================================
	// Style Helpers
	/**
	 * Retrieves the element transform matrix string, and returns the translateX string
	 *
	 * @export
	 * @param {HTMLElement} element
	 * @returns The translateX value for element
	 */
	export function getXTransformsValue(element: HTMLElement) {
		const transformMatrixArray = window.getComputedStyle(element).getPropertyValue("transform").split(",");

		return transformMatrixArray[4];
	}
}
