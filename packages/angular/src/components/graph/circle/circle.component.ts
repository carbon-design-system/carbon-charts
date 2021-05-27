import { Component, Input, Output, EventEmitter, OnInit, TemplateRef } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";

const { prefix } = settings;

@Component({
	selector: "ibm-graph-circle",
	template: `
	<div [attr.class]="namespace" tabindex="0" (click)="onClick.emit($event)">
		<div *ngIf="renderIcon" attr.class="{{ namespace + '__icon' }}" >
			<ng-container *ngTemplateOutlet="renderIcon"></ng-container>
		</div>
		<div attr.class="{{ namespace + '__body' }}" transform="translate(80,28)">
            <div attr.class="{{ namespace + '__title' }}">{{title}}</div>
            <div attr.class="{{ namespace + '__description' }}" transform="translate(0,20)">{{description}}</div>
        </div>
	</div>
	`
})

export class CircleComponent {
	@Input() title;
	@Input() description;
	@Input() renderIcon: TemplateRef<any>;
	@Output() onClick = new EventEmitter<any>();

	namespace = `${prefix}--cc--circle`;
}
