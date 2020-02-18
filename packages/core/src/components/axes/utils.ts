import { min } from "d3-array";
import { TIME_INTERVALS } from "./constants";
import { Tools } from "../../tools";
import * as Configuration from "../../configuration";
import { format } from "date-fns";
import * as locales from "date-fns/locale";
import { AxisOptions } from "src/interfaces";

const codes = Object.values(locales).map(locale => locale["code"]);

interface Options {
	hour12Format: boolean;
	showDayName: boolean;
}

// Return true if the tick is a primary tick, false otherwise
export function isTickPrimary(tick: number, i: number, interval: string, options: Options) {
	const { showDayName } = options;

	switch (interval) {
		case "15seconds": return (i === 0 || isDChanged(tick) || isMChanged(tick) || isYYYYChanged(tick));
		case "minute": return (i === 0 || isDChanged(tick) || isMChanged(tick) || isYYYYChanged(tick));
		case "30minutes": return (i === 0 || isDChanged(tick) || isMChanged(tick) || isYYYYChanged(tick));
		case "hourly": return (i === 0 || isDChanged(tick) || isMChanged(tick) || isYYYYChanged(tick));
		case "daily":
			if (!showDayName) { // daily
				return (i === 0 || isMChanged(tick) || isYYYYChanged(tick));
			} else { // weekly
				// TODO: check that c is always 1 for monday
				return (i === 0 || Number(format((new Date(tick)), "c")) === 1 || isYYYYChanged(tick));
			}
		// case "daily": return true;
		case "monthly": return (i === 0 || isYYYYChanged(tick));
		case "quarterly": return (i === 0 || Number(format((new Date(tick)), "q")) === 1);
		case "yearly": return false;
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
export function formatTick(tick: number, i: number, interval: string, options: Options, axisOptions: AxisOptions): string {
	const { hour12Format, showDayName } = options;

	const date = new Date(tick);
	const customFormats = Tools.getProperty(axisOptions, "ticks", "timeIntervalFormats");
	const defaultFormats = Configuration.axis.ticks.timeIntervalFormats[interval];
	const primary = Tools.getProperty(customFormats, interval, "primary") || defaultFormats.primary;
	const secondary = Tools.getProperty(customFormats, interval, "secondary") || defaultFormats.secondary;
	const localeCode = Tools.getProperty(customFormats, interval, "localeCode") || defaultFormats.localeCode;
	const formatString = isTickPrimary(tick, i, interval, options) ? primary : secondary;
	const locale = getLocale(localeCode);

	return format(date, formatString, { locale });
}

// Pad a number with leading zeroes to make it a fixed width of 2
function padWithZero(value: number): string {
	return value.toString().padStart(2, "0");
}

// 12 (am) [midnight] ... 12 (pm) [noon] ... 11 (pm)
function h12StandardFormat(H: number) {
	return H % 12 || 12;
}

// Given a timestamp, return an object of useful time formats
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
	const differences = consecutiveDifferences(ticks);
	const minDifference = min(differences);
	return closestTimeIntervalName(minDifference);
}

// Return true if the day of the month (D = 1-31) is changed, false otherwise
function isDChanged(timestamp: number): boolean {
	const { s, m, H } = timestampToFormatTime(timestamp);
	return H === 0 && m === 0 && s === 0;
}

// Return true if the month (M = 1-12) is changed, false otherwise
function isMChanged(timestamp: number): boolean {
	const { D, s, m, H } = timestampToFormatTime(timestamp);
	return D === 1 && H === 0 && m === 0 && s === 0;
}

// Return true if the year (YYYY) is changed, false otherwise
function isYYYYChanged(timestamp: number): boolean {
	const { M, D, s, m, H } = timestampToFormatTime(timestamp);
	return M === 1 && D === 1 && H === 0 && m === 0 && s === 0;
}
