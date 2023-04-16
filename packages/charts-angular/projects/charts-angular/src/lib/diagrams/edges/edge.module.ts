import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Edge } from './edge.component'
export { Edge } from './edge.component'

@NgModule({
    exports: [Edge],
    imports: [CommonModule, Edge]
})
export class EdgeModule {}
