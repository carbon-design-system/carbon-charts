import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardNode } from './card-node.component'
import { CardNodeColumn } from './card-node-column.component'
import { CardNodeLabel } from './card-node-label.component'
import { CardNodeSubtitle } from './card-node-subtitle.component'
import { CardNodeTitle } from './card-node-title.component'
export { CardNode, CardNodeColumn, CardNodeLabel, CardNodeSubtitle, CardNodeTitle }
@NgModule({
	declarations: [CardNode, CardNodeColumn, CardNodeLabel, CardNodeSubtitle, CardNodeTitle],
	imports: [CommonModule],
	exports: [CardNode, CardNodeColumn, CardNodeLabel, CardNodeSubtitle, CardNodeTitle]
})
export class CardNodeModule {}
