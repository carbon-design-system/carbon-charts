import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ShapeNode } from './shape-node.component'
export { ShapeNode } from './shape-node.component'

@NgModule({
	exports: [ShapeNode],
	imports: [CommonModule, ShapeNode]
})
export class ShapeNodeModule {}
