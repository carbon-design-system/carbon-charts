import {
	StructuredListWrapper,
	StructuredListHead,
	StructuredListRow,
	StructuredListCell,
	StructuredListBody,
	CodeSnippet
} from '@carbon/react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import DiagramSimpleStatic from '../components/DiagramSimpleStatic'
import '@carbon/charts-react/styles.css'

export default function Diagram() {
	return (
		<>
			<PageHeader title="Diagrams" />

			<p>
				Carbon Charts includes a number of components for React and Angular that enable you to
				create diagrams using the Carbon Design System styling.
			</p>

			<p>These include:</p>
			<StructuredListWrapper>
				<StructuredListHead>
					<StructuredListRow head>
						<StructuredListCell head>Component</StructuredListCell>
						<StructuredListCell head>Purpose</StructuredListCell>
					</StructuredListRow>
				</StructuredListHead>
				<StructuredListBody>
					<StructuredListRow>
						<StructuredListCell noWrap>CardNode</StructuredListCell>
						<StructuredListCell>A rectangular container that typically contains an icon, title and subtitle. Properties: tag ('div' | 'a' | 'button'), href (only for tag = 'a'), stacked, color and position.</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>CardNodeColumn</StructuredListCell>
						<StructuredListCell>
							Used to divide a CardNode typically to place an icon on the left and title and subtitle on the right. Rendered as a DIV. Properties: farsideColumn.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>CardNodeTitle</StructuredListCell>
						<StructuredListCell>
							DIV containing the title for a CardNode typically displayed in the right CardNodeColumn typically displayed with a font-weight of 700.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>CardNodeSubtitle</StructuredListCell>
						<StructuredListCell>
							DIV containing the subtitle for a CardNode typically displayed in the right CardNodeColumn below the CardNodeTitle.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>CardNodeLabel</StructuredListCell>
						<StructuredListCell>
							LABEL tag optionally used within a CardNode that is typically positioned below the CardNodeTitle and CardNodeSubtitle using a muted color.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>Marker</StructuredListCell>
						<StructuredListCell>
							Shape to attach to the start and/or end of an Edge. Renders as an SVG marker tag. Properties: id, d (SVG path data), color, position ('start' | 'end'), orient, height, width, refX, refY. See <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker" target="_blank">MDN documentation</a> for more details about the properties.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>Edge</StructuredListCell>
						<StructuredListCell>An SVG group (g) element representing a connecting line typically between CardNodes. Properties: color, markerStart (name of marker style), markerEnd, source (Coordinates), target (Coordinates), path (SVG path) and variant ( 'dash-sm' | 'dash-md' | 'dash-lg' | 'dash-xl' | 'double' | 'tunnel').</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>ShapeNode</StructuredListCell>
						<StructuredListCell>A shape such as a circle, square or rounded square rendered as a DIV, A or BUTTON typically containing an icon. Properties: tag ('a', 'button', 'div'), title, shape ('circle', 'square', 'rounded-square'), renderIcon, description, size, stacked, position ('fixed'), bodyPosition ('absolute').</StructuredListCell>
					</StructuredListRow>
				</StructuredListBody>
			</StructuredListWrapper>

			<h3>1. A simple composed diagram, using statically defined x and y coordinates</h3>

			<DiagramSimpleStatic />

			<StackBlitzLauncherExplanation />

			<h2>Examples for supported frameworks</h2>
		</>
	)
}
