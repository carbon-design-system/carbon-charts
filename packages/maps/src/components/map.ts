// Internal Imports
import { Component } from '@carbon/charts/src/components/component';

// D3 Imports
import { select } from 'd3-selection';
import { arc, pie } from 'd3-shape';
import { interpolate } from 'd3-interpolate';

export class Map extends Component {
  type = 'map';
  //   renderType = RenderTypes.SVG;

  init() {
    // const eventsFragment = this.services.events;
    // // Highlight correct circle on legend item hovers
    // eventsFragment.addEventListener(
    //   Events.Legend.ITEM_HOVER,
    //   this.handleLegendOnHover
    // );
    // // Un-highlight circles on legend item mouseouts
    // eventsFragment.addEventListener(
    //   Events.Legend.ITEM_MOUSEOUT,
    //   this.handleLegendMouseOut
    // );
  }

  render(animate = true) {
    // // Add event listeners
    // this.addEventListeners();
  }

  //   // Highlight elements that match the hovered legend item
  //   handleLegendOnHover = (event: CustomEvent) => {
  //     const { hoveredElement } = event.detail;
  //     const { groupMapsTo } = this.getOptions().data;

  //     this.parent
  //       .selectAll('path.slice')
  //       .transition('legend-hover-bar')
  //       .call((t) =>
  //         this.services.transitions.setupTransition({
  //           transition: t,
  //           name: 'legend-hover-bar',
  //         })
  //       )
  //       .attr('opacity', (d) =>
  //         d.data[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1
  //       );
  //   };

  //   // Un-highlight all elements
  //   handleLegendMouseOut = (event: CustomEvent) => {
  //     this.parent
  //       .selectAll('path.slice')
  //       .transition('legend-mouseout-bar')
  //       .call((t) =>
  //         this.services.transitions.setupTransition({
  //           transition: t,
  //           name: 'legend-mouseout-bar',
  //         })
  //       )
  //       .attr('opacity', 1);
  //   };

  //   addEventListeners() {
  //     const self = this;
  //     this.parent
  //       .selectAll('path.slice')
  //       .on('mouseover', function (event, datum) {
  //         const hoveredElement = select(this);

  //         hoveredElement
  //           .classed('hovered', true)
  //           .transition('pie_slice_mouseover')
  //           .call((t) =>
  //             self.services.transitions.setupTransition({
  //               transition: t,
  //               name: 'pie_slice_mouseover',
  //             })
  //           )
  //           .attr('d', self.hoverArc);

  //         // Dispatch mouse event
  //         self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOVER, {
  //           event,
  //           element: select(this),
  //           datum,
  //         });

  //         const { groupMapsTo } = self.getOptions().data;
  //         const { valueMapsTo } = self.getOptions().pie;
  //         // Show tooltip
  //         self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
  //           event,
  //           hoveredElement,
  //           items: [
  //             {
  //               label: datum.data[groupMapsTo],
  //               value: datum.data[valueMapsTo],
  //             },
  //           ],
  //         });
  //       })
  //       .on('mousemove', function (event, datum) {
  //         const hoveredElement = select(this);

  //         // Dispatch mouse event
  //         self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEMOVE, {
  //           event,
  //           element: hoveredElement,
  //           datum,
  //         });

  //         // Show tooltip
  //         self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
  //           event,
  //         });
  //       })
  //       .on('click', function (event, datum) {
  //         // Dispatch mouse event
  //         self.services.events.dispatchEvent(Events.Pie.SLICE_CLICK, {
  //           event,
  //           element: select(this),
  //           datum,
  //         });
  //       })
  //       .on('mouseout', function (event, datum) {
  //         const hoveredElement = select(this);
  //         hoveredElement
  //           .classed('hovered', false)
  //           .transition('pie_slice_mouseout')
  //           .call((t) =>
  //             self.services.transitions.setupTransition({
  //               transition: t,
  //               name: 'pie_slice_mouseout',
  //             })
  //           )
  //           .attr('d', self.arc);

  //         // Dispatch mouse event
  //         self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOUT, {
  //           event,
  //           element: hoveredElement,
  //           datum,
  //         });

  //         // Hide tooltip
  //         self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
  //           hoveredElement,
  //         });
  //       });
  //   }
}
