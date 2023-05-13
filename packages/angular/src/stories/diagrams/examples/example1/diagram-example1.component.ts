import { Component, Input } from '@angular/core'

@Component({
	selector: 'ibm-diagram-example1',
	templateUrl: './diagram-example1.component.html',
	styleUrls: ['./diagram-example1.component.scss']
})
export class DiagramExample1Component {
	@Input() source = { x: 0, y: 48 }
	@Input() target = { x: 396, y: 48 }
	@Input() markerEnd = 'marker'
	@Input() nodeHeight = 64
	@Input() nodeWidth = 200
	@Input() circleSize = 64
}
