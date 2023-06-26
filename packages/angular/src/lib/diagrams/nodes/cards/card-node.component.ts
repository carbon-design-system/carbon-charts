import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { carbonPrefix } from '../../config'

@Component({
	selector: 'ibm-diagram-card-node',
	template: `
		<ng-container [ngSwitch]="component">
			<xhtml:div
				*ngSwitchCase="'div'"
				[ngClass]="[
					namespace,
					stacked ? namespace + '--stacked' : '',
					namespace + '--' + component
				]"
				[ngStyle]="{
					'border-color': color,
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
					namespace + '--' + component
				]"
				[ngStyle]="{
					'border-color': color,
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
					namespace + '--' + component
				]"
				[attr.href]="href"
				[ngStyle]="{ 'border-color': color, position: position }"
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
			<ng-content></ng-content>
		</ng-template>
	`
})
export class CardNodeComponent implements OnInit {
	@Input() as = 'div'
	@Input() href = ''
	@Input() color = ''
	@Input() stacked = false
	@Input() position = 'static'

	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()
	@Output() mouseEnter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()
	@Output() mouseOver: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()
	@Output() mouseOut: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()
	@Output() mouseLeave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()
	@Output() mouseMove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

	namespace = `${carbonPrefix}--cc--card-node`

	component = 'div'

	ngOnInit() {
		if (this.href) {
			this.component = 'a'
		} else {
			this.component = this.as
		}
	}
}
