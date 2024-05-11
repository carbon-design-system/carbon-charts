import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
	selector: '[dynamicHost]'
})
export class DynamicHostDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}
