import React from 'react'
import './App.css'
import SearchBar from '@/components/SearchBar'

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Collagator</h1>

				<p>Photo randomizer for your digital collaging needs!</p>

				<SearchBar />
			</header>
		</div>
	)
}

export default App
