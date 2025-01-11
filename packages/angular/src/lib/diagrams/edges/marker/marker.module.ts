import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
	MarkerComponent,
	MarkerArrowLeftComponent,
	MarkerArrowRightComponent,
	MarkerShapeNodeComponent,
	MarkerDiamondComponent,
	MarkerSquareComponent,
	MarkerTeeComponent
} from './marker.component'

export {
	MarkerComponent,
	MarkerArrowLeftComponent,
	MarkerArrowRightComponent,
	MarkerShapeNodeComponent,
	MarkerDiamondComponent,
	MarkerSquareComponent,
	MarkerTeeComponent
}
@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MarkerComponent,
		MarkerArrowLeftComponent,
		MarkerArrowRightComponent,
		MarkerShapeNodeComponent,
		MarkerDiamondComponent,
		MarkerSquareComponent,
		MarkerTeeComponent
	],
	exports: [
		MarkerComponent,
		MarkerArrowLeftComponent,
		MarkerArrowRightComponent,
		MarkerShapeNodeComponent,
		MarkerDiamondComponent,
		MarkerSquareComponent,
		MarkerTeeComponent
	]
})
export class MarkerModule {}
