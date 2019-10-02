import {
	debounce as lodashDebounce,
	merge as lodashMerge,
	cloneDeep as lodashCloneDeep,
	uniq as lodashUnique,
	// the imports below are needed because of typescript bug (error TS4029)
	Cancelable,
	DebounceSettings
} from "lodash-es";

// Functions
export namespace Tools {
	// Export these functions from lodash
	export const debounce = lodashDebounce;
	export const clone = lodashCloneDeep;
	export const merge = lodashMerge;
	export const removeArrayDuplicates = lodashUnique;

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

	/**
	 * Returns an elements's x and y translations from attribute transform
	 * @param {HTMLElement} element
	 * @returns an object containing the x and y translations or null
	 */
	export function getTranslationValues(elementRef: HTMLElement) {
		// regex to ONLY get values for translate (instead of all rotate, translate, skew, etc)
		const translateRegex = /translate\([0-9]+\.?[0-9]*,[0-9]+\.?[0-9]*\)/;

		const transformStr = elementRef.getAttribute("transform").match(translateRegex);
		// check for the match
		if (transformStr[0]) {
			const transforms = transformStr[0].replace(/translate\(/, "").replace(/\)/, "").split(",");

			return {
					tx: transforms[0],
					ty: transforms[1]
				};
		}
		return null;
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
	 * Get the percentage of a datapoint compared to the entire data-set.
	 * Returns 1 significant digit if percentage is less than 1%.
	 * @export
	 * @param {any} item
	 * @param {any} fullData
	 * @returns The percentage in the form of a number
	 */
	export function convertValueToPercentage(item, fullData) {
		const percentage = item / fullData.reduce((accum, val) => accum + val.value, 0) * 100;
		return percentage < 1 ? percentage.toPrecision(1) : Math.floor(percentage);
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
	// ================================================================================

	export const getProperty = (object, ...propPath) => {
		let position = object;
		if (position) {
			for (const prop of propPath) {
				if (position[prop]) {
					position = position[prop];
				} else {
					return null;
				}
			}
			return position;
		}

		return null;
	};
}
