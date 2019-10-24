import { TestEnvironment } from "../../tests/index";

// import the settings for the css prefixes
import settings from "carbon-components/src/globals/js/settings";
import { options } from "./../../configuration";

import { select } from "d3-selection";

describe("legend component", () => {
	beforeEach(function() {
		const testEnvironment = new TestEnvironment();
		testEnvironment.render();

		this.chart = testEnvironment.getChartReference();
		this.testEnvironment = testEnvironment;
	});

	describe("content", () => {
		it("should have same amount of datasets", async function(done) {
			const data = this.testEnvironment.chartData;
			const numberOfDatasets = data.datasets.length;

			const chartEventsService = this.chart.services.events;

			const renderCb = () => {
				// Remove render event listener
				chartEventsService.removeEventListener("render-finished", renderCb);

				const numberOfLegendItems = select(`g.${settings.prefix}--${options.chart.style.prefix}--legend`).selectAll("g.legend-item").size();
				expect(numberOfLegendItems).toEqual(numberOfDatasets);

				done();
			};

			// Add event listener for when chart render is finished
			chartEventsService.addEventListener("render-finished", renderCb);
		});
	});

	afterEach(function() {
		this.testEnvironment.destroy();
	});
});
