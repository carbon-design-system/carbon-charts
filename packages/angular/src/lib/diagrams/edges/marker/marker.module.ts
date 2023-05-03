import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
	Marker,
	MarkerArrowLeft,
	MarkerArrowRight,
	MarkerShapeNode,
	MarkerDiamond,
	MarkerSquare,
	MarkerTee
} from './marker.component'

export {
	Marker,
	MarkerArrowLeft,
	MarkerArrowRight,
	MarkerShapeNode,
	MarkerDiamond,
	MarkerSquare,
	MarkerTee
}
@NgModule({
	declarations: [
		Marker,
		MarkerArrowLeft,
		MarkerArrowRight,
		MarkerShapeNode,
		MarkerDiamond,
		MarkerSquare,
		MarkerTee
	],
	imports: [
		CommonModule
	],
	exports: [
		Marker,
		MarkerArrowLeft,
		MarkerArrowRight,
		MarkerShapeNode,
		MarkerDiamond,
		MarkerSquare,
		MarkerTee
	]
})
export class MarkerModule {}
