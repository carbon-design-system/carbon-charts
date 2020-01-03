import { TestEnvironment } from "../../tests/index";

import * as Configuration from "../../configuration";

import { select, selectAll } from "d3-selection";
import { scaleLinear } from "d3";

describe("Axis component", () => {
	beforeEach(function() {
		const testEnvironment = new TestEnvironment();
		testEnvironment.render();

		this.chart = testEnvironment.getChartReference();
		this.testEnvironment = testEnvironment;
    });
    
    describe(("content"), () => {
        it("should set the correct axis values", async function(done) {
            const data = this.testEnvironment.chartData;
            const chartEventsService = this.chart.services.events;

            const renderCb = () => {
                // Remove render event listener
                chartEventsService.removeEventListener("render-finished", renderCb);

                let datasetDomain = [];
                
                data.datasets.forEach(dataset => datasetDomain = datasetDomain.concat(dataset.data));

                datasetDomain.sort();

                const datasetDomainMin = datasetDomain.reduce((min, cur) => Math.min(min, cur));
                const datasetDomainMax = datasetDomain.reduce((max, cur) => Math.max(max, cur));

                let axisTickValues = scaleLinear().domain(datasetDomain).range([datasetDomainMin, datasetDomainMax]).ticks(Configuration.axis.ticks.number);

                const leftAxisContent = select("g.left").select("g.ticks").selectAll("g.tick").select("text");

                leftAxisContent.each(function(d, i) {
                    expect(parseInt(select(this).text().replace(/,/g, '')) === axisTickValues[i]).toBe(true); 
                });

                done();
            }
            // Add event listener for when chart render is finished
			chartEventsService.addEventListener("render-finished", renderCb);
        });

        it("should set the correct axis title", async function(done) {
            const options = this.testEnvironment.chartOptions;
            const chartEventsService = this.chart.services.events;

            const renderCb = () => {
                // Remove render event listener
                chartEventsService.removeEventListener("render-finished", renderCb);

                const bottomAxisTitle = select("g.bottom").select("text.axis-title").text();

                expect(bottomAxisTitle).toBe(options.axes.bottom.title);

                done();
            }
            // Add event listener for when chart render is finished
			chartEventsService.addEventListener("render-finished", renderCb);
        });
    });
});
