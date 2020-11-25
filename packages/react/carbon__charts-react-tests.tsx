import * as React from "react";
import { ScaleTypes } from "@carbon/charts/interfaces";
import { LineChart } from "./dist";

class App extends React.Component {
  ref: React.RefObject<LineChart> = React.createRef();

  state = {
    data: {
      labels: [''],
      datasets: []
    }
  }

  componentDidMount() {
    this.setState({ data: [] });
  }

  render() {
    if (this.ref != null) {
      console.log(this.ref.current.data);
    }

    return (
      <LineChart
        ref={this.ref}
        data={this.state.data}
        options={{
          title: "Line (discrete)",
          axes: {
            bottom: {
              title: "2019 Annual Sales Figures",
              mapsTo: "key",
              scaleType: ScaleTypes.LABELS,
            },
            left: {
              mapsTo: "value",
              title: "Conversion rate",
              scaleType: ScaleTypes.LABELS,
            },
          },
          color: {
            scale: {
              "Dataset 1": "#925699",
              "Dataset 2": "#525669",
              "Dataset 3": "#725699",
              "Dataset 4": "#ccc",
            },
          },
          height: "400px",
        }}
      />
    );
  }
}
