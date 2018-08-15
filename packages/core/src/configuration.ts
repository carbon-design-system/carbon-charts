const baseOptions: any = {
	legendClickable: true,
	containerResizable: true,
	type: "basic",
	colors: [
		"#009BEF",
		"#95D13C",
		"#785EF0",
		"#F87EAC",
		"#FFB000",
		"#00B6CB",
		"#FF5C49",
		"#047CC0",
		"#FE8500",
		"#5A3EC8",
		"#40D5BB",
		"#FF509E"
	],
	tooltip: {
		formatter: null
	},
	loadingOverlay: {
		innerHTML: `
<div class="loading-bee" role="status" aria-describedby="loadingBeeMessage" aria-live="assertive">
	<svg width="100%" height="100%" viewBox="0 0 30 30">
		<g class="loading-bee_wing-1">
			<path d="M16.2,5.7l-0.1-0.1c-1.4,0-5.1-0.2-6.7-0.2c-1.1,0-2.5,0.8-3.7,2c-1.8,1.8-2.5,
					4-1.6,4.9c0.2,0.2,1.2,1.2,3.4-0.3C8,11.6,15.7,6.1,16.2,5.7"></path>

			<path d="M24.3,13.8c-0.4,0.5-5.9,8.2-6.3,8.7c-1.5,2.2-0.5,3.2-0.3,3.4c0.9,0.9,3.1,0.2,
					4.9-1.6c1.2-1.2,2-2.6,2-3.7c0-1.6-0.2-5.2-0.2-6.7L24.3,13.8"></path>
		</g>

		<g class="loading-bee_wing-2">
			<path d="M16.2,5.7L16,5.5c-1.8-0.4-6.5-1.6-8.5-2C6.2,3.3,4.6,3.9,3.4,5.1c-1.8,
				1.8-2.1,4.4-0.8,5.7c0.3,0.3,1.8,1.8,4.2,0.5C7.4,11,15.6,6.1,16.2,5.7"></path>

			<path d="M24.3,13.8c-0.4,0.6-5.3,8.8-5.6,9.4c-1.3,2.4,0.2,3.9,0.5,4.2c1.4,1.4,3.9,
				1,5.7-0.8c1.2-1.2,1.8-2.8,1.6-4.1c-0.5-2-1.6-6.7-2-8.5L24.3,13.8"></path>
		</g>

		<g class="loading-bee_wing-3">
			<path d="M24.5,14c0.8,2.1,2.8,7.7,3.6,10.1c0.5,1.6,0.1,3.3-1.2,4.5c-1.8,1.8-4.7,
				1.8-6.5,0c-0.4-0.4-2.4-2.4-1.3-4.9c0.3-0.6,4.7-9.3,5-10L24.5,14z"></path>

			<path d="M16,5.5C13.8,4.7,8.3,2.7,5.9,1.9C4.3,1.4,2.6,1.8,1.4,3c-1.8,1.8-1.8,4.7,0,
				6.5c0.4,0.4,2.4,2.4,4.9,1.3c0.6-0.3,9.3-4.7,10-5L16,5.5z"></path>
		</g>
		<g>
			<g>
				<path d="M22.9,14.6c0.9-2,0.4-4.4-1.3-6.2c-1.8-1.8-4.1-2.3-6.2-1.3L22.9,14.6z"></path>
				<g>
				<rect x="14.6" y="8" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.8964 15.5454)" width="3.4" height="11.4"></rect>
				<path d="M9.5,12.5l-2.3,2.3c0,0-0.1,0.1-0.1,0.2l8,8c0,0,0.1-0.1,0.2-0.1l2.3-2.3L9.5,12.5z"></path>
				<path d="M5.8,16.9c-0.8,2-0.4,4.4,1.2,6.1c1.7,1.7,4,2,6.1,1.2L5.8,16.9z"></path>
				</g>
			</g>

			<circle cx="21.5" cy="2.8" r="2.8"></circle>
			<path d="M29.2,10.5c-1.1,1.1-2.9,1.1-4,0c-1.1-1.1-1.1-2.9,0-4s2.9-1.1,4,0C30.3,7.6,30.3,9.4,29.2,10.5z"></path>
		</g>
	</svg>
	<p class="loadingBeeMessage">Loading...</p>
</div>
		`
	}
};

