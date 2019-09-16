// Internal Imports
import { Component } from "../component";
import { AxisPositions, ScaleTypes } from "../../interfaces";
import { Axis } from "./axis";
import { Tools } from "../../tools";

export class TwoDimensionalAxes extends Component {
	type = "four-axes";

	options: any = {};
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
		const axesOptions = Tools.getProperty(this._model.getOptions(), "axes");
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
			this._model.getOptions().axes = {
				left: {
					primary: true
				},
				bottom: {
					secondary: true,
					type: this._model.getDisplayData().labels ? ScaleTypes.LABELS : undefined
				}
			};

			axes[AxisPositions.LEFT] = true;
			axes[AxisPositions.BOTTOM] = true;
		}

		this.options.axes = axes;

		// Check the configs to know which axes need to be rendered
		const axisPositionss = Object.keys(AxisPositions).map(axisPositionKey => AxisPositions[axisPositionKey]);
		axisPositionss.forEach(axisPosition => {
			if (this.options.axes[axisPosition] && !this.children[axisPosition]) {
				const axisComponent = new Axis(
					this._model,
					this._services,
					{
						position: axisPosition,
						axes: this.options.axes,
						margins: this.margins
					}
				);

				// Set model, services & parent for the new axis component
				axisComponent.setModel(this._model);
				axisComponent.setServices(this._services);
				axisComponent.setParent(this._parent);

				this.children[axisPosition] = axisComponent;
			}
		});

		Object.keys(this.children).forEach(childKey => {
			const child = this.children[childKey];
			child.render({
				animate
			});
		});

		const margins = {} as any;

		Object.keys(this.children).forEach(childKey => {
			const child = this.children[childKey];
			const axisPosition = child.options.position;
			const { width, height } = this._services.domUtils.getSVGElementSize(child.getElementRef(), { useBBox: true });

			switch (axisPosition) {
				case AxisPositions.TOP:
					margins.top = height;
					break;
				case AxisPositions.BOTTOM:
					margins.bottom = height;
					break;
				case AxisPositions.LEFT:
					margins.left = width;
					break;
				case AxisPositions.RIGHT:
					margins.right = width;
					break;
			}
		});

		// If the new margins are different than the existing ones
		const isNotEqual = Object.keys(margins).some(marginKey => {
			const marginVal = margins[marginKey];
			return this.margins[marginKey] !== marginVal;
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

	// // Pass on model to children as well
	// setModel(newObj) {
	// 	super.setModel(newObj);

	// 	Object.keys(this.children).forEach(childKey => {
	// 		const child = this.children[childKey];
	// 		child.setModel(newObj);
	// 	});
	// }

	// // Pass on essentials to children as well
	// setServices(newObj) {
	// 	super.setServices(newObj);

	// 	Object.keys(this.children).forEach(childKey => {
	// 		const child = this.children[childKey];
	// 		child.setServices(newObj);
	// 	});
	// }
}
