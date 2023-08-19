import { useState, FormEvent } from 'react'
import SearchResults from '@/components/SearchResults'
import '@/styles/Search.scss'

function Search() {
	// Query is what we use to actually query the API with
	const [formData, setFormData] = useState({ query: '', count: 20 })

	const [query, setQuery] = useState<string>('')
	const [count, setCount] = useState<number>(20)

	const submitQuery = (e: FormEvent<HTMLFormElement>) => {
		setFormData({ query: query, count: count })
	}

	const decrement = () => {
		setCount(prevCount => prevCount - 1)
	}

	const increment = () => {
		setCount(prevCount => prevCount + 1)
	}

	return (
		<>
			<p>
				Search for a random set of photos, or search with a query for a narrower
				selection.
			</p>

			<form className='form' onSubmit={e => submitQuery(e)}>
				<div className='inputs'>
					<input
						type='text'
						className='search-input'
						name='query'
						placeholder='i.e. forest'
						value={query}
						onChange={e => setQuery(e.target.value)}
					/>

					<div className='inputs__counter'>
						<button onClick={decrement}> - </button>
						<input
							type='text'
							className='search-input'
							name='count'
							value={count}
							onChange={e => setCount(Number(e.target.value))}
						/>
						<button onClick={increment}> + </button>
					</div>
				</div>
				<button type='submit' className='form__button'>
					SEARCH
				</button>
			</form>

			<SearchResults formData={formData} />
		</>
	)
}

export default Search
