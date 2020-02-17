import { formatTick, computeTimeIntervalName } from "./utils";

type TickTuple = [Date, string];
type Dataset = TickTuple[];
interface Options {
	hour12Format?: boolean;
	showDayName?: boolean;
}

const defaultOptions = { hour12Format: true, showDayName: false };

const format = (ticks: number[], timeInterval: string, options: Options = defaultOptions) => {
	const opt = { ...defaultOptions, ...options };
	return ticks.map((tick, i) => formatTick(tick, i, timeInterval, opt).formattedTick);
};

const getTimestampsAndFormattedTicks = (dataset: Dataset) => {
	const timestamps = dataset.map(d => d[0].getTime());
	const formattedTicks = dataset.map(d => d[1]);
	return { timestamps, formattedTicks };
};

it("should format ticks with timeInterval 15seconds", () => {
	// 12h format
	const dataset12h: Dataset = [
		[new Date(2020, 11, 10, 23, 59, 15), "Dec 10, 11:59:15 PM"],
		[new Date(2020, 11, 10, 23, 59, 30), "11:59:30 PM"],
		[new Date(2020, 11, 10, 23, 59, 45), "11:59:45 PM"],
		[new Date(2020, 11, 11, 0, 0, 0), "Dec 11, 12:00:00 AM"],
		[new Date(2020, 11, 11, 0, 0, 15), "12:00:15 AM"],
		[new Date(2020, 11, 11, 0, 0, 30), "12:00:30 AM"],
		[new Date(2020, 11, 11, 0, 0, 45), "12:00:45 AM"],
	];
	const { timestamps: timestamps12h, formattedTicks: formattedTicks12h } = getTimestampsAndFormattedTicks(dataset12h);
	const timeInterval12h = computeTimeIntervalName(timestamps12h);
	expect(timeInterval12h).toEqual("15seconds");
	expect(format(timestamps12h, timeInterval12h)).toEqual(formattedTicks12h);

	// 24h format
	const dataset24h: Dataset = [
		[new Date(2020, 11, 10, 23, 59, 15), "Dec 10, 23:59:15"],
		[new Date(2020, 11, 10, 23, 59, 30), "23:59:30"],
		[new Date(2020, 11, 10, 23, 59, 45), "23:59:45"],
		[new Date(2020, 11, 11, 0, 0, 0), "Dec 11, 00:00:00"],
		[new Date(2020, 11, 11, 0, 0, 15), "00:00:15"],
		[new Date(2020, 11, 11, 0, 0, 30), "00:00:30"],
		[new Date(2020, 11, 11, 0, 0, 45), "00:00:45"],
	];
	const { timestamps: timestamps24h, formattedTicks: formattedTicks24h } = getTimestampsAndFormattedTicks(dataset24h);
	const timeInterval24h = computeTimeIntervalName(timestamps24h);
	expect(timeInterval24h).toEqual("15seconds");
	expect(format(timestamps24h, timeInterval24h, { hour12Format: false })).toEqual(formattedTicks24h);
});

