import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";

// D3 Imports
import { geoPath, geoEquirectangular, geoCentroid } from "d3-geo";
import { json, tsv, csv } from "d3-fetch";
import { event } from "d3-selection";
import { zoom } from "d3-zoom";
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";
import { feature } from "topojson";

export class Map extends Component {
  type = "map";

  render(animate = true) {
    this.loadData().then(countries => {
      this.drawMapChart(countries);
    });
  }

  drawMapChart(countries) {
    const svg = this.getContainerSVG();    
    const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
    const projection = geoEquirectangular();
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
    const mapPath = mapContainer.selectAll("path").data(countries.features)
      .enter().append("path")
      .attr("class", "country")
      .attr("d", path);

    // calculate circle radius
    const radiusScale = scaleSqrt();
    const radiusValue = d => +d.properties["2020"];

    radiusScale.domain([10, max(countries.features, radiusValue)])
      .range([0, 20])
    
    // calculate center in pixel
    countries.featuresWithData.forEach(d => 
      d.properties.projected = projection(geoCentroid(d))
    )

    // create circles for data
    const circles = mapContainer.selectAll("circle")
      .data(countries.featuresWithData)
      .enter().append("circle")
      .attr("class", "country-circle");
    
    // set circle center with latitude and longitude
    circles.attr("cx", d => d.properties.projected[0])
      .attr("cy", d => d.properties.projected[1])
      .attr("r", d => radiusScale(radiusValue(d)) > 0 ? radiusScale(radiusValue(d)) : 0);
    
    // TODO: tooltip
    mapPath.append("title")
      .text(d => d.properties.name);

    // resize shapes to fit map frame
    mapPath.attr("transform", `scale(0.77, 0.7)`);
    circles.attr("transform", `scale(0.77, 0.7)`);

    // TODO: responsive zoom
    mapContainer.call(zoom().on("zoom", () => {
      mapPath.attr("transform", event.transform);
      circles.attr("transform", event.transform);
    }));
  }

  // TODO: Refactor with demo data
  loadData = () => 
    Promise.all([
      tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv"),
      csv("https://gist.githubusercontent.com/curran/e7ed69ac1528ff32cc53b70fdce16b76/raw/61f3c156efd532ae6ed84b38102cf9a0b3b1d094/data.csv"),
      json("https://unpkg.com/world-atlas@1.1.4/world/110m.json")
    ]).then(([ tsvData, popData, topoJSONData ]) => {
      const rowById = tsvData.reduce((acc, d) => {
        acc[d.iso_n3] = d;
        return acc;
      }, {});

      const rowByCode = popData.reduce((acc, d) => {
        acc[d["Country code"]] = d;
        return acc;
      }, {});

      const countries = feature(topoJSONData, topoJSONData.objects.countries);

      // add population data
      countries.features.forEach(d => {
        Object.assign(d.properties, rowByCode[+d.id]);
      });

      // add name
      countries.features.map(d => 
        Object.assign(d.properties, rowById[d.id]));

      const featuresWithData = countries.features
        .filter(d => d.properties["2020"])
        .map(d => {
          d.properties["2020"] = +d.properties["2020"].replace(/ /g, ""); 
          return d;
        });
      
      return {
        features: countries.features,
        featuresWithData
      };
    });
}
