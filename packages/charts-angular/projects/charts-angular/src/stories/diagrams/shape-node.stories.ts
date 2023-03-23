import { storiesOf, moduleMetadata } from '@storybook/angular'
import { ShapeNodeModule } from './shape-node/shape-node.module'
import { ScreenModule } from '@carbon/icons-angular'
import { getTemplate } from './utils'

storiesOf('Diagrams/Nodes/Shape', module)
	.addDecorator(
		moduleMetadata({
			imports: [ShapeNodeModule, ScreenModule]
		})
	)
	.add('Default', () => ({
		template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				<svg ibmIconScreen size="16"></svg>
			</ng-template>
		</div>
	`),
		props: {
			title: 'Title'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Square', () => ({
		template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [shape]="shape"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				<svg ibmIconScreen size="16"></svg>
			</ng-template>
		</div>
	`),
		props: {
			title: 'Title',
			shape: 'square'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Rounded square', () => ({
		template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [shape]="shape"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				<svg ibmIconScreen size="16"></svg>
			</ng-template>
		</div>
	`),
		props: {
			title: 'Title',
			shape: 'rounded-square'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('As button', () => ({
		template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [as]="component"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				<svg ibmIconScreen size="16"></svg>
			</ng-template>
		</div>
	`),
		props: {
			title: 'Title',
			component: 'button'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('As link', () => ({
		template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [href]="href"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				<svg ibmIconScreen size="16"></svg>
			</ng-template>
		</div>
	`),
		props: {
			title: 'Title',
			href: '#'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Inherited dimensions', () => ({
		template: getTemplate(`
		<div style="height: 64px; width: 64px; position: relative;">
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [size]="'100%'" position="static"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				<svg ibmIconScreen size="16"></svg>
			</ng-template>
		</div>
	`),
		props: {
			title: 'Title'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
