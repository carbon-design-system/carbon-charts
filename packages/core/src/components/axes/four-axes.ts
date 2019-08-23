// Internal Imports
import { Component } from "../component";
import { AxisPositions } from "../../interfaces";
import { Axis } from "./axis";

export class FourAxes extends Component {
	type = "four-axes";

	options: any;
	children: Array<Axis> = [];

	margins = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	constructor(options?: any) {
		super();

		this.options = options;

		// Check the configs to know which axes need to be rendered
		const axisPositions = Object.keys(AxisPositions).map(axisPositionKey => AxisPositions[axisPositionKey]);
		axisPositions.forEach(axisPosition => {
			if (this.options.axes[axisPosition]) {
				const axisComponent = new Axis({
					position: axisPosition,
					axes: this.options.axes,
					margins: this.margins
				});

				this.children.push(axisComponent);
			}
		});
	}

	render(animate = false) {
		this.children.forEach(child => {
			child.render({
				animate
			});
		});

		const margins = {} as any;

		this.children.forEach(child => {
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

			this.children.forEach(child => {
				child.margins = this.margins;
			});

			this.render(true);
		}
	}

	setParent(parent: any) {
		super.setParent(parent);

		this.children.forEach(child => {
			child.setParent(this._parent);
		});
	}


	// Pass on model to children as well
	setModel(newObj) {
		super.setModel(newObj);

		this.children.forEach(child => {
			child.setModel(newObj);
		});
	}

	// Pass on essentials to children as well
	setServices(newObj) {
		super.setServices(newObj);

		this.children.forEach(child => {
			child.setServices(newObj);
		});
	}
}
