import React from 'react'
import '@/styles/App.css'
import Search from '@/components/Search'
import AppHeader from '@/components/AppHeader'

function App() {
	return (
		<div className='app'>
			<header className='app__header'>
				<AppHeader />

				<Search />
			</header>
		</div>
	)
}

export default App
