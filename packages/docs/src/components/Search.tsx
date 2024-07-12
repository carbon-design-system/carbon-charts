import React, { useState, useEffect, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExpandableSearch, ContainedList, ContainedListItem } from '@carbon/react'
import styled from 'styled-components'
import Fuse from 'fuse.js'
import searchIndex from '../searchIndex'

const SearchContainer = styled.div`
	position: relative;
`

const SearchResultsContainer = styled.div`
	width: 100%;
	z-index: 1000;
	background-color: rgb(38, 38, 38);
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	position: absolute;

	.cds--contained-list__header {
		background-color: unset;
	}

	a {
		text-decoration: none;
		color: #fff;
	}

	.cds--contained-list-item:hover {
		background-color: #353535;
	}
`

const options = {
	keys: ['title', 'text', 'charts'],
	threshold: 0.3
}

const fuse = new Fuse(searchIndex, options)

const Search: React.FC = () => {
	const [searchText, setSearchText] = useState<string>('')
	const [searchResults, setSearchResults] = useState<any[]>([])
	const [isExpanded, setIsExpanded] = useState<boolean>(false)
	const navigate = useNavigate()

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value
		setSearchText(query)

		if (query.length > 2) {
			const results = fuse.search(query)
			setSearchResults(results.map(result => result.item))
		} else {
			setSearchResults([])
		}
	}

	useEffect(() => {
		if (searchText.length > 2) {
			const results = fuse.search(searchText)
			setSearchResults(results.map(result => result.item))
		} else {
			setSearchResults([])
		}
	}, [searchText])

	const clearSearch = () => {
		setTimeout(() => {
			setSearchText('')
			setSearchResults([])
			setIsExpanded(false)
		}, 500)
	}

	const handleSearchExpand = () => {
		setIsExpanded(true)
	}

	const handleLinkClick = (path: string) => {
		navigate(path)
		clearSearch()
	}

	return (
		<SearchContainer>
			<ExpandableSearch
				id="search"
				labelText="Search"
				size="lg"
				closeButtonLabelText="Clear search input"
				onChange={handleSearchChange}
				value={searchText}
				placeholder="Filterable search"
				isExpanded={isExpanded}
				onExpand={handleSearchExpand}
				onBlur={clearSearch}
			/>
			{searchResults.length > 0 && (
				<SearchResultsContainer>
					<ContainedList label="Search results" kind="on-page">
						{searchResults.map((result, index) => (
							<ContainedListItem key={index}>
								<Link to={`/${result.path}`} onClick={() => handleLinkClick(`/${result.path}`)}>
									<strong>{result.title}</strong>
									<br />
									{result.text.substring(0, 60).trim()}...
								</Link>
							</ContainedListItem>
						))}
					</ContainedList>
				</SearchResultsContainer>
			)}
		</SearchContainer>
	)
}

export default Search
