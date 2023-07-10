import { arc, arc as d3Arc, pie, scaleLinear, select } from 'd3'
import { clamp, getProperty } from '@/tools'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import {
  Events,
  GaugeTypes,
  ArrowDirections,
  ColorClassNameTypes,
  Alignments,
  RenderTypes
} from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'

export class EXPERIMENTAL_SegmentedGauge extends Component {
  type = 'segmented-gauge'
  renderType = RenderTypes.SVG

  // We need to store our arcs so that addEventListeners() can access them
  arc: any
  pie: any
  backgroundArc: any

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(animate = true) {
    const svg = this.getComponentContainer().attr('width', '100%').attr('height', '100%')

    this.arc = d3Arc().innerRadius(60).outerRadius(80).padAngle(0.02)

    const scale = scaleLinear().domain([50, 80]).range([0, 300])

    // an array of colors
    const colors = ['#00ff00', '#ffa500', '#ff0000']

    // initialize pie chart
    this.pie = pie()
      .startAngle((-1 * Math.PI) / 2)
      .endAngle(Math.PI / 2)
      .value(function () {
        return 30 / colors.length
      })

    // draw the arcs. one for each color
    const arcs = svg
      .selectAll('.arc')
      .data(this.pie(colors))
      .enter()
      .append('path')
      .attr('d', this.arc)
      .attr('transform', 'translate(200,200)')
      .style('fill', function (d, i) {
        return colors[i]
      })

    // set up the needle
    const needle = svg
      .selectAll('.needle')
      .data([0])
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', -78)
      .attr('y1', 0)
      .attr('y2', 0)
      .classed('needle', true)
      .style('stroke', '#fff')
      .attr('transform', function (d) {
        return ' translate(200,200) rotate(' + d + ')'
      })

    svg
      .selectAll('.needle')
      .data([60])
      .raise()
      .transition()
      .duration(750)
      .attr('transform', function (d) {
        console.log(d, scale(d))
        return 'translate(200,200) rotate(' + scale(d) + ')'
      })

    // Add event listeners
    // this.addEventListeners()
  }

  //   addEventListeners() {
  //     const self = this
  //     this.parent
  //       .selectAll('path.arc-foreground')
  //       .on('mouseover', function (event: MouseEvent, datum: any) {
  //         // Dispatch mouse event
  //         self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEOVER, {
  //           event,
  //           element: select(this),
  //           datum
  //         })
  //       })
  //       .on('mousemove', function (event: MouseEvent, datum: any) {
  //         const hoveredElement = select(this)

  //         // Dispatch mouse event
  //         self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEMOVE, {
  //           event,
  //           element: hoveredElement,
  //           datum
  //         })
  //       })
  //       .on('click', function (event: MouseEvent, datum: any) {
  //         // Dispatch mouse event
  //         self.services.events.dispatchEvent(Events.Gauge.ARC_CLICK, {
  //           event,
  //           element: select(this),
  //           datum
  //         })
  //       })
  //       .on('mouseout', function (event: MouseEvent, datum: any) {
  //         const hoveredElement = select(this)

  //         // Dispatch mouse event
  //         self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEOUT, {
  //           event,
  //           element: hoveredElement,
  //           datum
  //         })
  //       })
  //   }

  //   // Helper functions
  //   protected computeRadius() {
  //     const options = this.getOptions()
  //     const arcType = getProperty(options, 'gauge', 'type')

  //     const { width, height } = DOMUtils.getSVGElementSize(this.parent as any, {
  //       useAttrs: true
  //     })
  //     const radius =
  //       arcType === GaugeTypes.SEMI ? Math.min(width / 2, height) : Math.min(width / 2, height / 2)

  //     return radius
  //   }
}
