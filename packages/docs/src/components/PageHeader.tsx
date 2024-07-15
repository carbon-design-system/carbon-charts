import React from 'react'
import styled from 'styled-components'

interface Props {
	title: string
}

const PageHeaderContainer = styled.div`
	background-color: #161616;
	color: #fff;
	padding-top: 4rem;
	padding-bottom: 3rem;
	padding-left: 3rem;
	margin-left: -3rem;
	margin-right: -3rem;
	margin-top: -3rem;
	margin-bottom: 3rem;
	height: 20rem;
`

const PageHeaderTitle = styled.h1`
	margin-top: 8rem;
	font-size: 4.5rem;
	@media (max-width: 1200px) {
		font-size: 4rem;
	}
	@media (max-width: 992px) {
		font-size: 3.5rem;
	}
	@media (max-width: 768px) {
		font-size: 3rem;
	}
	@media (max-width: 576px) {
		font-size: 2.5rem;
	}
`

const PageHeader: React.FC<Props> = ({ title }) => {
	return (
		<PageHeaderContainer>
			<PageHeaderTitle>{title}</PageHeaderTitle>
		</PageHeaderContainer>
	)
}

export default PageHeader
