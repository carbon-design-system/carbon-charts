import { Outlet } from 'react-router-dom'
import { Content } from '@carbon/react'
import DocsHeader from '../components/DocsHeader'
import DocsSideNav from '../components/DocsSideNav'

export default function Root() {
	return (
		<>
			<DocsHeader />
			{/* <DocsSideNav/> */}

			<Content className="cds--g10">
				<Outlet />
			</Content>
		</>
	)
}
