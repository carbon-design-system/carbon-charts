import { TestEnvironment } from "./tests/index";

// import the settings for the css prefixes
import settings from "carbon-components/es/globals/js/settings";

import { options } from "./configuration";
import { Events } from "./interfaces";

import { select } from "d3-selection";

describe("selectedGroups option", () => {
	beforeEach(function () {
		const testEnvironment = new TestEnvironment();
		testEnvironment.render();

		this.chart = testEnvironment.getChartReference();
		this.testEnvironment = testEnvironment;
	});

	describe("selected groups", () => {
		it("should match the selected legend labels", function (done) {
			const chartEventsService = this.chart.services.events;

			const sampleSelectedGroups = ['Dataset 1', 'Dataset 3'];

			const renderCb = () => {
				// Remove render event listener
				chartEventsService.removeEventListener(
					Events.Chart.RENDER_FINISHED,
					renderCb
				);

				const legendGroup = select(
					`g.${settings.prefix}--${options.chart.style.prefix}--legend`
				);
				
				const selectedLegendLabels = legendGroup
					.selectAll('g.legend-item.active > text')
					.nodes()
					.map(item => item['innerHTML']);

				expect(selectedLegendLabels).toEqual(sampleSelectedGroups);

				done();
			};

			// Add event listener for when chart render is finished
			chartEventsService.addEventListener(
				Events.Chart.RENDER_FINISHED,
				renderCb
			);
		})
	})

	afterEach(function () {
		this.testEnvironment.destroy();
	});
})
