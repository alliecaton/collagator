import { useUnsplashRequest } from '@/hooks/useUnsplashRequest'
import React, { useState } from 'react'

function Search() {
	const [query, setQuery] = useState('')

	// const queryit = useUnsplashRequest()

	// const queryUnsplash = () => {
	// 	console.log('hit!')

	// 	queryit({
	// 		method: 'get',
	// 		url: '/search/photos',
	// 		data: {
	// 			query: query,
	// 		},
	// 	})
	// }

	return (
		<>
			<form>
				<div className='search'>
					<input
						type='text'
						className='search-input'
						name='query'
						placeholder='asdlfkasldkfjasd'
						value={query}
						onChange={e => setQuery(e.target.value)}
					/>
					<button className='search-button'>SEARCH</button>
				</div>
			</form>
		</>
	)
}

export default Search
