import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ShapeNode } from './shape-node.component'
export { ShapeNode } from './shape-node.component'

@NgModule({
	declarations: [ShapeNode],
	imports: [CommonModule],
	exports: [ShapeNode]
})
export class ShapeNodeModule {}
