import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
// import { Grid, Column, OrderedList, ListItem } from '@carbon/react'
// import './Anatomy.scss'

export default function Anatomy() {
	return (
		<>
			<PageHeader title="Chart anatomy" />
			Please see the{' '}
			<Link to="https://carbondesignsystem.com/data-visualization/chart-anatomy/" target="_blank">
				Charts anatomy
			</Link>{' '}
			page on the <Link to="https://carbondesignsystem.com">Carbon Design System</Link> site for
			more details.
			{/* <h2>Rectangular Charts</h2>

			<p>
				Most data visualizations are rectangular charts, with two dimensions represented on a vertical and
				a horizontal axis. Rectangular charts are typically constructed with a set of common elements
				including a legend, axis titles, and navigation tools like a zoom bar and tooltip.
			</p>

			<Grid>
				<Column lg={8}>
					<img className="diagram"
						src="/images/chart-anatomy-rectangular.png"
						alt="Anatomy of a rectangular chart" />
				</Column>
				<Column lg={8}>
					<OrderedList native>
						<ListItem>Chart title</ListItem>
						<ListItem>Axes</ListItem>
						<ListItem>Ticks</ListItem>
						<ListItem>Axis title</ListItem>
						<ListItem>Legends</ListItem>
						<ListItem>Toolbar</ListItem>
						<ListItem>Zoom bar</ListItem>
						<ListItem>Graph frame</ListItem>
						<ListItem>Tooltip</ListItem>
					</OrderedList>
				</Column>
			</Grid>

			<h3>Labels</h3>

			<p>
				In a circular chart, labels offer the percentage value of the whole for an individual category.
				When the graphic translation of the data is less than 3 degrees, a callout is used to clearly
				associate the label with the slice. If the data translates as less than 1 degree, a slice will not
				be rendered on the chart, the data would not be keyboard accessible or available in a tooltip
				either. The only way to see the data in this scenario would be via a data table, a feature that
				we’d like to implement for all charts to enhance accessibility.
			</p>

			<h3>Big number or KPI</h3>

			<p>
				A key performance indicator (KPI) consists of a number with a single word description. Examples
				include “15,250 browsers”, “\$1.3M revenue”, or “Total 450”. A big number inside the donut chart
				may be used to display a total sum or the individual count of a slice upon interaction. This
				element can also be used independently on a dashboard (though please note this component is still
				a WIP and not available outside the donut chart).
			</p> */}
		</>
	)
}