it("should format ticks with timeInterval minute", () => {
	// 12h format
	const dataset12h: Dataset = [
		[new Date(2020, 4, 21, 23, 47, 0), "May 21, 11:47 PM"],
		[new Date(2020, 4, 21, 23, 58, 0), "11:58 PM"],
		[new Date(2020, 4, 21, 23, 59, 0), "11:59 PM"],
		[new Date(2020, 4, 22, 0, 0, 0), "May 22, 12:00 AM"],
		[new Date(2020, 4, 22, 0, 1, 0), "12:01 AM"],
		[new Date(2020, 4, 22, 0, 2, 0), "12:02 AM"],
		[new Date(2020, 4, 22, 0, 3, 0), "12:03 AM"],
		[new Date(2020, 4, 22, 11, 58, 0), "11:58 AM"],
		[new Date(2020, 4, 22, 11, 59, 0), "11:59 AM"],
		[new Date(2020, 4, 22, 12, 0, 0), "12:00 PM"],
		[new Date(2020, 4, 22, 12, 1, 0, 0), "12:01 PM"],
		[new Date(2020, 4, 22, 12, 2, 0), "12:02 PM"],
	];
	const { timestamps: timestamps12h, formattedTicks: formattedTicks12h } = getTimestampsAndFormattedTicks(dataset12h);
	const timeInterval12h = computeTimeIntervalName(timestamps12h);
	expect(timeInterval12h).toEqual("minute");
	expect(format(timestamps12h, timeInterval12h)).toEqual(formattedTicks12h);

	// 24h format
	const dataset24h: Dataset = [
		[new Date(2020, 4, 21, 23, 47, 0), "May 21, 23:47"],
		[new Date(2020, 4, 21, 23, 58, 0), "23:58"],
		[new Date(2020, 4, 21, 23, 59, 0), "23:59"],
		[new Date(2020, 4, 22, 0, 0, 0), "May 22, 00:00"],
		[new Date(2020, 4, 22, 0, 1, 0), "00:01"],
		[new Date(2020, 4, 22, 0, 2, 0), "00:02"],
		[new Date(2020, 4, 22, 0, 3, 0), "00:03"],
		[new Date(2020, 4, 22, 11, 58, 0), "11:58"],
		[new Date(2020, 4, 22, 11, 59, 0), "11:59"],
		[new Date(2020, 4, 22, 12, 0, 0), "12:00"],
		[new Date(2020, 4, 22, 12, 1, 0, 0), "12:01"],
		[new Date(2020, 4, 22, 12, 2, 0), "12:02"],
	];
	const { timestamps: timestamps24h, formattedTicks: formattedTicks24h } = getTimestampsAndFormattedTicks(dataset24h);
	const timeInterval24h = computeTimeIntervalName(timestamps24h);
	expect(timeInterval24h).toEqual("minute");
	expect(format(timestamps24h, timeInterval24h, { hour12Format: false })).toEqual(formattedTicks24h);
});

it("should format ticks with timeInterval 30minutes", () => {
	// 12h format
	const dataset12h: Dataset = [
		[new Date(2020, 11, 10, 22, 30), "Dec 10, 10:30 PM"],
		[new Date(2020, 11, 10, 23, 0), "11:00 PM"],
		[new Date(2020, 11, 10, 23, 30), "11:30 PM"],
		[new Date(2020, 11, 11, 0, 0), "Dec 11, 12:00 AM"],
		[new Date(2020, 11, 11, 0, 30), "12:30 AM"],
		[new Date(2020, 11, 11, 1, 0), "01:00 AM"],
		[new Date(2020, 11, 11, 1, 30), "01:30 AM"],
	];
	const { timestamps: timestamps12h, formattedTicks: formattedTicks12h } = getTimestampsAndFormattedTicks(dataset12h);
	const timeInterval12h = computeTimeIntervalName(timestamps12h);
	expect(timeInterval12h).toEqual("30minutes");
	expect(format(timestamps12h, timeInterval12h)).toEqual(formattedTicks12h);

	// 24h format
	const dataset24h: Dataset = [
		[new Date(2020, 11, 10, 22, 30), "Dec 10, 22:30"],
		[new Date(2020, 11, 10, 23, 0), "23:00"],
		[new Date(2020, 11, 10, 23, 30), "23:30"],
		[new Date(2020, 11, 11, 0, 0), "Dec 11, 00:00"],
		[new Date(2020, 11, 11, 0, 30), "00:30"],
		[new Date(2020, 11, 11, 1, 0), "01:00"],
		[new Date(2020, 11, 11, 1, 30), "01:30"],
	];
	const { timestamps: timestamps24h, formattedTicks: formattedTicks24h } = getTimestampsAndFormattedTicks(dataset24h);
	const timeInterval24h = computeTimeIntervalName(timestamps24h);
	expect(timeInterval24h).toEqual("30minutes");
	expect(format(timestamps24h, timeInterval24h, { hour12Format: false })).toEqual(formattedTicks24h);
});

