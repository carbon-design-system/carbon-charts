import React from 'react'
import { NavLink } from 'react-router-dom'
import {
	SideNav,
	SideNavItems,
	SideNavMenu,
	SideNavMenuItem,
	SideNavDivider
} from '@carbon/react/es'

interface Props {
	isSideNavExpanded: boolean
}

const DocsSideNav: React.FC<Props> = ({ isSideNavExpanded }) => (
	<SideNav expanded={isSideNavExpanded} className="cds--white" aria-label="Table of contents">
		<SideNavItems className="pb-200">
			<SideNavMenu title="Getting started" defaultExpanded={true}>
				<SideNavMenuItem href="#" as={NavLink} to="/introduction">
					Introduction
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/installation">
					Installation & setup
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/anatomy">
					Chart anatomy
				</SideNavMenuItem>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu title="Data & configuration" defaultExpanded={true}>
				<SideNavMenuItem as={NavLink} to="/apidocs">
					API
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/analytics-instrumentation">
					Analytics Instrumentation
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/data">
					Chart data
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/options">
					Chart display options
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/event-listeners">
					Event Listeners
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/highlights">
					Highlights
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/locales">
					Locales
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/thresholds">
					Thresholds
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/toolbar">
					Toolbar customization
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/truncation">
					Truncation
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/zoombar">
					Zoombar
				</SideNavMenuItem>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu title="Design" defaultExpanded={true}>
				<SideNavMenuItem as={NavLink} to="/themes">
					Themes (dark & light)
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/axes">
					Axes
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/palettes">
					Color palette
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/dashboards">
					Dashboards
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/legends">
					Legends
				</SideNavMenuItem>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu title="Chart types" defaultExpanded={true}>
				<SideNavMenuItem as={NavLink} to="/alluvial">
					Alluvial / Sankey
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/area">
					Area (standard, stacked)
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/bar">
					Bar (simple, grouped, stacked)
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/boxplot">
					Boxplot
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/bubble">
					Bubble
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/bullet">
					Bullet
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/choropleth">
					Choropleth
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/circlepack">
					Circle pack
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/combo">
					Combo
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/donut">
					Donut
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/gauge">
					Gauge
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/heatmap">
					Heatmap
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/histogram">
					Histogram
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/line">
					Line
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/lollipop">
					Lollipop
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/meter">
					Meter
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/diagram">
					Network Diagrams
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/pie">
					Pie
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/radar">
					Radar
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/scatter">
					Scatter
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/tree">
					Tree
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/treemap">
					Treemap
				</SideNavMenuItem>
				<SideNavMenuItem as={NavLink} to="/wordcloud">
					Word cloud
				</SideNavMenuItem>
			</SideNavMenu>
		</SideNavItems>
	</SideNav>
)

export default DocsSideNav
