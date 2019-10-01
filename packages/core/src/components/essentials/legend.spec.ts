import { TestEnvironment } from "../../tests/index";

import { select } from "d3-selection";

describe("legend component", () => {
	beforeEach(function() {
		const testEnvironment = new TestEnvironment();
		testEnvironment.render();

		this._chart = testEnvironment.getChartReference();
		this._testEnvironment = testEnvironment;
	});

	describe("content", () => {
		it("should have same amount of datasets", async function(done) {
			const data = this._testEnvironment.chartData;
			const numberOfDatasets = data.datasets.length;

			const chartEventsFragment = this._chart.services.events.getDocumentFragment();

			const renderCb = () => {
				// Remove render event listener
				chartEventsFragment.removeEventListener("render-finished", renderCb);
				
				const numberOfLegendItems = select("g.cc-legend").selectAll("g.legend-item").size();
				expect(numberOfLegendItems).toEqual(numberOfDatasets);

				done();
			};

			// Add event listener for when chart render is finished
			chartEventsFragment.addEventListener("render-finished", renderCb);
		});
	});
});