it("should format ticks with timeInterval hourly", () => {
	// 12h format
	const dataset12h: Dataset = [
		[new Date(2020, 11, 10, 22, 0), "Dec 10, 10:00 PM"],
		[new Date(2020, 11, 10, 23, 0), "11:00 PM"],
		[new Date(2020, 11, 11, 0, 0), "Dec 11, 12:00 AM"],
		[new Date(2020, 11, 11, 1, 0), "01:00 AM"],
		[new Date(2020, 11, 11, 2, 0), "02:00 AM"],
		[new Date(2020, 11, 11, 3, 0), "03:00 AM"],
		[new Date(2020, 11, 11, 4, 0), "04:00 AM"],
		[new Date(2020, 11, 11, 11, 0), "11:00 AM"],
		[new Date(2020, 11, 11, 12, 0), "12:00 PM"],
		[new Date(2020, 11, 11, 13, 0), "01:00 PM"],
		[new Date(2020, 11, 11, 14, 0), "02:00 PM"],
		[new Date(2020, 11, 11, 15, 0), "03:00 PM"],
	];
	const { timestamps: timestamps12h, formattedTicks: formattedTicks12h } = getTimestampsAndFormattedTicks(dataset12h);
	const timeInterval12h = computeTimeIntervalName(timestamps12h);
	expect(timeInterval12h).toEqual("hourly");
	expect(format(timestamps12h, timeInterval12h)).toEqual(formattedTicks12h);

	// 24h format
	const dataset24h: Dataset = [
		[new Date(2020, 11, 10, 22, 0), "Dec 10, 22:00"],
		[new Date(2020, 11, 10, 23, 0), "23:00"],
		[new Date(2020, 11, 11, 0, 0), "Dec 11, 00:00"],
		[new Date(2020, 11, 11, 1, 0), "01:00"],
		[new Date(2020, 11, 11, 2, 0), "02:00"],
		[new Date(2020, 11, 11, 3, 0), "03:00"],
		[new Date(2020, 11, 11, 4, 0), "04:00"],
		[new Date(2020, 11, 11, 11, 0), "11:00"],
		[new Date(2020, 11, 11, 12, 0), "12:00"],
		[new Date(2020, 11, 11, 13, 0), "13:00"],
		[new Date(2020, 11, 11, 14, 0), "14:00"],
		[new Date(2020, 11, 11, 15, 0), "15:00"],
	];
	const { timestamps: timestamps24h, formattedTicks: formattedTicks24h } = getTimestampsAndFormattedTicks(dataset24h);
	const timeInterval24h = computeTimeIntervalName(timestamps24h);
	expect(timeInterval24h).toEqual("hourly");
	expect(format(timestamps24h, timeInterval24h, { hour12Format: false })).toEqual(formattedTicks24h);
});

