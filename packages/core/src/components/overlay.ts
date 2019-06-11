import * as Configuration from "../configuration";
import { ChartComponent } from "./base-component";

export class Overlay extends ChartComponent {
	holder: HTMLElement;
	overlayElement: HTMLElement;
	overlayOptions: Configuration.ChartOverlayOptions;

	render() {
		const { overlay: overlayOptions } = this._model.getOptions();
		const { holder } = this._essentials;
		this.overlayElement = holder.querySelector("div.chart-overlay");

		if (overlayOptions) {
			this.overlayOptions = overlayOptions;
		} else {
			this.overlayOptions = Configuration.options.BASE.overlay;
		}

		if (this.overlayElement) {
			this.overlayElement.parentNode.removeChild(this.overlayElement);
		}

		const overlay = document.createElement("div");

		overlay.classList.add("chart-overlay");
		overlay.innerHTML = this.overlayOptions.innerHTML["loading"];

		if (this._model.getState().loading) {
			this.overlayElement = holder.appendChild(overlay);
		}
	}
}
