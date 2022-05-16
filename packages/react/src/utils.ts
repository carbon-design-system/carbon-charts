const carbonPrefix = 'bx';
const chartsPrefix = 'cc';

export const hasChartBeenInitialized = (chartHolder: HTMLElement) =>
	!!chartHolder.querySelector(
		`div.${carbonPrefix}--${chartsPrefix}--chart-wrapper`
	);
