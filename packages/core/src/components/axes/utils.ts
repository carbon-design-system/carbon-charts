import { min } from "d3-array";

export const TIME_INTERVALS = [
	["15seconds", 15 * 1000],
	["minute", 60 * 1000],
	["30minutes", 30 * 60 * 1000],
	["hourly", 60 * 60 * 1000],
	["daily", 24 * 60 * 60 * 1000],
	["monthly", 30 * 24 * 60 * 60 * 1000],
	["quarterly", 3 * 30 * 24 * 60 * 60 * 1000],
	["yearly", 12 * 30 * 24 * 60 * 60 * 1000]
];

interface Options {
	hour12Format: boolean;
	showDayName: boolean;
}

// Returns the formatted current tick
export function formatTick(current: number, previous: number | null, interval: string, options: Options): string {
	const {
		YYYY,
		YY,
		Q,
		ss,
		mm,
		HH,
		hh,
		DD,
		ddd,
		MMM,
		A,
		D,
		d,
		M,
	} = timestampToFormatTime(current);
	const previousTimeObj = timestampToFormatTime(previous);
	const { hour12Format, showDayName } = options;

	switch (interval) {
		case "15seconds": {
			const hours = hour12Format ? `${hh}:${mm}:${ss} ${A}` : `${HH}:${mm}:${ss}`;
			const long = `${MMM} ${DD}, ${hours}`;
			const short = `${hours}`;

			if (!previous) {
				return long;
			}
			if (D !== previousTimeObj.D) {
				return long;
			}
			if (M !== previousTimeObj.M) {
				return long;
			}
			if (YYYY !== previousTimeObj.YYYY) {
				return long;
			}
			return short;
		}

		case "minute": {
			const hours = hour12Format ? `${hh}:${mm} ${A}` : `${HH}:${mm}`;
			const long = `${MMM} ${D}, ${hours}`;
			const short = `${hours}`;

			if (!previous) {
				return long;
			}
			if (D !== previousTimeObj.D) {
				return long;
			}
			if (M !== previousTimeObj.M) {
				return long;
			}
			if (YYYY !== previousTimeObj.YYYY) {
				return long;
			}
			return short;
		}

		case "30minutes": {
			const hours = hour12Format ? `${hh}:${mm} ${A}` : `${HH}:${mm}`;
			const long = `${MMM} ${D}, ${hours}`;
			const short = `${hours}`;

			if (!previous) {
				return long;
			}
			if (D !== previousTimeObj.D) {
				return long;
			}
			if (M !== previousTimeObj.M) {
				return long;
			}
			if (YYYY !== previousTimeObj.YYYY) {
				return long;
			}
			return short;
		}

		case "hourly": {
			const hours = hour12Format ? `${hh}:${mm} ${A}` : `${HH}:${mm}`;
			const long = `${MMM} ${D}, ${hours}`;
			const short = `${hours}`;

			if (!previous) {
				return long;
			}
			if (D !== previousTimeObj.D) {
				return long;
			}
			if (M !== previousTimeObj.M) {
				return long;
			}
			if (YYYY !== previousTimeObj.YYYY) {
				return long;
			}
			return short;
		}

		case "daily": {
			if (showDayName) {
				const long = `${ddd}, ${MMM} ${D}`;
				const short = `${ddd}`;

				if (!previous) {
					return long;
				}
				if (d === 1) {
					return long; // long label on monday
				}
				if (YYYY !== previousTimeObj.YYYY) {
					return long;
				}
				return short;
			} else {
				const long = `${MMM} ${D}`;
				const short = `${D}`;

				if (!previous) {
					return long;
				}
				if (M !== previousTimeObj.M) {
					return long;
				}
				if (YYYY !== previousTimeObj.YYYY) {
					return long;
				}
				return short;
			}
		}

		case "monthly": {
			const long = `${MMM} ${YYYY}`;
			const short = `${MMM}`;

			if (!previous) {
				return long;
			}
			if (YYYY !== previousTimeObj.YYYY) {
				return long;
			}
			return short;
		}

		case "quarterly": {
			const long = `Q${Q} '${YY}`;
			const short = `Q${Q}`;

			if (!previous) {
				return long;
			}
			if (YYYY !== previousTimeObj.YYYY) {
				return long;
			}
			return short;
		}

		case "yearly": {
			return `${YYYY}`;
		}

		default: {
			throw new Error(`${interval} is not a valid time interval.`);
		}
	}
}

