import React from 'react'
import '@/styles/App.css'
import '@/styles/Globals.scss'
import Search from '@/components/Search'
import AppHero from '@/components/AppHero'

function App() {
	return (
		<div className='app'>
			<div className='header'>COLLAGER</div>

			<header className='app__header'>
				<AppHero />

				<div className='main-container'>
					<Search />
				</div>
			</header>
		</div>
	)
}

export default App
