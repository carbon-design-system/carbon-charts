// Internal Imports
import { Component } from "../component";
import { AxisPositions, ScaleTypes } from "../../interfaces";
import { Axis } from "./axis";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";

export class TwoDimensionalAxes extends Component {
	type = "2D-axes";

	children: any = {};

	margins = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	render(animate = false) {
		const axes = {};

		const axisPositions = Object.keys(AxisPositions);
		const axesOptions = Tools.getProperty(this.model.getOptions(), "axes");

		if (axesOptions) {
			let primaryAxisOptions, secondaryAxisOptions;
			axisPositions.forEach(axisPosition => {
				const axisOptions = axesOptions[AxisPositions[axisPosition]];
				if (axisOptions) {
					axes[AxisPositions[axisPosition]] = true;

					if (axisOptions.primary === true) {
						primaryAxisOptions = axisOptions;
					} else if (axisOptions.secondary === true) {
						secondaryAxisOptions = axisOptions;
					}
				}
			});
		} else {
			this.model.getOptions().axes = {
				left: {
					primary: true
				},
				bottom: {
					secondary: true,
					type: this.model.getDisplayData().labels ? ScaleTypes.LABELS : undefined
				}
			};

			axes[AxisPositions.LEFT] = true;
			axes[AxisPositions.BOTTOM] = true;
		}

		this.configs.axes = axes;

		// Check the configs to know which axes need to be rendered
		axisPositions.forEach(axisPositionKey => {
			const axisPosition = AxisPositions[axisPositionKey];
			if (this.configs.axes[axisPosition] && !this.children[axisPosition]) {
				const axisComponent = new Axis(
					this.model,
					this.services,
					{
						position: axisPosition,
						axes: this.configs.axes,
						margins: this.margins
					}
				);

				// Set model, services & parent for the new axis component
				axisComponent.setModel(this.model);
				axisComponent.setServices(this.services);
				axisComponent.setParent(this.parent);

				this.children[axisPosition] = axisComponent;
			}
		});

		Object.keys(this.children).forEach(childKey => {
			const child = this.children[childKey];
			child.render(animate);
		});

		const margins = {} as any;

		Object.keys(this.children).forEach(childKey => {
			const child = this.children[childKey];
			const axisPosition = child.configs.position;
			const { width, height } = DOMUtils.getSVGElementSize(child.getAxisRef(), { useBBox: true });
			let offset;
			if (child.getTitleRef().empty()) {
				offset = 0;
			} else {
				offset = DOMUtils.getSVGElementSize(child.getTitleRef(), { useBBox: true }).height;
			}

			switch (axisPosition) {
				case AxisPositions.TOP:
					margins.top = height + offset;
					break;
				case AxisPositions.BOTTOM:
					margins.bottom = height + offset;
					break;
				case AxisPositions.LEFT:
					margins.left = width + offset;
					break;
				case AxisPositions.RIGHT:
					margins.right = width + offset;
					break;
			}
		});

		// If the new margins are different than the existing ones
		const isNotEqual = Object.keys(margins).some(marginKey => {
			return this.margins[marginKey] !== margins[marginKey];
		});

		if (isNotEqual) {
			this.margins = Object.assign(this.margins, margins);

			Object.keys(this.children).forEach(childKey => {
				const child = this.children[childKey];
				child.margins = this.margins;
			});

			this.render(true);
		}
	}
}
