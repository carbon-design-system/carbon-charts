import { Component, Input, Output, EventEmitter, TemplateRef, OnInit } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";

const { prefix } = settings;

@Component({
	selector: "ibm-diagram-shape-node",
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
			[ngStyle]="{'height.px': size, 'width.px': size}"
			(mouseenter)="onMouseEnter.emit($event)"
			(mouseover)="onMouseOver.emit($event)"
			(mouseout)="onMouseOut.emit($event)"
			(mouseleave)="onMouseLeave.emit($event)"
			(mousemove)="onMouseMove.emit($event)"
			tabindex="0"
		>
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
			[ngStyle]="{'height.px': size, 'width.px': size}"
			(click)="onClick.emit($event)"
			(mouseenter)="onMouseEnter.emit($event)"
			(mouseover)="onMouseOver.emit($event)"
			(mouseout)="onMouseOut.emit($event)"
			(mouseleave)="onMouseLeave.emit($event)"
			(mousemove)="onMouseMove.emit($event)"
			tabindex="0"
		>
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
			[ngStyle]="{'height.px': size, 'width.px': size}"
			(mouseenter)="onMouseEnter.emit($event)"
			(mouseover)="onMouseOver.emit($event)"
			(mouseout)="onMouseOut.emit($event)"
			(mouseleave)="onMouseLeave.emit($event)"
			(mousemove)="onMouseMove.emit($event)"
			tabindex="0"
		>
			<ng-container *ngTemplateOutlet="nodeTemplate"></ng-container>
		</xhtml:a>
	</ng-container>

	<ng-template #nodeTemplate>
		<div *ngIf="renderIcon" attr.class="{{ namespace + '__icon' }}" >
			<ng-container *ngTemplateOutlet="renderIcon"></ng-container>
		</div>
		<div attr.class="{{ namespace + '__body' }}">
            <div attr.class="{{ namespace + '__title' }}">{{title}}</div>
            <div attr.class="{{ namespace + '__subtitle' }}">{{subtitle}}</div>
        </div>
	</ng-template>
	`
})

export class ShapeNodeComponent implements OnInit {
	@Input() as: String = "div";
	@Input() href: String = null;
	@Input() renderIcon: TemplateRef<any>;
	@Input() size: Number = 48;
	@Input() stacked: Boolean;
	@Input() shape: "circle" | "square" | "rounded-square" = "circle";
	@Input() subtitle: String;
	@Input() title: String;

	@Output() onClick = new EventEmitter<any>();
	@Output() onMouseEnter = new EventEmitter<any>();
	@Output() onMouseOver = new EventEmitter<any>();
	@Output() onMouseOut = new EventEmitter<any>();
	@Output() onMouseLeave = new EventEmitter<any>();
	@Output() onMouseMove = new EventEmitter<any>();

	namespace = `${prefix}--cc--shape-node`;
	component = "div";

	ngOnInit() {
		if (this.href) {
			this.component = "a";
		} else if (this.onClick) {
			this.component = "button";
		}
	}

}
