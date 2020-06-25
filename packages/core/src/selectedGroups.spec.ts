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

	describe("selected legend labels", () => {
		it("should match the selected groups provided in options", function (done) {
			const chartEventsService = this.chart.services.events;
			const sampleSelectedGroups = ["Dataset 1"];

			const renderCb = () => {
				// Remove render event listener
				chartEventsService.removeEventListener(
					Events.Chart.RENDER_FINISHED,
					renderCb
				);

				const selectedLegendLabels = select(
					`g.${settings.prefix}--${options.chart.style.prefix}--legend`
				)
					.selectAll("g.legend-item.active > text")
					.nodes()
					.map((item) => item["innerHTML"]);

				expect(selectedLegendLabels).toEqual(sampleSelectedGroups);

				done();
			};

			// Add event listener for when chart render is finished
			chartEventsService.addEventListener(
				Events.Chart.RENDER_FINISHED,
				renderCb
			);
		});
	});

	describe("selected groups", () => {
		it("should match the legend labels after click unchosen label", function (done) {
			const chartEventsService = this.chart.services.events;
			const dataGroups = this.chart.model.getDataGroups();
			const sampleSelectedGroups = ["Dataset 1", "Dataset 2"];
			const clickedLabel = "Dataset 2";

			const updateChart = () => {
				// Remove render event listener
				chartEventsService.removeEventListener(
					Events.Chart.RENDER_FINISHED,
					updateChart
				);

				this.chart.model.toggleDataLabel(clickedLabel);
				chartEventsService.removeEventListener(Events.Legend.ITEMS_UPDATE, {
					dataGroups
				});

				const renderCb = () => {
					// Remove render event listener
					chartEventsService.removeEventListener(
						Events.Chart.RENDER_FINISHED,
						renderCb
					);

					const selectedLegendLabels = [];
					dataGroups.forEach(dataGroup => {
						if (dataGroup.status){
							selectedLegendLabels.push(dataGroup.name);
						}
					});

					expect(sampleSelectedGroups).toEqual(selectedLegendLabels);

					done();
				};

				// Add event listener for when chart render is finished
				chartEventsService.addEventListener(
					Events.Chart.RENDER_FINISHED,
					renderCb
				);
			}

			// Remove render event listener
			chartEventsService.addEventListener(
				Events.Chart.RENDER_FINISHED,
				updateChart
			);
		});
	});

	describe("selected groups", () => {
		it("should match the legend labels after click chosen label", function (done) {
			const chartEventsService = this.chart.services.events;
			const dataGroups = this.chart.model.getDataGroups();
			const sampleSelectedGroups = [];
			const clickedLabel = "Dataset 1";

			const updateChart = () => {
				// Remove render event listener
				chartEventsService.removeEventListener(
					Events.Chart.RENDER_FINISHED,
					updateChart
				);

				this.chart.model.toggleDataLabel(clickedLabel);
				chartEventsService.removeEventListener(Events.Legend.ITEMS_UPDATE, {
					dataGroups
				});

				const renderCb = () => {
					// Remove render event listener
					chartEventsService.removeEventListener(
						Events.Chart.RENDER_FINISHED,
						renderCb
					);

					const selectedLegendLabels = [];
					const hasDeactiveLabel = dataGroups.some(group => !group.status);
					
					if (hasDeactiveLabel) {
						dataGroups.forEach(group => {
							if (group.status){
								selectedLegendLabels.push(group.name);
							};
						});
					};

					expect(sampleSelectedGroups).toEqual(selectedLegendLabels);

					done();
				};

				// Add event listener for when chart render is finished
				chartEventsService.addEventListener(
					Events.Chart.RENDER_FINISHED,
					renderCb
				);
			}

			// Remove render event listener
			chartEventsService.addEventListener(
				Events.Chart.RENDER_FINISHED,
				updateChart
			);
		});
    });

	afterEach(function () {
		this.testEnvironment.destroy();
	});
});
