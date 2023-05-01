import { Component } from '@angular/core'
import { UserModule, WikisModule } from '@carbon/icons-angular'
import { CardNodeModule, EdgeModule, MarkerModule, ShapeNodeModule } from '../../../'

@Component({
	selector: 'diagram-example1',
	standalone: true,
	templateUrl: './diagram-example1.component.html',
	styles: [
		`
			@import '@carbon/charts/demo/styles.css';
		`
	],
	imports: [CardNodeModule, EdgeModule, MarkerModule, ShapeNodeModule, UserModule, WikisModule]
})
export class DiagramExample1 {
	source = { x: 0, y: 48 }
	target = { x: 396, y: 48 }
	markerEnd = 'marker'
	nodeHeight = 64
	nodeWidth = 200
	circleSize = 64
}
