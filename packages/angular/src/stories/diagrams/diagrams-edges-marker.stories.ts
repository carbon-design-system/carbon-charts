import { storiesOf, moduleMetadata } from '@storybook/angular'
import { EdgeModule, MarkerModule } from '../../'
import { getTemplate } from './utils'

const linkSource = { x: 0, y: 0 }
const linkTarget = { x: 300, y: 0 }

storiesOf('Diagrams/Edges/Marker', module)
	.addDecorator(
		moduleMetadata({
			imports: [MarkerModule, EdgeModule]
		})
	)
	.add(
		'Arrow left',
		() => ({
			template: getTemplate(`
		<svg height="400" width="400">
			<svg:defs>
				<svg:marker ibm-graph-marker-arrow-left [id]="markerStart"></svg:marker>
			</svg:defs>
			<svg:g transform="translate(16,16)">
				<svg:g ibm-graph-edge [source]="source" [target]="target" [markerStart]="markerStart"></svg:g>
			</svg:g>
		</svg>
	`),
			props: {
				source: linkSource,
				target: linkTarget,
				markerStart: 'marker'
			}
		}),
		{
			controls: {
				hideNoControlsWarning: true
			}
		}
	)
	.add(
		'Arrow Right',
		() => ({
			template: getTemplate(`
		<svg height="400" width="400">
			<svg:defs>
				<svg:marker ibm-graph-marker-arrow-right [id]="markerEnd"></svg:marker>
			</svg:defs>
			<svg:g transform="translate(16,16)">
				<svg:g ibm-graph-edge [source]="source" [target]="target" [markerEnd]="markerEnd"></svg:g>
			</svg:g>
		</svg>
	`),
			props: {
				source: linkSource,
				target: linkTarget,
				markerEnd: 'marker'
			}
		}),
		{
			controls: {
				hideNoControlsWarning: true
			}
		}
	)
	.add(
		'Circle',
		() => ({
			template: getTemplate(`
		<svg height="400" width="400">
			<svg:defs>
				<svg:marker ibm-graph-marker-circle [id]="markerStart"></svg:marker>
			</svg:defs>
			<svg:g transform="translate(16,16)">
				<svg:g ibm-graph-edge [source]="source" [target]="target" [markerStart]="markerStart"></svg:g>
			</svg:g>
		</svg>
	`),
			props: {
				source: linkSource,
				target: linkTarget,
				markerStart: 'marker'
			}
		}),
		{
			controls: {
				hideNoControlsWarning: true
			}
		}
	)
	.add(
		'Diamond',
		() => ({
			template: getTemplate(`
		<svg height="400" width="400">
			<svg:defs>
				<svg:marker ibm-graph-marker-diamond [id]="markerStart"></svg:marker>
			</svg:defs>
			<svg:g transform="translate(16,16)">
				<svg:g ibm-graph-edge [source]="source" [target]="target" [markerStart]="markerStart"></svg:g>
			</svg:g>
		</svg>
	`),
			props: {
				source: linkSource,
				target: linkTarget,
				markerStart: 'marker'
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
		<svg height="400" width="400">
			<svg:defs>
				<svg:marker ibm-graph-marker-square [id]="markerStart"></svg:marker>
			</svg:defs>
			<svg:g transform="translate(16,16)">
				<svg:g ibm-graph-edge [source]="source" [target]="target" [markerStart]="markerStart"></svg:g>
			</svg:g>
		</svg>
	`),
			props: {
				source: linkSource,
				target: linkTarget,
				markerStart: 'marker'
			}
		}),
		{
			controls: {
				hideNoControlsWarning: true
			}
		}
	)
	.add(
		'Tee',
		() => ({
			template: getTemplate(`
		<svg height="400" width="400">
			<svg:defs>
				<svg:marker ibm-graph-marker-tee [id]="markerStart"></svg:marker>
			</svg:defs>
			<svg:g transform="translate(16,16)">
				<svg:g ibm-graph-edge [source]="source" [target]="target" [markerStart]="markerStart"></svg:g>
			</svg:g>
		</svg>
	`),
			props: {
				source: linkSource,
				target: linkTarget,
				markerStart: 'marker'
			}
		}),
		{
			controls: {
				hideNoControlsWarning: true
			}
		}
	)
	.add(
		'Color',
		() => ({
			template: getTemplate(`
		<svg height="400" width="400">
			<svg:defs>
				<svg:marker ibm-graph-marker-tee [id]="markerStart" [color]="color" ></svg:marker>
			</svg:defs>
			<svg:g transform="translate(16,16)">
				<svg:g ibm-graph-edge [source]="source" [target]="target" [markerStart]="markerStart" [color]="color"></svg:g>
			</svg:g>
		</svg>
	`),
			props: {
				source: linkSource,
				target: linkTarget,
				markerStart: 'marker',
				color: '#FB4B53'
			}
		}),
		{
			controls: {
				hideNoControlsWarning: true
			}
		}
	)
