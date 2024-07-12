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
				<SideNavMenuItem href="#" element={NavLink} to="/introduction">
					Introduction
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/installation">
					Installation & setup
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/anatomy">
					Chart anatomy
				</SideNavMenuItem>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu title="Data & configuration" defaultExpanded={true}>
				<SideNavMenuItem element={NavLink} to="/data">
					Chart data
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/options">
					Chart display options
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/highlights">
					Highlights
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/locales">
					Locales
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/thresholds">
					Thresholds
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/toolbar">
					Toolbar customization
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/truncation">
					Truncation
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/zoombar">
					Zoombar
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/api">
					API
				</SideNavMenuItem>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu title="Design" defaultExpanded={true}>
				<SideNavMenuItem element={NavLink} to="/themes">
					Themes (dark & light)
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/axes">
					Axes
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/palettes">
					Color palette
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/dashboards">
					Dashboards
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/legends">
					Legends
				</SideNavMenuItem>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu title="Chart types" defaultExpanded={true}>
				<SideNavMenuItem element={NavLink} to="/alluvial">
					Alluvial / Sankey
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/area">
					Area (standard, stacked)
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/bar">
					Bar (simple, grouped, stacked)
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/boxplot">
					Boxplot
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/bubble">
					Bubble
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/bullet">
					Bullet
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/choropleth">
					Choropleth
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/circlepack">
					Circle pack
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/combo">
					Combo
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/donut">
					Donut
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/gauge">
					Gauge
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/heatmap">
					Heatmap
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/histogram">
					Histogram
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/line">
					Line
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/lollipop">
					Lollipop
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/meter">
					Meter
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/diagram">
					Network Diagrams
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/pie">
					Pie
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/radar">
					Radar
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/scatter">
					Scatter
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/tree">
					Tree
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/treemap">
					Treemap
				</SideNavMenuItem>
				<SideNavMenuItem element={NavLink} to="/wordcloud">
					Word cloud
				</SideNavMenuItem>
			</SideNavMenu>
		</SideNavItems>
	</SideNav>
)

export default DocsSideNav
