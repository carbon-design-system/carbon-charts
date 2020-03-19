import { format } from "date-fns";
import * as locales from "date-fns/locale";
import { TimeScaleOptions } from "../interfaces/axis-scales";
import { Tools } from "../tools";

// D3 Imports
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

const codes = Object.values(locales).map(locale => locale["code"]);

// Return true if the tick is a primary tick, false otherwise
export function isTickPrimary(tick: number, i: number, interval: string, showDayName: boolean): boolean {
	const isFirstTick = i === 0;
	const hasANewWeekStarted = Number(format((new Date(tick)), "c")) === 2;
	const isFirstQuarter = Number(format((new Date(tick)), "q")) === 1;

	switch (interval) {
		case "15seconds":
			return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick));
		case "minute":
			return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick));
		case "30minutes":
			return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick));
		case "hourly":
			return (isFirstTick || isDayOfMonthChanged(tick) || isMonthChanged(tick) || isYearChanged(tick));
		case "daily":
			if (!showDayName) { // daily
				return (isFirstTick || isMonthChanged(tick) || isYearChanged(tick));
			} else { // weekly
				return (isFirstTick || hasANewWeekStarted || isYearChanged(tick));
			}
		case "monthly":
			return (isFirstTick || isYearChanged(tick));
		case "quarterly":
			return (isFirstTick || isFirstQuarter);
		case "yearly":
			return false;
		default:
			throw new Error(`${interval} is not a valid time interval.`);
	}
}

// The accepted formats of localeCode are ll and ll-CC
function getLocale(localeCode: string): Locale {
	// locales is an object whose keys format is ll or llCC
	// each locale is an object whose code value format is ll or ll-CC
	const localeCodeWithoutDash = localeCode.replace(/-/g, "");
	const foundLocale = locales[localeCodeWithoutDash];
	if (!foundLocale) {
		throw new Error(`Locale with code ${localeCode} not found. Avaible codes are: ${codes}.`);
	}
	return foundLocale;
}

// Return the formatted current tick
export function formatTick(tick: number, i: number, interval: string, timeScaleOptions: TimeScaleOptions): string {
	const showDayName = timeScaleOptions.showDayName;
	const intervalConsideringAlsoShowDayNameOption = interval === "daily" && showDayName ? "weekly" : interval;
	const date = new Date(tick);
	const formats = Tools.getProperty(timeScaleOptions, "timeIntervalFormats")[intervalConsideringAlsoShowDayNameOption];
	const primary = Tools.getProperty(formats, "primary");
	const secondary = Tools.getProperty(formats, "secondary");
	const localeCode = timeScaleOptions.localeCode;
	const formatString = isTickPrimary(tick, i, interval, showDayName) ? primary : secondary;
	const locale = getLocale(localeCode);

	return format(date, formatString, { locale });
}

// Given a timestamp, return an object of useful time formats
// Use Unicode date field symbol (https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
export function timestampToFormatTime(timestamp: number) {
	const date = new Date(timestamp);
	return {
		M: date.getMonth() + 1, // month: 1-12
		d: date.getDate(), // day of the month: 1-31
		H: date.getHours(), // 24-hour clock: 0-23
		m: date.getMinutes(), // minute: 0-59
		s: date.getSeconds(), // seconds: 0-59
	};
}

// Find the differences between consecutive numbers in an array
function consecutiveDifferences(elements: number[]): number[] {
	if (!elements) {
		return;
	}
	return elements.slice(1).map((elem, i) => elem - elements[i]);
}

// Given a number, return the closest TIME_INTERVAL name
function closestTimeIntervalName(ms: number): string {
	const index = TIME_INTERVALS.reduce((acc, [key, value]: [string, number], i) => {
		const previousSpan = Math.abs(acc - ms);
		const currentSpan = Math.abs(value - ms);
		return previousSpan < currentSpan ? acc : i;
	}, 0);
	return TIME_INTERVALS[index][0] as string;
}

// Given an array of timestamps, return the interval name
// between 15seconds, minute, 30minutes, hourly, daily, weekly, monthly, quarterly, yearly
export function computeTimeIntervalName(ticks: number[]): string {
	// special case: if the dataset has only one datum, we show the tick in the most detailed way possible
	if (ticks.length === 1) {
		return "15seconds";
	}
	const differences = consecutiveDifferences(ticks);
	const minDifference = min(differences);
	return closestTimeIntervalName(minDifference);
}

// Return true if the day of the month (D = 1-31) is changed, false otherwise
function isDayOfMonthChanged(timestamp: number): boolean {
	const { s, m, H } = timestampToFormatTime(timestamp);
	return H === 0 && m === 0 && s === 0;
}

// Return true if the month (M = 1-12) is changed, false otherwise
function isMonthChanged(timestamp: number): boolean {
	const { d, s, m, H } = timestampToFormatTime(timestamp);
	return d === 1 && H === 0 && m === 0 && s === 0;
}

// Return true if the year (YYYY) is changed, false otherwise
function isYearChanged(timestamp: number): boolean {
	const { M, d, s, m, H } = timestampToFormatTime(timestamp);
	return M === 1 && d === 1 && H === 0 && m === 0 && s === 0;
}