// pad a number with leading zeroes to make it a fixed width of 2
function padWithZero(value: number): string {
	return value.toString().padStart(2, "0");
}

// 12 (am) [midnight] ... 12 (pm) [noon] ... 11 (pm)
function h12StandardFormat(H: number) {
	return H % 12 || 12;
}

// 0 (am) [midnight] ... 12 (pm) [noon] ... 11 (pm)
function h12IbmFormat(H: number) {
	if (H > 12) {
		return H % 12;
	}
	return H;
}

// Given a timestamp, returns an object of useful time formats
export function timestampToFormatTime(timestamp: number) {
	const date = new Date(timestamp);
	return {
		YYYY: date.getFullYear().toString(), // 4-digit year
		YY: date
			.getFullYear()
			.toString()
			.slice(-2), // 2-digit year
		Q: Math.ceil((date.getMonth() + 1) / 3), // quarter: 1-4
		M: date.getMonth() + 1, // month: 1-12
		MM: padWithZero(date.getMonth() + 1), // month: 01-12
		MMM: date.toLocaleString("en-US", { month: "short" }), // short name of the month: Jan-Dec
		MMMM: date.toLocaleString("en-US", { month: "long" }), // long name of the month: January-December
		D: date.getDate(), // day of the month: 1-31
		DD: padWithZero(date.getDate()), // day of the month: 01-31
		d: date.getDay(), // day of the week with Sunday as 0: 0-6
		ddd: date.toLocaleString("en-US", { weekday: "short" }), // short name of the day of the week: Sun-Sat
		dddd: date.toLocaleString("en-US", { weekday: "long" }), // long name of the day of the week: Sunday-Saturday
		H: date.getHours(), // 24-hour clock: 0-23
		HH: padWithZero(date.getHours()), // 24-hour clock: 00-23
		h: h12StandardFormat(date.getHours()), // 12-hour clock: 1-12
		hh: padWithZero(h12StandardFormat(date.getHours())), // 12-hour clock: 01-12
		hIbm: h12IbmFormat(date.getHours()), // 12-hour clock: 0-12
		hhIbm: padWithZero(h12IbmFormat(date.getHours())), // 12-hour clock: 00-12
		A: date.getHours() < 12 ? "AM" : "PM", // AM/PM
		m: date.getMinutes(), // minute: 0-59
		mm: padWithZero(date.getMinutes()), // minutes: 00-59
		s: date.getSeconds(), // seconds: 0-59
		ss: padWithZero(date.getSeconds()), // seconds: 00-59
	};
}

// Find the differences between consecutive numbers in an array
function consecutiveDifferences(elements: number[]): number[] {
	if (!elements) {
		return;
	}
	return elements.slice(1).map((elem, i) => elem - elements[i]);
}

// Given a number, returns the closest TIME_INTERVAL name
function closestTimeIntervalName(ms: number): string {
	const index = TIME_INTERVALS.reduce((acc, [key, value]: [string, number], i) => {
		const previousSpan = Math.abs(acc - ms);
		const currentSpan = Math.abs(value - ms);
		return previousSpan < currentSpan ? acc : i;
	}, 0);
	return TIME_INTERVALS[index][0] as string;
}

// Given an array of timestamps, returns the interval name
// between 15seconds, minute, 30minutes, hourly, daily, weekly, monthly, quarterly, yearly
export function computeTimeIntervalName(ticks: number[]): string {
	const differences = consecutiveDifferences(ticks);
	const minDifference = min(differences);
	return closestTimeIntervalName(minDifference);
}