import * as Configuration from "../configuration";

export class Overlay {
	holder: HTMLElement;
	overlayElement: HTMLElement;
	overlayOptions: Configuration.ChartOverlayOptions;

	constructor(holder: Element, options: Configuration.ChartOverlayOptions) {
		this.holder = <HTMLElement>holder;
		this.overlayElement = this.holder.querySelector("div.chart-overlay");

		if (options) {
			this.overlayOptions = options;
		} else {
			this.overlayOptions = Configuration.options.BASE.overlay;
		}
	}

	// render() { /* Overlays aren't rendered by default */ }

	// update(newData, newOptions) {

	// }

	show(type?: string) {
		if (this.overlayElement) {
			this.overlayElement.parentNode.removeChild(this.overlayElement);
		}

		const overlay = document.createElement("div");

		overlay.classList.add("chart-overlay");
		overlay.innerHTML = this.overlayOptions.innerHTML[type ? type : "loading"];

		this.overlayElement = this.holder.appendChild(overlay);
	}

	hide() {
		this.overlayElement.style.display = "none";
	}
}
