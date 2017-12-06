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
}
