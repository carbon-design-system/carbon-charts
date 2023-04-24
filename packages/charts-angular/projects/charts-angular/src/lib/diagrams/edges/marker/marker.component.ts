import { Component, Input, OnInit } from '@angular/core'
import { arrowLeft, arrowRight, circle, diamond, square, tee } from '@carbon/charts'
import { carbonPrefix } from '../../config'
import { NgClass, NgStyle } from '@angular/common';

const template = `
<svg:marker
	[ngClass]="namespace"
	[attr.markerHeight]="height"
	[attr.markerWidth]="width"
	[attr.orient]="orient"
	[attr.id]="id"
	[attr.refX]="refX"
	[attr.refY]="refY"
	markerUnits="userSpaceOnUse">
	<svg:path [attr.d]="d" [ngStyle]="{'fill': color}" ></svg:path>
</svg:marker>
`

@Component({
    selector: '[ibm-graph-marker]',
    template,
    standalone: true,
    imports: [NgClass, NgStyle]
})
export class Marker {
	@Input() d = ''
	@Input() color = ''
	@Input() id = ''
	@Input() orient: string | number = 'auto'
	@Input() height: string | number = ''
	@Input() width: string | number = ''
	@Input() refX: string | number = ''
	@Input() refY: string | number = ''
	@Input() position: 'start' | 'end' = 'end'

	namespace = `${carbonPrefix}--cc--marker`

	setAttributes = ({
		d,
		id,
		height,
		width
	}: {
		d: string
		id: string
		height: number
		width: number
	}) => {
		const xPos = this.position === 'end' ? width / 2 + 0.5 : 0.5
		const yPos = height / 2

		this.d = this.d || d
		this.id = this.id || id
		this.height = this.height || height
		this.width = this.width || width
		this.refX = this.refX || xPos
		this.refY = this.refY || yPos
	}
}

@Component({
    selector: '[ibm-graph-marker-arrow-left]', template,
    standalone: true,
    imports: [NgClass, NgStyle]
})
export class MarkerArrowLeft extends Marker implements OnInit {
	ngOnInit() {
		this.setAttributes({ ...arrowLeft })
	}
}
@Component({
    selector: '[ibm-graph-marker-arrow-right]', template,
    standalone: true,
    imports: [NgClass, NgStyle]
})
export class MarkerArrowRight extends Marker implements OnInit {
	ngOnInit() {
		this.setAttributes({ ...arrowRight })
	}
}
@Component({
    selector: '[ibm-graph-marker-circle]', template,
    standalone: true,
    imports: [NgClass, NgStyle]
})
export class MarkerShapeNode extends Marker implements OnInit {
	ngOnInit() {
		this.setAttributes({ ...circle })
	}
}
@Component({
    selector: '[ibm-graph-marker-diamond]', template,
    standalone: true,
    imports: [NgClass, NgStyle]
})
export class MarkerDiamond extends Marker implements OnInit {
	ngOnInit() {
		this.setAttributes({ ...diamond })
	}
}
@Component({
    selector: '[ibm-graph-marker-square]', template,
    standalone: true,
    imports: [NgClass, NgStyle]
})
export class MarkerSquare extends Marker implements OnInit {
	ngOnInit() {
		this.setAttributes({ ...square })
	}
}
@Component({
    selector: '[ibm-graph-marker-tee]', template,
    standalone: true,
    imports: [NgClass, NgStyle]
})
export class MarkerTee extends Marker implements OnInit {
	ngOnInit() {
		this.setAttributes({ ...tee })
	}
}
