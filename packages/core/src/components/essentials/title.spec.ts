import { TestEnvironment } from '../../tests/index';

// import the settings for the css prefixes
import settings from 'carbon-components/es/globals/js/settings';

import { options } from './../../configuration';
import { Events } from './../../interfaces';

import { select } from 'd3-selection';

describe('title component', () => {
	beforeEach(function () {
		const testEnvironment = new TestEnvironment();
		testEnvironment.render();

		this.chart = testEnvironment.getChartReference();
		this.testEnvironment = testEnvironment;
	});

	describe('content', () => {
		it('should match text provided in options', function (done) {
			const sampleTitle = 'My chart';

			const chartEventsService = this.chart.services.events;
			const renderCb = () => {
				const title = select(
					`g.${settings.prefix}--${options.chart.style.prefix}--title`
				);

				// Remove event listener for when chart render is finished
				chartEventsService.removeEventListener(
					Events.Chart.RENDER_FINISHED,
					renderCb
				);

				expect(title.select('text').html()).toEqual(sampleTitle);

				done();
			};

			// Add event listener for when chart render is finished
			chartEventsService.addEventListener(
				Events.Chart.RENDER_FINISHED,
				renderCb
			);
		});
	});
});
