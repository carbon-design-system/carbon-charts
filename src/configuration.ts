export namespace Configuration {
	export const charts = {
		margin: {
			top: 20,
			bottom: 60,
			left: 90,
			right: 20
		},
		resetOpacity: {
			opacity: 1,
			circle: {
				fill: "white"
			}
		},
		reduceOpacity: {
			opacity: 0.25
		},
		widthBreak: 600,
		marginForLegendTop: 40,
		magicRatio: 0.7,
		magicMoreForY2Axis: 70
	};

	export const axis = {
		maxWidthOfAxisLabel: 175,
		maxNumOfAxisLabelLetters: 60,
		yAxisAngle: -90,
		xAxisAngle: -45,
		domain: {
			color: "#959595",
			strokeWidth: 2
		},
		dx: "-1em",
		label: {
			dy: "1em"
		},
		tick: {
			dy: "0.5em",
			widthAdditionY: 25,
			widthAdditionY2: 15,
			heightAddition: 16,
			maxLetNum: 28
		},
		magicDy1: "0.71em",
		magicY1: 9,
		magicX1: -4
	};

	export const grid = {
		strokeColor: "#ECEEEF"
	};

	export const bars = {
		mouseover: {
			strokeWidth: 6,
			strokeOpacity: 0.5
		},
		mouseout: {
			strokeWidth: 0,
			strokeOpacity: 1
		}
	};

	export const lines = {
		mouseover: {
			class: "hover-glow",
			r: 5.5,
			fill: "none",
			strokeWidth: 4,
			strokeOpacity: 0.5
		},
		path: {
			fill: "none",
			stroke: "steelblue",
			strokeLinejoin: "round",
			strokeLinecap: "round",
			strokeWidth: 2,
			duration: 700
		},
		dot: {
			r: 3.5,
			fill: "white",
			strokeWidth: 2,
			duration: 500
		}
	};

	export const pie = {
		mouseover: {
			strokeWidth: 8,
			strokeOpacity: 0.5
		}
	};


	export const legend = {
		countBreak: 4,
		fontSize: 12,
		wrapperHeight: "40px",
		widthTolerance: 15,
		hoverShadowSize: "3px",
		hoverShadowTransparency: 0.2,
		margin: {
			top: 19
		},
		active: {
			borderColor: false,
			borderStyle: false,
			borderWidth: false
		},
		inactive: {
			backgroundColor: "white",
			borderStyle: "solid",
			borderWidth: "2px"
		}
	};

	export const tooltip = {
		width: 200,
		arrowWidth: 10,
		magicXPoint2: 20,
		magicTop1: 21,
		magicTop2: 22,
		magicLeft1: 11,
		magicLeft2: 12
	};
}
