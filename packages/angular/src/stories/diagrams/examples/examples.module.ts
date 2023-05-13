import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserModule, WikisModule } from '@carbon/icons-angular'
import { CardNodeModule, EdgeModule, MarkerModule, ShapeNodeModule } from '../../../'
import { DiagramExample1Component } from './example1/diagram-example1.component'

@NgModule({
	declarations: [DiagramExample1Component],
	imports: [
		CommonModule,
		CardNodeModule,
		EdgeModule,
		MarkerModule,
		ShapeNodeModule,
		UserModule, // not Ivy
		WikisModule // not Ivy
	],
	exports: [DiagramExample1Component],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiagramExamplesModule {}
