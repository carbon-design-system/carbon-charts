import { arc as d3Arc, interpolateHsl, line, rgb, scaleLinear } from 'd3'
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
import { segmentedGauge as segmentedGaugeConfigs } from '@/configuration'

export class EXPERIMENTAL_SegmentedGauge extends Component {
  type = 'gauge-segmented'
  renderType = RenderTypes.SVG

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(animate = true) {
    const self = this

    const svg = this.getComponentContainer().attr('width', '100%').attr('height', '100%')

    // Get width & height of main SVG
    const { width, height } = DOMUtils.getSVGElementSize(this.parent as any, {
      useAttrs: true
    })

    if (width === 0 || height === 0) {
      return
    }

    /*
     * Determine radius
     */
    let radius = Math.min(width, height)
    if (width < height) {
      radius = width / 2
    } else if (radius * 2 > Math.max(width, height)) {
      radius = Math.max(width, height) / 2
    }
    // Have a fallback min-radius
    radius = Math.max(radius, 65)

    // Determine slice thickness based on available width
    const sliceThickness = Math.min(
      (width / 400) * segmentedGaugeConfigs.sliceThickness,
      segmentedGaugeConfigs.sliceThickness
    )
    const arc = d3Arc()
      .innerRadius(radius - segmentedGaugeConfigs.sliceMargin - sliceThickness)
      .outerRadius(radius - segmentedGaugeConfigs.sliceMargin)
      .startAngle(function (d: any, i: number) {
        const ratio = d * i
        return self.convertDegreeToRadian(segmentedGaugeConfigs.startAngle + ratio * 180)
      })
      .endAngle(function (d: any, i: number) {
        const ratio = d * (i + 1)
        return self.convertDegreeToRadian(segmentedGaugeConfigs.startAngle + ratio * 180)
      })
      .padAngle(0.02)

    const arcs = DOMUtils.appendOrSelect(svg, 'g.arcs').attr(
      'transform',
      `translate(${radius}, ${radius})`
    )

    // Update data on all bars
    const numberOfTicks = 3;
    const arcPaths = arcs
      .selectAll('path')
      .data(Array(numberOfTicks).fill(1 / numberOfTicks))

    // Remove bars that are no longer needed
    arcPaths.exit().attr('opacity', 0).remove()

    // Add the paths that need to be introduced
    const arcPathsEnter = arcPaths.enter().append('path')

    arcPathsEnter
      .merge(arcPaths as any)
      // .attr('class', () =>
      //   this.model.getColorClassName({
      //     classNameTypes: [ColorClassNameTypes.FILL],
      //     dataGroupName: Math.random()
      //   })
      // )
      // .style('fill', () => getProperty(this.getOptions(), 'color', 'scale', 'value'))
      .attr('fill', function (d: any, i) {
        if (i === 0) {
          return 'var(--cds-support-success, #42be65)'
        } else if (i === 1) {
          return 'var(--cds-support-warning, #f1c21b)'
        } else {
          return 'var(--cds-support-error, #fa4d56)'
        }
      })
      .attr('d', arc)

    const lineData = [
      [segmentedGaugeConfigs.pointerWidth / 2, 0],
      [0, -(radius * 0.95)],
      [-(segmentedGaugeConfigs.pointerWidth / 2), 0],
      [0, segmentedGaugeConfigs.pointerEndDistance],
      [segmentedGaugeConfigs.pointerWidth / 2, 0]
    ]

    // Create the scale
    const startValue = 10
    const endValue = 20
    const scale = scaleLinear().range([0, 1]).domain([startValue, endValue])

    const ticksGroup = DOMUtils.appendOrSelect(svg, 'g.ticks').attr(
      'transform',
      `translate(${radius}, ${radius})`
    )

    const ticks = scale.ticks(numberOfTicks)

    // Update data on all tick labels
    const tickLabels = ticksGroup.selectAll('text.tick').data(ticks)

    // Remove labels that are no longer needed
    tickLabels.exit().remove()

    // Add the paths that need to be introduced
    const tickLabelsEnter = tickLabels.enter().append('text')

    tickLabelsEnter
      .merge(tickLabels as any)
      .classed('tick', true)
      .attr('transform', function (d) {
        const ratio = scale(d)
        const newAngle =
          segmentedGaugeConfigs.startAngle +
          ratio * (segmentedGaugeConfigs.endAngle - segmentedGaugeConfigs.startAngle)
        return 'rotate(' + newAngle + ') translate(0,' + (segmentedGaugeConfigs.ticksDistance - radius) + ')'
      })
      .attr('text-anchor', function (_, i) {
        if (i === ticks.length - 1) {
          return 'end'
        } else if (ticks.length % 2 !== 0 && i + 1 === (ticks.length + 1) / 2) {
          return 'middle'
        }

        return null
      })
      .text((d) => d)

    const pointerLine = line()
    const pointerGroup = DOMUtils.appendOrSelect(svg, 'g.pointer')
      .data([lineData])
      .attr('transform', `translate(${radius}, ${radius})`)

    const ratio = scale(Math.max(startValue, 12))
    const newAngle = segmentedGaugeConfigs.startAngle + ratio * 180

    // Update the pointer
    const pointerInitialRender = pointerGroup.selectAll('path').size() === 0
    const pointerPath = DOMUtils.appendOrSelect(pointerGroup, 'path').attr('d', pointerLine as any)

    // If first render, set initial value to beginning of gauge
    if (pointerInitialRender) {
      pointerPath.attr('transform', 'rotate(-90)')
    }

    // Add transition
    pointerPath
      .transition()
      .call((t: any) =>
        this.services.transitions.setupTransition({
          transition: t,
          name: 'pointer-update',
          animate: pointerInitialRender ? true : animate
        })
      )
      .attr('transform', 'rotate(' + newAngle + ')')
  }

  private convertDegreeToRadian(deg) {
    return (deg * Math.PI) / 180
  }
}
