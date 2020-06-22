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

	describe("set default selectedGroups", () => {
		it("should match the array length in options", function (done) {
			const selectedGroups = this.chart.model.getOptions().data.selectedGroups;
			const chartEventsService = this.chart.services.events;

			const renderCb = () => {
				const legendGroup = select(
					`g.${settings.prefix}--${options.chart.style.prefix}--legend`
				);

				const numberOfTotalItems = legendGroup
					.selectAll('g.legend-item')
					.size();

				const numberOfActiveItems = legendGroup
					.selectAll('g.legend-item.active')
					.size();
				
				const activeLegendNodes = legendGroup
					.selectAll('g.legend-item.active > text')
					.nodes();

				const selectedLegendLabels = activeLegendNodes.map(item => item['innerHTML']);

				const preselectedLegendLabels =
					numberOfTotalItems === numberOfActiveItems
					? []
					: selectedLegendLabels;

				expect(preselectedLegendLabels).toEqual(selectedGroups);

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
