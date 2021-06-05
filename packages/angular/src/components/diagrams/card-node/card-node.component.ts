import { Component, Input, Output, EventEmitter, TemplateRef } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";

const { prefix } = settings;

@Component({
	selector: "ibm-diagram-card-node",
	template: `
	<xhtml:div [ngClass]="[namespace, stacked ? namespace + '--stacked' : '']" [ngStyle]="{'border-color': color}" tabindex="0" (click)="onClick.emit($event)">
		<div *ngIf="renderIcon" attr.class="{{ namespace + '__icon' }}" >
			<ng-container *ngTemplateOutlet="renderIcon"></ng-container>
		</div>
		<div attr.class="{{ namespace + '__body' }}">
            <div attr.class="{{ namespace + '__title' }}">{{title}}</div>
            <div attr.class="{{ namespace + '__description' }}">{{subtitle}}</div>
			<div *ngIf="label" attr.class="{{ namespace + '__label' }}">{{label}}</div>
		</div>
		<div *ngIf="renderAction" attr.class="{{ namespace + '__action' }}" >
			<ng-container *ngTemplateOutlet="renderAction"></ng-container>
		</div>
	</xhtml:div>
	`
})

export class CardNodeComponent {
	@Input() color;
	@Input() subtitle;
	@Input() label;
	@Input() stacked;
	@Input() title;
	@Input() renderAction: TemplateRef<any>;
	@Input() renderIcon: TemplateRef<any>;
	@Output() onClick = new EventEmitter<any>();

	namespace = `${prefix}--cc--card-node`;
}
