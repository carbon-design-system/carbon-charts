import { getComponentContainer, TestEnvironment } from "../../tests/index";

import { Legend } from "../index";

import { select, selectAll } from "d3-selection";

describe("legend component", () => {
	beforeEach(function() {
		const testEnvironment = new TestEnvironment();
		testEnvironment.render();

		this._chart = testEnvironment.getChartReference();
		this._testEnvironment = testEnvironment;
	});

	describe("content", () => {
		it("should have same amount of datasets", function(done) {
			const data = this._testEnvironment.chartData;
			const numberOfDatasets = data.datasets.length;

			const chartEventsFragment = this._chart.services.events.getDocumentFragment();

			const renderCb = () => {
				const componentContainer = select(getComponentContainer(Legend));

				// Remove render event listener
				chartEventsFragment.removeEventListener("render-finished", renderCb);

				expect(componentContainer.selectAll("g.legend-item").size()).toEqual(numberOfDatasets);

				done();
			};

			// Add event listener for when chart render is finished
			chartEventsFragment.addEventListener("render-finished", renderCb);

			this._chart.update();
		});
	});

	afterEach(function() {
		this._testEnvironment.destroy();
	});
});
