import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
	HeaderContainer,
	SkipToContent,
	Theme,
	Header,
	HeaderName,
	HeaderMenuButton,
	HeaderGlobalBar,
	HeaderGlobalAction,
	SideNav,
	SideNavItems,
	SideNavMenu,
	SideNavMenuItem,
	SideNavDivider
} from '@carbon/react'
import { Link } from 'react-router-dom'
import { LogoGithub } from '@carbon/react/icons'
// import DocsSideNav from '../components/DocsSideNav'

export default function DocsHeader() {
	const [version, setVersion] = useState<string>('...')

	useEffect(() => {
		const fetchVersion = async () => {
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/carbon-design-system/carbon-charts/master/packages/react/package.json'
				)
				const data = await response.json()
				const carbonChartsReactVersion = data.version.replace('^', '')
				setVersion(carbonChartsReactVersion)
			} catch (error) {
				console.error('Error fetching version:', error)
			}
		}

		fetchVersion()
	}, [])

	return (
		<HeaderContainer
			render={({ isSideNavExpanded, onClickSideNavExpand }) => (
				<Theme theme="g100">
					<Header aria-label="Carbon Charts">
						<SkipToContent />
						<HeaderMenuButton
							aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
							onClick={onClickSideNavExpand}
							isActive={isSideNavExpanded}
							aria-expanded={isSideNavExpanded}
						/>
						<HeaderName as={Link} to="/" prefix="Carbon">
							Charts {version}
						</HeaderName>
						<HeaderGlobalBar>
							<HeaderGlobalAction
								aria-label="GitHub"
								target="_blank"
								href="https://github.com/carbon-design-system/carbon-charts#readme"
								rel="noopener noreferrer">
								<LogoGithub size={20} />
							</HeaderGlobalAction>
						</HeaderGlobalBar>

						<SideNav
							className="cds--white"
							aria-label="Table of contents"
							expanded={isSideNavExpanded}>
							<SideNavItems>
								<SideNavMenu title="Getting started">
									<SideNavMenuItem href="#">Link</SideNavMenuItem>
									{/* <SideNavMenuItem href="#" as={NavLink} to="/introduction">Introduction</SideNavMenuItem>
                <SideNavMenuItem as={NavLink} to="/installation">Installation & setup</SideNavMenuItem>
                <SideNavMenuItem as={NavLink} to="/anatomy">Chart anatomy</SideNavMenuItem> */}
								</SideNavMenu>
								<SideNavDivider />
								<SideNavMenu title="Chart types">
									<SideNavMenuItem as={NavLink} to="/alluvial">
										Alluvial / Sankey
									</SideNavMenuItem>
									<SideNavMenuItem as={NavLink} to="/area">
										Area
									</SideNavMenuItem>
									<SideNavMenuItem as={NavLink} to="/area#stacked">
										Area (stacked)
									</SideNavMenuItem>
									<SideNavMenuItem as={NavLink} to="/bar">
										Bar
									</SideNavMenuItem>
									<SideNavMenuItem as={NavLink} to="/bar#grouped">
										Bar (grouped)
									</SideNavMenuItem>
									<SideNavMenuItem as={NavLink} to="/bar#stacked">
										Bar (stacked)
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
										Network diagrams
									</SideNavMenuItem>
									<SideNavMenuItem as={NavLink} to="/pie">
										Pie
									</SideNavMenuItem>
									<SideNavMenuItem as={NavLink} to="/radar">
										Radar / Kiviat
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
					</Header>
				</Theme>
			)}
		/>
	)
}
