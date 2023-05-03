import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Edge } from './edge.component'
export { Edge } from './edge.component'

@NgModule({
	declarations: [Edge],
	imports: [CommonModule],
	exports: [Edge]
})
export class EdgeModule {}
