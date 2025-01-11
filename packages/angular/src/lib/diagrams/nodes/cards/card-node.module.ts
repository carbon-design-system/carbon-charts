import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardNodeComponent } from './card-node.component'
import { CardNodeColumnComponent } from './card-node-column.component'
import { CardNodeLabelComponent } from './card-node-label.component'
import { CardNodeSubtitleComponent } from './card-node-subtitle.component'
import { CardNodeTitleComponent } from './card-node-title.component'
export {
	CardNodeComponent,
	CardNodeColumnComponent,
	CardNodeLabelComponent,
	CardNodeSubtitleComponent,
	CardNodeTitleComponent
}
@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		CardNodeComponent,
		CardNodeColumnComponent,
		CardNodeLabelComponent,
		CardNodeSubtitleComponent,
		CardNodeTitleComponent
	],
	exports: [
		CardNodeComponent,
		CardNodeColumnComponent,
		CardNodeLabelComponent,
		CardNodeSubtitleComponent,
		CardNodeTitleComponent
	]
})
export class CardNodeModule {}
