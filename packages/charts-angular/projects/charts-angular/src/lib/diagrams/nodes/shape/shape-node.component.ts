import { Component, Input, Output, EventEmitter, TemplateRef, OnInit } from '@angular/core'

import { carbonPrefix } from '../../config'

@Component({
	selector: 'ibm-diagram-shape-node',
	template: `
		<ng-container [ngSwitch]="component">
			<xhtml:div
				*ngSwitchCase="'div'"
				[ngClass]="[
					namespace,
					stacked ? namespace + '--stacked' : '',
					shape ? namespace + '--' + shape : '',
					namespace + '--' + component
				]"
				[ngStyle]="{
					'height.px': size,
					'width.px': size,
					position: position
				}"
				(mouseenter)="mouseEnter.emit($event)"
				(mouseover)="mouseOver.emit($event)"
				(mouseout)="mouseOut.emit($event)"
				(mouseleave)="mouseLeave.emit($event)"
				(mousemove)="mouseMove.emit($event)"
				tabindex="0">
				<ng-container *ngTemplateOutlet="nodeTemplate"></ng-container>
			</xhtml:div>

			<xhtml:button
				*ngSwitchCase="'button'"
				[ngClass]="[
					namespace,
					stacked ? namespace + '--stacked' : '',
					shape ? namespace + '--' + shape : '',
					namespace + '--' + component
				]"
				[ngStyle]="{
					'height.px': size,
					'width.px': size,
					position: position
				}"
				(click)="click.emit($event)"
				(mouseenter)="mouseEnter.emit($event)"
				(mouseover)="mouseOver.emit($event)"
				(mouseout)="mouseOut.emit($event)"
				(mouseleave)="mouseLeave.emit($event)"
				(mousemove)="mouseMove.emit($event)"
				tabindex="0">
				<ng-container *ngTemplateOutlet="nodeTemplate"></ng-container>
			</xhtml:button>

			<xhtml:a
				*ngSwitchCase="'a'"
				[ngClass]="[
					namespace,
					stacked ? namespace + '--stacked' : '',
					shape ? namespace + '--' + shape : '',
					namespace + '--' + component
				]"
				[attr.href]="href"
				[ngStyle]="{
					'height.px': size,
					'width.px': size,
					position: position
				}"
				(mouseenter)="mouseEnter.emit($event)"
				(mouseover)="mouseOver.emit($event)"
				(mouseout)="mouseOut.emit($event)"
				(mouseleave)="mouseLeave.emit($event)"
				(mousemove)="mouseMove.emit($event)"
				tabindex="0">
				<ng-container *ngTemplateOutlet="nodeTemplate"></ng-container>
			</xhtml:a>
		</ng-container>

		<ng-template #nodeTemplate>
			<div *ngIf="renderIcon" attr.class="{{ namespace + '__icon' }}">
				<ng-container *ngTemplateOutlet="renderIcon"></ng-container>
			</div>
			<div attr.class="{{ namespace + '__body' }}" [ngStyle]="{ position: bodyPosition }">
				<div attr.class="{{ namespace + '__title' }}">{{ title }}</div>
				<div attr.class="{{ namespace + '__subtitle' }}">
					{{ subtitle }}
				</div>
			</div>
		</ng-template>
	`
})
export class ShapeNodeComponent implements OnInit {
	@Input() as = 'div'
	@Input() href = ''
	@Input() renderIcon?: TemplateRef<any>
	@Input() size = 48
	@Input() stacked = false
	@Input() shape: 'circle' | 'square' | 'rounded-square' = 'circle'
	@Input() subtitle = ''
	@Input() title = ''
	@Input() position: string = 'fixed'
	@Input() bodyPosition: string = 'absolute'

	@Output() click: EventEmitter<any> = new EventEmitter<any>()
	@Output() mouseEnter: EventEmitter<any> = new EventEmitter<any>()
	@Output() mouseOver: EventEmitter<any> = new EventEmitter<any>()
	@Output() mouseOut: EventEmitter<any> = new EventEmitter<any>()
	@Output() mouseLeave: EventEmitter<any> = new EventEmitter<any>()
	@Output() mouseMove: EventEmitter<any> = new EventEmitter<any>()

	namespace = `${carbonPrefix}--cc--shape-node`
	component = 'div'

	ngOnInit() {
		if (this.href) {
			this.component = 'a'
		} else {
			this.component = this.as
		}
	}
}
