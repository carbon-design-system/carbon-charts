import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";

// D3 Imports
import { geoPath, geoCentroid } from "d3-geo";
import { geoRobinson } from "d3-geo-projection";
import { json, tsv, csv } from "d3-fetch";
import { event, select } from "d3-selection";
import { zoom } from "d3-zoom";
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";
import { feature } from "topojson";
import { TooltipTypes } from '../../interfaces';

export class Map extends Component {
  type = "map";

  async render(animate = true) {
    const features = await this.getGraphData();
    const featuresWithData = await this.getDisplayData(features);
    this.drawMapChart(features, featuresWithData);
  }

  drawMapChart(features, featuresWithData) {
    const svg = this.getContainerSVG();    
    const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
    const projection = geoRobinson();
    const path = geoPath().projection(projection);

    // create resizable map container
    const mapFrame = DOMUtils.appendOrSelect(svg, "svg.map-frame");
    const mapContainer = DOMUtils.appendOrSelect(mapFrame, "svg.map-container");

    mapFrame.merge(mapContainer)
      .attr("width", width)
      .attr("height", height);

    mapContainer.attr("width", "100%")
      .attr("height", "100%")

    // draw map path
    const mapPath = mapContainer.selectAll("path").data(features)
      .enter().append("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("opacity", 0.3);

    // calculate circle radius
    const radiusScale = scaleSqrt();
    const radiusValue = d => +d.properties[featuresWithData.labels[1]];

    radiusScale.domain([10, max(features, radiusValue)])
      .range([0, 30])
    
    // calculate center in pixel
    featuresWithData.forEach(d => {
      d.properties.projected = projection(geoCentroid(d));
      d.value = d.properties.name;
    })

    // create circles for data
    const circles = mapContainer.selectAll("circle")
      .data(featuresWithData)
      .enter().append("circle")
      .attr("class", "country-circle");
    
    // set circle center with latitude and longitude
    circles.attr("cx", d => d.properties.projected[0])
      .attr("cy", d => d.properties.projected[1])
      .attr("r", d => radiusScale(radiusValue(d)) > 0 ? radiusScale(radiusValue(d)) : 0);
    
    const scaleX = 0.77;
    const scaleY = 0.8;
    mapPath.attr("transform", `scale(${ scaleX }, ${ scaleY })`);
    circles.attr("transform", `scale(${ scaleX }, ${ scaleY })`);

    // TODO: responsive zoom
    mapContainer.call(zoom().on("zoom", () => {
      mapPath.attr("transform", event.transform);
      circles.attr("transform", event.transform);
    }));

    this.addEventListeners();
  }

  getGraphData = async () => {
    const [ tsvData, topoJSONData ] = await Promise.all([
      tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv"),
      json("https://unpkg.com/world-atlas@1.1.4/world/110m.json")
    ]);

    const nameObject = tsvData.reduce((acc, d) => {
      acc[d.iso_n3] = { name: d.name };
      return acc;
    }, {});

    const countries = feature(topoJSONData, topoJSONData.objects.countries);

    // add name
    countries.features.map(d => {
      return Object.assign(d.properties, nameObject[d.id])
    });

    return countries.features;
  }

  // TODO: Refactor
  getDisplayData = async(features) => {
    const demoData = {
      "036": {
        "Dataset 1": 65000,
        "Dataset 3": 2401,
        "Dataset 4": 10232
      },
      "156": {
        "Dataset 1": 32432,
        "Dataset 2": 3049,
        "Dataset 4": 32910
      },
      "356": {
        "Dataset 1": 59943,
        "Dataset 2": 100838,
        "Dataset 3": 42939
      },
      "124": {
        "Dataset 1": 62312,
        "Dataset 2": 62239,
        "Dataset 3": 34920
      },
      "504": {
        "Dataset 2": 23891,
        "Dataset 3": 9883, 
        "Dataset 4": 49210
      },
      "076": {
        "Dataset 1": 123003,
        "Dataset 2": 29123,
        "Dataset 3": 2401,
        "Dataset 4": 10232
      },
      "222": {
        "Dataset 1": 162930,
        "Dataset 3": 19323
      },
      "800": {
        "Dataset 1": 229300,
        "Dataset 4": 2938
      }
    }

    features.forEach(d => 
      Object.assign(d.properties, demoData[d.id])
    );
    
    const labels = this.model.getDisplayData().datasets.map(d => d.label);

    const featuresWithData = features
      .filter(d => d.properties[labels[0]] || d.properties[labels[1]] || d.properties[labels[2]] || d.properties[labels[3]]);
    featuresWithData.labels = labels;
    
    return featuresWithData;
  }

  addEventListeners() {
    const self = this; 
    this.parent.selectAll("path.country")
      .on("click", function(datum) {
        const clickedElement = select(this);
        clickedElement.classed("clicked", true);

        clickedElement.transition(self.services.transitions.getTransition("graph-element-click-opacity-upgrade"))
          .attr("opacity", 1);
      })

    this.parent.selectAll("circle.country-circle")
      .on("mousemove", function(datum) {
        const hoveredElement = select(this);
        hoveredElement.classed("hovered", true);

        // Show tooltip
        self.services.events.dispatchEvent("show-tooltip", {
          hoveredElement, 
          type: TooltipTypes.DATAPOINT
        });
      })
      .on("mouseout", function(datum) {
        const hoveredElement = select(this);
        hoveredElement.classed("hovered", false);

        // Hide tooltip
				self.services.events.dispatchEvent("hide-tooltip", { hoveredElement });
      })
    
  }
}
