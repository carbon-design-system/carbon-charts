import { storiesOf, moduleMetadata } from '@storybook/angular'
import { ChartTheme } from '@carbon/charts'
import { getAttributes, toString } from '@carbon/icon-helpers'
import screenIcon from '@carbon/icons/es/screen/16'
import { ShapeNodeModule } from '../../'
import { getTemplate } from './utils'

const DEFAULT_THEME = ChartTheme.WHITE
const screenIconStr = toString({ ...screenIcon, attrs: getAttributes(screenIcon.attrs) as Record<string, string> })

storiesOf('Diagrams/Nodes/Shape', module)
	.addDecorator(
		moduleMetadata({
			imports: [ShapeNodeModule]
		})
	)
	.addDecorator(story => {
		document.documentElement.setAttribute('data-carbon-theme', DEFAULT_THEME)
		return story()
	})
	.add(
		'Default',
		() => ({
			template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				${screenIconStr}
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
		}
	)
	.add(
		'Square',
		() => ({
			template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [shape]="shape"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				${screenIconStr}
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
		}
	)
	.add(
		'Rounded square',
		() => ({
			template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [shape]="shape"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				${screenIconStr}
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
		}
	)
	.add(
		'As button',
		() => ({
			template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [as]="component"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				${screenIconStr}
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
		}
	)
	.add(
		'As link',
		() => ({
			template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [href]="href"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				${screenIconStr}
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
		}
	)
	.add(
		'Inherited dimensions',
		() => ({
			template: getTemplate(`
		<div style="height: 64px; width: 64px; position: relative;">
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [size]="'100%'" position="static"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				${screenIconStr}
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
		}
	)
