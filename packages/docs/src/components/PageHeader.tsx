import React from 'react'
import './PageHeader.scss'

interface Props {
	title: string
}

const PageHeader: React.FC<Props> = ({ title }) => {
	return (
		<div className="page-header cds--g100">
			<h1 className="page-header-title">{title}</h1>
		</div>
	)
}

export default PageHeader
