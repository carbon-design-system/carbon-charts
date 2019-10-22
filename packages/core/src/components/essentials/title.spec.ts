import { TestEnvironment } from "../../tests/index";

import { select } from "d3-selection";

describe("title component", () => {
	beforeEach(function() {
		const testEnvironment = new TestEnvironment();
		testEnvironment.render();

		this._chart = testEnvironment.getChartReference();
		this._testEnvironment = testEnvironment;
	});

	describe("content", () => {
		it("should match text provided in options", function(done) {
			const sampleTitle = "My chart";

			const chartEventsFragment = this._chart.services.events.getDocumentFragment();
			const renderCb = () => {
				const title = select("g.bx--cc--title");

				// Remove event listener for when chart render is finished
				chartEventsFragment.removeEventListener("render-finished", renderCb);

				expect(title.select("text").html()).toEqual(sampleTitle);

				done();
			};

			// Add event listener for when chart render is finished
			chartEventsFragment.addEventListener("render-finished", renderCb);
		});
	});
});
