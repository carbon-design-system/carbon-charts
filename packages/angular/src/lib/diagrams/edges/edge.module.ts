import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EdgeComponent } from './edge.component'
export { EdgeComponent } from './edge.component'

@NgModule({
	declarations: [EdgeComponent],
	imports: [CommonModule],
	exports: [EdgeComponent]
})
export class EdgeModule {}