const axisOptions: any = Object.assign({}, baseOptions, {
	series: [],
	scales: {
		x: {
			domain: null,
			ticks: 5
		},
		y: {
			domain: null,
			ticks: 5
		},
		ySecondary: {
			domain: null,
			ticks: 10
		}
	}
});

export namespace Configuration {
	export const options = {
		BASE: baseOptions,
		AXIS: axisOptions
	};

	export const charts = {
		margin: {
			top: 20,
			bottom: 60,
			left: 60,
			right: 20,
			bar: {
				top: 0,
				right: -40,
				bottom: 50,
				left: 40
			},
			line: {
				top: 0,
				right: -40,
				bottom: 50,
				left: 40
			}
		},
		resetOpacity: {
			opacity: 1,
			circle: {
				fill: "white"
			},
			outline: "grey"
		},
		reduceOpacity: {
			opacity: 0.25,
			outline: "grey"
		},
		pointCircles: {
			radius: 4
		},
		patternFills: {
			width: 20,
			height: 20
		},
		widthBreak: 600,
		marginForLegendTop: 40,
		magicRatio: 0.7,
		magicMoreForY2Axis: 70
	};

	export const scales = {
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
		magicX1: -4,
		y: {
			numberOfTicks: 5
		},
		x: {
			numberOfTicks: 5,
			padding: 0.2
		},
		y2: {
			numberOfTicks: 5
		}
	};

	export const grid = {
		strokeColor: "#ECEEEF"
	};

	export const bars = {
		mouseover: {
			strokeWidth: 4,
			strokeOpacity: 0.5
		},
		mouseout: {
			strokeWidth: 0,
			strokeWidthAccessible: 2,
			strokeOpacity: 1
		},
		default: {
			strokeWidth: 2
		},
		spacing: {
			bars: 0.2,
			datasets: 0.25
		}
	};

	export const lines = {
		points: {
			strokeWidth: 4,
			mouseover: {
				strokeOpacity: 0.5
			},
			mouseout: {
				strokeOpacity: 1
			}
		}
	};

	export const pie = {
		minWidth: 100,
		maxWidth: 516.6,
		mouseover: {
			strokeWidth: 6,
			strokeOpacity: 0.5
		},
		mouseout: {
			strokeWidth: 0,
			strokeOpacity: 1
		},
		sliceLimit: 6,
		label: {
			dy: ".32em",
			margin: 15,
			other: "Other"
		},
		default: {
			strokeWidth: 2
		}
	};

	export const donut = {
		centerText: {
			title: {
				y: 22
			},
			breakpoint: 175,
			magicScaleRatio: 2.5,
			numberFontSize: 24,
			titleFontSize: 15
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
		},
		items: {
			status: {
				ACTIVE: 1,
				DISABLED: 0
			},
		},
		basedOn: {
			SERIES: "series",
			LABELS: "labels"
		}
	};

	export const tooltip = {
		width: 200,
		arrowWidth: 10,
		magicXPoint2: 20,
		magicTop1: 21,
		magicTop2: 22,
		magicLeft1: 11,
		magicLeft2: 12,
		fadeIn: {
			duration: 250
		},
		fadeOut: {
			duration: 250
		}
	};

	export const transitions = {
		default: {
			duration: 750
		}
	};

	export const selectors = {
		OUTERSVG: "svg.chart-svg",
		INNERWRAP: "g.inner-wrap",
		CHARTWRAPPER: "div.chart-wrapper",
		TOOLTIP: "div.chart-tooltip",
		LEGEND_BTN: "li.legend-btn",
		pie: {
			SLICE: "path"
		}
	};
}
