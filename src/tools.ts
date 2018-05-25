// Functions
export namespace Tools {
	export function debounce(func, wait, immediate?) {
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

	export function duplicateKeysInData(data: any) {
		const keys = [];
		const duplicateKeys = [];

		data.map(item => {
			const key = item.label;
			if (keys.indexOf(key) > -1 && duplicateKeys.indexOf(key) === -1) {
				duplicateKeys.push(key);
			}

			keys.push(key);
		});

		return duplicateKeys;
	}

	export function addCloseBtn(tooltip, size, color?) {
		const closeBtn = tooltip.append("button");
		let classNames = `close--${size}`;
		classNames = color ? " close--" + color : classNames;
		closeBtn.attr("class", classNames)
			.attr("type", "button")
			.attr("aria-label", "Close")
			.append("svg").attr("class", "close_icon")
			.append("use").attr("href", "#x_12");
		return closeBtn;
	}

	export function getDimensions(el) {
		return {
			width: parseFloat(el.style.width.replace("px", "") || el.offsetWidth),
			height: parseFloat(el.style.height.replace("px", "") || el.offsetHeight)
		};
	}

	export function capitalizeFirstLetter(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	export function convertValueToPercentage(item, fullData) {
		return Math.floor(item / fullData.reduce((accum, val) => accum + val.value, 0) * 100) + "%";
	}

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
}
