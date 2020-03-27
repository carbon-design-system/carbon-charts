const slice = Array.prototype.slice;

const top = 1;
const right = 2;
const bottom = 3;
const left = 4;
const epsilon = 1e-6;

function translateX(x: number) {
	return "translate(" + (x + 0.5) + ",0)";
}

function translateY(y: number) {
	return "translate(0," + (y + 0.5) + ")";
}

function number(scale: any) {
	return function(d: any) {
		return +scale(d);
	};
}

function center(scale: any) {
	let offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
	if (scale.round()) {
		offset = Math.round(offset);
	}
	return function(d: any) {
		return +scale(d) + offset;
	};
}

function entering() {
	return !this.__axis;
}

function identity(x: any) {
	return x;
}

function axis(orient: any, scale: any) {
	let tickArguments = [];
	let tickValues = null;
	let tickFormat = null;
	let tickSizeInner = 6;
	let tickSizeOuter = 6;
	let tickPadding = 3;
	const k = orient === top || orient === left ? -1 : 1;
	const x = orient === left || orient === right ? "x" : "y";
	const transform = orient === top || orient === bottom ? translateX : translateY;

	function axisInner(context: any) {
		const values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues;
		const format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat;
		const spacing = Math.max(tickSizeInner, 0) + tickPadding;
		// const range = scale.range();
		// const range0 = +range[0] + 0.5;
		// const range1 = +range[range.length - 1] + 0.5;
		const position = (scale.bandwidth ? center : number)(scale.copy());
		const selection = context.selection ? context.selection() : context;
		// let path = selection.selectAll(".domain").data([null]);
		let tick = selection.selectAll(".tick").data(values, scale).order();
		let tickExit = tick.exit();
		const tickEnter = tick.enter().append("g").attr("class", "tick");
		let line = tick.select("line");
		// let text = tick.select("text");

		// path = path.merge(path.enter().insert("path", ".tick")
		// 	.attr("class", "domain")
		// 	.attr("stroke", "currentColor"));

		tick = tick.merge(tickEnter);

		line = line.merge(tickEnter.append("line")
			.attr("stroke", "currentColor")
			.attr(x + "2", k * tickSizeInner));

		// text = text.merge(tickEnter.append("text")
		// 	.attr("fill", "currentColor")
		// 	.attr(x, k * spacing)
		// 	.attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

		if (context !== selection) {
			// path = path.transition(context);
			tick = tick.transition(context);
			line = line.transition(context);
			// text = text.transition(context);

			tickExit = tickExit.transition(context)
				.attr("opacity", epsilon)
				.attr("transform", function(d) {
					return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform");
				});

			tickEnter
				.attr("opacity", epsilon)
				.attr("transform", function(d) {
					let p = this.parentNode.__axis;
					return transform(p && isFinite(p = p(d)) ? p : position(d));
				});
		}

		tickExit.remove();

		// path
		// 	.attr("d", orient === left || orient == right
		// 		? (tickSizeOuter
		// 			? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter
		// 			: "M0.5," + range0 + "V" + range1)
		// 		: (tickSizeOuter
		// 			? "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter
		// 			: "M" + range0 + ",0.5H" + range1));

		tick
			.attr("opacity", 1)
			.attr("transform", function(d) {
				return transform(position(d));
			});

		line
			.attr(x + "2", k * tickSizeInner);

		// text
		// 	.attr(x, k * spacing)
		// 	.text(format);

		selection.filter(entering)
			.attr("fill", "none")
			.attr("font-size", 10)
			.attr("font-family", "sans-serif")
			.attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

		selection
			.each(function() { this.__axis = position; });
	}

	axisInner.scale = function(_: any) {
		return arguments.length ? (scale = _, axis) : scale;
	};

	axisInner.ticks = function() {
		return tickArguments = slice.call(arguments), axis;
	};

	axisInner.tickArguments = function(_: any) {
		return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis) : tickArguments.slice();
	};

	axisInner.tickValues = function(_: any) {
		return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis) : tickValues && tickValues.slice();
	};

	axisInner.tickFormat = function(_: any) {
		return arguments.length ? (tickFormat = _, axis) : tickFormat;
	};

	axisInner.tickSize = function(_: any) {
		return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
	};

	axisInner.tickSizeInner = function(_: any) {
		return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
	};

	axisInner.tickSizeOuter = function(_: any) {
		return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
	};

	axisInner.tickPadding = function(_: any) {
		return arguments.length ? (tickPadding = +_, axis) : tickPadding;
	};

	return axis;
}

export function axisTop(scale: any) {
	return axis(top, scale);
}

export function axisRight(scale: any) {
	return axis(right, scale);
}

export function axisBottom(scale: any) {
	return axis(bottom, scale);
}

export function axisLeft(scale: any) {
	return axis(left, scale);
}
