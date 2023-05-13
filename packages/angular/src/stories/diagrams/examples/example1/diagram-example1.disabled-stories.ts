import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { UserModule, WikisModule } from '@carbon/icons-angular'
import { CardNodeModule, EdgeModule, MarkerModule, ShapeNodeModule } from '../../../../'
import { DiagramExample1Component } from './diagram-example1.component'

const meta: Meta<DiagramExample1Component> = {
	title: 'Example 1',
	component: DiagramExample1Component,
	decorators: [
		moduleMetadata({
			declarations: [DiagramExample1Component],
			imports: [
				CommonModule,
				CardNodeModule,
				EdgeModule,
				MarkerModule,
				ShapeNodeModule,
				UserModule, // not Ivy
				WikisModule // not Ivy
			]
		})
	]
}

export default meta

type Story = StoryObj<DiagramExample1Component>

export const Primary: Story = {
	args: {
		source: { x: 0, y: 48 },
		target: { x: 396, y: 48 },
		markerEnd: 'marker',
		nodeHeight: 64,
		nodeWidth: 200,
		circleSize: 64
	}
}
