import { donutData, donutData2, donutOptions } from "@carbon/charts/demo/data";
import { AxisChartOptions } from "@carbon/charts/interfaces";
import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { merge } from "lodash";
import { LegendChartComponent } from "../src/legend-chart.component";
import { ChartsModule } from "../src/charts.module";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs";

@Component({
    selector: "app-legend-story",
    template: `
	<div class="container theme--white">
	<h3>
		<b>Component:</b>
		<span class="bx--tag bx--tag--green component-name">External Legend</span>
	</h3>
	<p class="props"><b>Props:</b> data, <a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></p>

	<div class="marginTop-30">
		<ibm-legend-chart
			class="n-chart"
			[data]="legendData"
			[options]="legendOptions"
		#legendChart></ibm-legend-chart>
		<ibm-donut-chart
			*ngIf="options" class="n-chart"
			[data]="data"
			[options]="options"
			#scatterChart>
		</ibm-donut-chart>
		<ibm-donut-chart
			*ngIf="options2" class="n-chart"
			[data]="data2"
			[options]="options2"
			#scatterChart2>
		</ibm-donut-chart>
	</div>


	<h3 class="marginTop-30">Code sample</h3>

	<div class="marginTop-30" *ngFor="let codeFile of codeFiles;">
		<h5></h5>

		<div class="bx--snippet bx--snippet--multi bx--snippet--expand marginTop-15" data-code-snippet>
		</div>
	</div>
</div>
	`
})
class LegendStory implements AfterViewInit {

    data = donutData;

    data2 = donutData2;

    legendData = donutData.concat(donutData2);

    options;
    options2;

    legendOptions: AxisChartOptions = {
        axes: {},
        height: "50px",
    };

    @ViewChild("legendChart") legendRef: LegendChartComponent;

    constructor() { }

    ngAfterViewInit() {
        const legendExternal = {
            legend: {
                external: {
                    reference: this.legendRef.chart,
                },
            },
        };

        this.options = merge(donutOptions, legendExternal);
        this.options2 = merge(donutOptions, legendExternal);
    }
}

storiesOf("External Legend", module)
    .addDecorator(
        moduleMetadata({
            declarations: [LegendStory],
            imports: [ChartsModule]
        })
    )
    .addDecorator(withKnobs)
    .add("Multiple charts with same legend", () => ({
        template: `
		<app-legend-story></app-legend-story>
		`,
        props: {
            // codeFiles: Object.keys(demo.code.angular),
            // code: demo.code.angular
        }
    }));
