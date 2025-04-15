import { min } from 'd3'
import { format } from 'date-fns/format'
import { Locale } from '../interfaces/components'
import { getProperty } from '@/tools'
import { TimeIntervalFormats, TimeIntervalNames, TimeScaleOptions } from '@/interfaces/axis-scales'

export const TIME_INTERVALS = [
	['15seconds', 15 * 1000],
	['minute', 60 * 1000],
	['30minutes', 30 * 60 * 1000],
	['hourly', 60 * 60 * 1000],
	['daily', 24 * 60 * 60 * 1000],
	['monthly', 30 * 24 * 60 * 60 * 1000],
	['quarterly', 3 * 30 * 24 * 60 * 60 * 1000],
	['yearly', 12 * 30 * 24 * 60 * 60 * 1000]
]

// Return true if the tick is a primary tick, false otherwise
export function isTickPrimary(
	tick: number,
	i: number,
	allTicks: Array<number>,
	interval: string,
	showDayName: boolean
): boolean {
	const isFirstTick = i === 0
	const hasANewWeekStarted = Number(format(new Date(tick), 'c')) === 2
	const isFirstQuarter = Number(format(new Date(tick), 'q')) === 1
	const previousTick = i !== 0 ? allTicks[i - 1] : null

	switch (interval) {
		case '15seconds':
			return (
				isFirstTick ||
				isDayOfMonthChanged(tick) ||
				isMonthChanged(tick, previousTick) ||
				isYearChanged(tick)
			)
		case 'minute':
			return (
				isFirstTick ||
				isDayOfMonthChanged(tick) ||
				isMonthChanged(tick, previousTick) ||
				isYearChanged(tick)
			)
		case '30minutes':
			return (
				isFirstTick ||
				isDayOfMonthChanged(tick) ||
				isMonthChanged(tick, previousTick) ||
				isYearChanged(tick)
			)
		case 'hourly':
			return (
				isFirstTick ||
				isDayOfMonthChanged(tick) ||
				isMonthChanged(tick, previousTick) ||
				isYearChanged(tick)
			)
		case 'daily':
			if (!showDayName) {
				// daily
				return isFirstTick || isMonthChanged(tick, previousTick) || isYearChanged(tick)
			} else {
				// weekly
				return isFirstTick || hasANewWeekStarted || isYearChanged(tick)
			}
		case 'weekly':
			return isFirstTick || hasANewWeekStarted || isYearChanged(tick)
		case 'monthly':
			return isFirstTick || isYearChanged(tick)
		case 'quarterly':
			return isFirstTick || isFirstQuarter
		case 'yearly':
			return false
		default:
			throw new Error(`${interval} is not a valid time interval.`)
	}
}

// Return the formatted current tick
export function formatTick(
	tick: number,
	i: number,
	allTicks: Array<number>,
	interval: string,
	timeScaleOptions: TimeScaleOptions,
	localeOptions?: Locale
): string {
	const showDayName = timeScaleOptions.showDayName
	const intervalConsideringAlsoShowDayNameOption =
		interval === 'daily' && showDayName ? 'weekly' : interval
	const date = new Date(tick)
	const formats = getProperty(timeScaleOptions, 'timeIntervalFormats')[
		intervalConsideringAlsoShowDayNameOption
	]
	const primary = getProperty(formats, 'primary')
	const secondary = getProperty(formats, 'secondary')
	const primaryTickFlag = isTickPrimary(tick, i, allTicks, interval, showDayName)
	let formatString = primaryTickFlag ? primary : secondary

	// if the interval, and the timestamp includes milliseconds value
	if (interval === '15seconds' && date.getMilliseconds() !== 0) {
		// show milliseconds in tick
		formatString = formatString.replace('pp', 'h:mm:ss.SSS a')
	}

	const locale = timeScaleOptions.localeObject
	const { code: localeCode, optionsObject } = localeOptions
	const formatterType = optionsObject[interval]['type']
	const formatterOptions =
		optionsObject[interval][primaryTickFlag ? 'primary' : 'secondary'][formatString]

	if (interval === 'quarterly' || !formatterOptions) {
		const formattedDate = format(date, formatString, { locale })
		const formatArr = formattedDate.split('').map(val => {
			const num = Number(val)
			if (val !== ' ' && !Number.isNaN(num)) {
				return num?.toLocaleString?.(localeCode)
			} else {
				return val
			}
		})
		return localeOptions[formatterType](date, localeCode, {}, formatArr.join(''))
	} else {
		return localeOptions[formatterType](date, localeCode, formatterOptions)
	}
}

// Given a timestamp, return an object of useful time formats
// Use Unicode date field symbol (https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
export function getTimeformats(timestamp: number) {
	const date = new Date(timestamp)
	return {
		M: date.getMonth() + 1, // month: 1-12
		d: date.getDate(), // day of the month: 1-31
		H: date.getHours(), // 24-hour clock: 0-23
		m: date.getMinutes(), // minute: 0-59
		s: date.getSeconds() // seconds: 0-59
	}
}

// Find the differences between consecutive numbers in an array
function getConsecutiveDifferences(elements: number[]): number[] {
	if (!elements) {
		return
	}
	return elements.slice(1).map((elem, i) => elem - elements[i])
}

// Given a duration in ms, return the closest TIME_INTERVAL name
function closestTimeIntervalName(duration: number): string {
	const index = TIME_INTERVALS.reduce((nearestIndex, [, delta]: [string, number], i) => {
		const deltaNearest = TIME_INTERVALS[nearestIndex][1] as number
		const oldNearestSpan = Math.abs(deltaNearest - duration)
		const currentSpan = Math.abs(delta - duration)
		return oldNearestSpan < currentSpan ? nearestIndex : i
	}, 0)
	return TIME_INTERVALS[index][0] as string
}

// Given an array of timestamps, return the interval name
// between 15seconds, minute, 30minutes, hourly, daily, weekly, monthly, quarterly, yearly
export function computeTimeIntervalName(
	ticks: number[],
	intervalOverride?: keyof TimeIntervalFormats
): string {
	if (TimeIntervalNames[intervalOverride]) {
		return intervalOverride
	}

	// special case: if the dataset has only one datum, we show the tick in the most detailed way possible
	if (ticks.length === 1) {
		return '15seconds'
	}
	const differences = getConsecutiveDifferences(ticks)
	const minDifference = min(differences)
	return closestTimeIntervalName(minDifference)
}

// Return true if the day of the month (D = 1-31) is changed, false otherwise
function isDayOfMonthChanged(timestamp: number): boolean {
	const { s, m, H } = getTimeformats(timestamp)
	return H === 0 && m === 0 && s === 0
}

// Return true if the month (M = 1-12) is changed from previous tick's timestamp, false otherwise
function isMonthChanged(timestamp: number, previousTimestamp?: number): boolean {
	const currentMonth = getTimeformats(timestamp).M
	const previousMonth = getTimeformats(previousTimestamp).M
	return currentMonth !== previousMonth
}

// Return true if the year (YYYY) is changed, false otherwise
function isYearChanged(timestamp: number): boolean {
	const { M, d, s, m, H } = getTimeformats(timestamp)
	return M === 1 && d === 1 && H === 0 && m === 0 && s === 0
}

// Return string value of Date with milliseconds
export function formatDateTillMilliSeconds(date: Date) {
	if (date === undefined) {
		return ''
	}

	// The only valid format with millisecond is ISO 8601
	return date.toISOString()
}
