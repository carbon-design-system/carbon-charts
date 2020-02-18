import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";

// D3 Imports
import { geoPath, geoEquirectangular } from "d3-geo";
import { json, tsv } from "d3-fetch";
import { event } from "d3-selection";
import { zoom } from "d3-zoom";
import { feature } from "topojson";

export class Map extends Component {
  type = "map";

  render(animate = true) {
    this.loadData().then(countries => {
      this.drawMapChart(countries.features);
    });
  }

  drawMapChart(features) {
    const svg = this.getContainerSVG();    
    const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
    const projection = geoEquirectangular();
    const path = geoPath().projection(projection);

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
      .attr("fill", "gray");
    
    // resize the path to fit map frame
    mapPath.attr('transform', `scale(0.8, 0.7)`);

    // zoom in
    mapContainer.call(zoom().on('zoom', () => {
      mapPath.attr('transform', event.transform);
    }))
  }

  // TODO: Refactor
  loadData = () => 
    Promise.all([
      tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv"),
      json("https://unpkg.com/world-atlas@1.1.4/world/110m.json")
    ]).then(([ tsvData, topoJSONData ]) => {
      const rowById = tsvData.reduce((acc, d) => {
        acc[d.iso_n3] = d;
        return acc;
      }, {});

      const countries = feature(topoJSONData, topoJSONData.objects.countries);

      countries.features.forEach(d => {
        Object.assign(d.properties, rowById[d.id]);
      })

      return countries;
    });
}
