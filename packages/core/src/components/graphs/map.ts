import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";

// D3 Imports
import { geoPath, geoMercator } from "d3-geo";
import { json } from "d3-fetch";
import { feature } from "topojson";

export class Map extends Component {
  type = "map";

  render(animate = true) {
    const svg = this.getContainerSVG();    
    var path = geoPath().projection(geoMercator());

    // TODO
    json("https://unpkg.com/world-atlas@1/world/110m.json")
      .then(data => {
        const countries = feature(data, data.objects.countries);
        svg.selectAll('path').data(countries.features)
          .enter().append('path')
          .attr('class', 'country')
          .attr('d', path);
    });
  }
}
