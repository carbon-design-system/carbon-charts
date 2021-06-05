import { Component, Input, Output, EventEmitter, OnInit, TemplateRef } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";

const { prefix } = settings;

@Component({
	selector: "ibm-diagram-circle-node",
	template: `
	<xhtml:div [attr.class]="namespace" [ngStyle]="{'height.px': size, 'width.px': size}" tabindex="0" (click)="onClick.emit($event)">
		<div *ngIf="renderIcon" attr.class="{{ namespace + '__icon' }}" >
			<ng-container *ngTemplateOutlet="renderIcon"></ng-container>
		</div>
		<div attr.class="{{ namespace + '__body' }}" transform="translate(80,28)">
            <div attr.class="{{ namespace + '__title' }}">{{title}}</div>
            <div attr.class="{{ namespace + '__description' }}" transform="translate(0,20)">{{description}}</div>
        </div>
	</xhtml:div>
	`
})

export class ShapeNodeComponent {
	@Input() description;
	@Input() renderIcon: TemplateRef<any>;
	@Input() size = 48;
	@Input() title;

	@Output() onClick = new EventEmitter<any>();

	namespace = `${prefix}--cc--circle-node`;
}
