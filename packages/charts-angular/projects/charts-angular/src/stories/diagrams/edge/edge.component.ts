import { Component, Input } from '@angular/core'
import { Component as CarbonComponent } from '@carbon/charts'

import { carbonPrefix } from '../configs'

interface Coordinates {
	x: number
	y: number
}
@Component({
	selector: '[ibm-graph-edge]',
	template: `
		<svg:g [ngClass]="[namespace, variant ? namespace + '--' + variant : '']">
			<svg:path
				[ngClass]="namespace + '__container'"
				[attr.d]="path ? path : straight(source, target)" />
			<svg:path
				[ngClass]="namespace + '__outer'"
				[attr.d]="path ? path : straight(source, target)" />
			<svg:path
				[ngClass]="namespace + '__inner'"
				[attr.d]="path ? path : straight(source, target)"
				[ngStyle]="{ stroke: color }"
				[attr.marker-start]="markerStart ? 'url(#' + markerStart + ')' : ''"
				[attr.marker-end]="markerEnd ? 'url(#' + markerEnd + ')' : ''" />
		</svg:g>
	`
})
export class EdgeComponent {
	@Input() color = ''
	@Input() markerEnd = ''
	@Input() markerStart = ''
	@Input() source: Coordinates = { x: 0, y: 0 }
	@Input() target: Coordinates = { x: 0, y: 0 }
	@Input() variant?: 'dash-sm' | 'dash-md' | 'dash-lg' | 'dash-xl' | 'double' | 'tunnel'
	@Input() path = ''

	pathClasses = ''
	namespace = `${carbonPrefix}--cc--edge`
	straight = CarbonComponent.buildStraightPathString
}
