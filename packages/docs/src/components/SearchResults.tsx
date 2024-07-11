import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface SearchResultsProps {
	results: any[]
	onClear: () => void
}

const ResultsContainer = styled.div`
	background: white;
	position: absolute;
	width: 100%;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 10;
`

const ResultItem = styled.div`
	padding: 10px;
	border-bottom: 1px solid #e0e0e0;

	a {
		text-decoration: none;
		color: inherit;
	}
`

const NoResults = styled.div`
	padding: 10px;
	text-align: center;
	color: #888;
`

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClear }) => {
	return (
		<ResultsContainer>
			{results.length > 0 ? (
				results.map((result: any) => (
					<ResultItem key={result.item.path}>
						<Link to={result.item.path} onClick={onClear}>
							{result.item.title}
						</Link>
					</ResultItem>
				))
			) : (
				<NoResults>No results found</NoResults>
			)}
		</ResultsContainer>
	)
}

export default SearchResults
