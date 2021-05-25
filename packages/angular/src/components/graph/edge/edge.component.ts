import { Component, Input, OnInit } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";
import { straight } from "./buildPath";
import classnames from "classnames";

const { prefix } = settings;

@Component({
	selector: "[ibm-graph-edge]",
	template: `
	<svg:path
		[attr.d]="path"
		[attr.class]="pathClasses"
	/>
	`
})

export class EdgeComponent {
	@Input() source;
	@Input() target;
	@Input() variant;
	@Input() path;

	pathClasses;
	namespace = `${prefix}--cc--edge`;

	ngOnInit() {
		this.path = this.path ? this.path : straight(this.source, this.target);

		this.pathClasses = classnames(this.namespace, {
			[`${this.namespace}--${this.variant}`]: this.variant,
		});
	}
}
