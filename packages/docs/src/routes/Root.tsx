import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import {
	Content,
	HeaderContainer,
	SkipToContent,
	Header,
	HeaderName,
	HeaderMenuButton,
	HeaderGlobalBar,
	HeaderGlobalAction,
	ExpandableSearch
} from '@carbon/react/es'
import { LogoGithub } from '@carbon/react/icons'
import DocsSideNav from '../components/DocsSideNav'
import { fetchVersion } from '../lib/fetchVersion'

interface HeaderContainerRenderProps {
	isSideNavExpanded: boolean
	onClickSideNavExpand: () => void
}

export default function Root() {
	const [version, setVersion] = useState('...')

	useEffect(() => {
		const getVersion = async () => {
			const fetchedVersion = await fetchVersion()
			setVersion(fetchedVersion)
		}

		getVersion().catch(error => console.error('Error in getVersion:', error))
	}, [])

	return (
		<>
			<HeaderContainer
				render={({ isSideNavExpanded, onClickSideNavExpand }: HeaderContainerRenderProps) => (
					<>
						<Header aria-label="Carbon Charts" className="cds--g100">
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
								<ExpandableSearch
									size="lg"
									labelText="Search"
									closeButtonLabelText="Clear search input"
									id="search-expandable-1"
									onChange={() => {}}
									onKeyDown={() => {}}
								/>

								<HeaderGlobalAction
									aria-label="GitHub"
									as="a"
									href="https://github.com/carbon-design-system/carbon-charts#readme"
									target="_blank"
									rel="noopener noreferrer">
									<LogoGithub size={20} />
								</HeaderGlobalAction>
							</HeaderGlobalBar>
						</Header>

						<DocsSideNav isSideNavExpanded={isSideNavExpanded} />

						<Content className="cds--g10">
							<Outlet />
						</Content>
					</>
				)}
			/>
		</>
	)
}
