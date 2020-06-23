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
			const selectedGroups = this.chart.model.getOptions().data.selectedGroups;
			const chartEventsService = this.chart.services.events;

			const renderCb = () => {
				// Remove render event listener
				chartEventsService.removeEventListener(
					Events.Chart.RENDER_FINISHED,
					renderCb
				);

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

				expect(selectedGroups).toEqual(preselectedLegendLabels);

				done();
			};

			// Add event listener for when chart render is finished
			chartEventsService.addEventListener(
				Events.Chart.RENDER_FINISHED,
				renderCb
			);
		})
	})

	describe("selected groups", () => {
		it("should match the legend labels after click event", function (done) {
			const chartEventsService = this.chart.services.events;
			const dataGroups = this.chart.model.getDataGroups();
			const firstDatasetName = dataGroups[0].name;

			const isOnlySelectedItem = dataGroups[0].status && 
				dataGroups.filter(group => group.status).length === 1;

			this.chart.model.toggleDataLabel(firstDatasetName);
			chartEventsService.removeEventListener(Events.Legend.ITEMS_UPDATE, {
				dataGroups
			});

			const renderCb = () => {
				// Remove render event listener
				chartEventsService.removeEventListener(
					Events.Chart.RENDER_FINISHED,
					renderCb
				);
				const selectedGroups = this.chart.model.getOptions().data.selectedGroups;

				const selectedLegendLabels = [];

				if (!isOnlySelectedItem) {
					dataGroups.forEach(dataGroup => {
						if (dataGroup.status){
							selectedLegendLabels.push(dataGroup.name);
						}
					});
				}
				expect(selectedGroups).toEqual(selectedLegendLabels);

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
