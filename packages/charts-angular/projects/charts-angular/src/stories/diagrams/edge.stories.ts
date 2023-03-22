import { storiesOf, moduleMetadata } from '@storybook/angular'
import { EdgeModule } from './edge/edge.module'
import { components } from '@carbon/charts'
import { getTemplate } from './utils'

const linkSource = { x: 0, y: 0 }
const linkTarget = { x: 400, y: 0 }
const linkTargetCurve = { x: 400, y: 200 }

storiesOf('Diagrams/Edges', module)
	.addDecorator(
		moduleMetadata({
			imports: [EdgeModule]
		})
	)
	.add('Default', () => ({
		template: getTemplate(`
		<svg height="800" width="800">
			<g transform="translate(16,16)">
				<g ibm-graph-edge [source]="source" [target]="target"></g>
			</g>
		</svg>
	`),
		props: {
			source: linkSource,
			target: linkTarget
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Color', () => ({
		template: getTemplate(`
		<svg height="800" width="800">
			<g transform="translate(16,16)">
				<g ibm-graph-edge [color]="color" [source]="source" [target]="target"></g>
			</g>
		</svg>
	`),
		props: {
			color: '#FB4B53',
			source: linkSource,
			target: linkTarget
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Dashed', () => ({
		template: getTemplate(`
		<svg height="800" width="800">
			<g transform="translate(16,16)">
				<g ibm-graph-edge [source]="source" [target]="target" variant='dash-sm' />
			</g>

			<g transform="translate(16,32)">
				<g ibm-graph-edge [source]="source" [target]="target" variant='dash-md' />
			</g>

			<g transform="translate(16,48)">
				<g ibm-graph-edge [source]="source" [target]="target" variant='dash-lg' />
			</g>

			<g transform="translate(16,64)">
				<g ibm-graph-edge [source]="source" [target]="target" variant='dash-xl' />
			</g>
		</svg>
	`),
		props: {
			source: linkSource,
			target: linkTarget
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Double', () => ({
		template: getTemplate(`
		<svg height="800" width="800">
			<g transform="translate(16,16)">
				<g ibm-graph-edge [source]="source" [target]="target" variant='double' />
			</g>
		</svg>
	`),
		props: {
			source: linkSource,
			target: linkTarget
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Tunnel', () => ({
		template: getTemplate(`
		<svg height="800" width="800">
			<g transform="translate(16,16)">
				<g ibm-graph-edge [source]="source" [target]="target" variant='tunnel' />
			</g>
		</svg>
	`),
		props: {
			source: linkSource,
			target: linkTarget
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Elbow', () => ({
		template: getTemplate(`
		<svg height="800" width="800">
			<g transform="translate(16,16)">
				<g ibm-graph-edge [source]="source" [target]="target" [path]="path" />
			</g>
		</svg>
	`),
		props: {
			source: linkSource,
			target: linkTarget,
			path: components.buildElbowPathString(linkSource, linkTargetCurve)
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Bezier', () => ({
		template: getTemplate(`
		<svg height="800" width="800">
			<g transform="translate(16,16)">
				<g ibm-graph-edge [source]="source" [target]="target" [path]="path" />
			</g>
		</svg>
	`),
		props: {
			source: linkSource,
			target: linkTarget,
			path: components.buildBezierPathString(linkSource, linkTargetCurve, 150, 280, 150, 30)
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