it("should format ticks with timeInterval daily", () => {
	// !showDayName
	const datasetDayNumber: Dataset = [
		[new Date(2019, 11, 30), "Dec 30"],
		[new Date(2019, 11, 31), "31"],
		[new Date(2020, 0, 1), "Jan 1"],
		[new Date(2020, 0, 2), "2"],
		[new Date(2020, 0, 3), "3"],
		[new Date(2020, 0, 4), "4"],
		[new Date(2020, 0, 5), "5"],
		[new Date(2020, 0, 30), "30"],
		[new Date(2020, 0, 31), "31"],
		[new Date(2020, 1, 1), "Feb 1"],
		[new Date(2020, 1, 2), "2"],
		[new Date(2020, 1, 3), "3"],
	];
	const { timestamps: timestampsDayNumber, formattedTicks: formattedTicksDayNumber } = getTimestampsAndFormattedTicks(datasetDayNumber);
	const timeIntervalDayNumber = computeTimeIntervalName(timestampsDayNumber);
	expect(timeIntervalDayNumber).toEqual("daily");
	expect(format(timestampsDayNumber, timeIntervalDayNumber)).toEqual(formattedTicksDayNumber);

	// showDayName
	const datasetDayName: Dataset = [
		[new Date(2020, 0, 27), "Mon, Jan 27"],
		[new Date(2020, 0, 28), "Tue"],
		[new Date(2020, 0, 29), "Wed"],
		[new Date(2020, 0, 30), "Thu"],
		[new Date(2020, 0, 31), "Fri"],
		[new Date(2020, 1, 1), "Sat"],
		[new Date(2020, 1, 2), "Sun"],
		[new Date(2020, 1, 3), "Mon, Feb 3"],
		[new Date(2020, 1, 4), "Tue"],
		[new Date(2020, 1, 5), "Wed"],
		[new Date(2020, 1, 6), "Thu"],
		[new Date(2020, 1, 7), "Fri"],
	];
	const { timestamps: timestampsDayName, formattedTicks: formattedTicksDayName } = getTimestampsAndFormattedTicks(datasetDayName);
	const timeIntervalDayName = computeTimeIntervalName(timestampsDayName);
	expect(timeIntervalDayName).toEqual("daily");
	expect(format(timestampsDayName, timeIntervalDayName, { showDayName: true })).toEqual(formattedTicksDayName);
});

it("should format ticks with timeInterval monthly", () => {
	const dataset: Dataset = [
		[new Date(2018, 9), "Oct 2018"],
		[new Date(2018, 10), "Nov"],
		[new Date(2018, 11), "Dec"],
		[new Date(2019, 0), "Jan 2019"],
		[new Date(2019, 1), "Feb"],
		[new Date(2019, 2), "Mar"],
		[new Date(2019, 3), "Apr"],
		[new Date(2019, 10), "Nov"],
		[new Date(2019, 11), "Dec"],
		[new Date(2020, 0), "Jan 2020"],
		[new Date(2020, 1), "Feb"],
		[new Date(2020, 2), "Mar"],
	];
	const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset);
	const timeInterval = computeTimeIntervalName(timestamps);
	expect(timeInterval).toEqual("monthly");
	expect(format(timestamps, timeInterval)).toEqual(formattedTicks);
});

it("should format ticks with timeInterval quarterly", () => {
	const dataset: Dataset = [
		[new Date(2017, 0), `Q1 '17`],
		[new Date(2017, 3), `Q2`],
		[new Date(2017, 6), `Q3`],
		[new Date(2017, 9), `Q4`],
		[new Date(2018, 1), `Q1 '18`],
		[new Date(2018, 4), `Q2`],
		[new Date(2018, 7), `Q3`],
		[new Date(2019, 0), `Q1 '19`],
		[new Date(2019, 5), `Q2`],
		[new Date(2019, 7), `Q3`],
		[new Date(2019, 10), `Q4`],
		[new Date(2020, 0), `Q1 '20`],
	];
	const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset);
	const timeInterval = computeTimeIntervalName(timestamps);
	expect(timeInterval).toEqual("quarterly");
	expect(format(timestamps, timeInterval)).toEqual(formattedTicks);
});

it("should format ticks with timeInterval yearly", () => {
	const dataset: Dataset = [
		[new Date(1977, 0), "1977"],
		[new Date(1978, 0), "1978"],
		[new Date(1979, 0), "1979"],
		[new Date(1980, 0), "1980"],
		[new Date(1981, 0), "1981"],
		[new Date(1982, 0), "1982"],
		[new Date(1983, 0), "1983"],
		[new Date(2015, 0), "2015"],
		[new Date(2016, 0), "2016"],
		[new Date(2017, 0), "2017"],
		[new Date(2018, 0), "2018"],
		[new Date(2019, 0), "2019"]
	];
	const { timestamps, formattedTicks } = getTimestampsAndFormattedTicks(dataset);
	const timeInterval = computeTimeIntervalName(timestamps);
	expect(timeInterval).toEqual("yearly");
	expect(format(timestamps, timeInterval)).toEqual(formattedTicks);
});
