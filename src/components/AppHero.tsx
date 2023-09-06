import '@/styles/AppHeader.scss'
import heroImage from '@/assets/hero-image.png'

function AppHero() {
	return (
		<>
			<div className='hero'>
				<div className='hero__text'>
					Collager is a simple tool for digital collaging.
					<br />
					<br />
					Part of the fun of traditional collaging is creating art out of a
					limited set of images. With the vastness of the internet, that aspect
					of collaging is lost when done digitally. Collager is a tool that
					helps narrow the internet to help recreate the creative challenge of
					limitations.
				</div>
				<div>
					<img
						className='hero__image'
						src={heroImage}
						alt='hero with collection of photos'
					/>
				</div>
			</div>

			<div className='divider'></div>
		</>
	)
}

export default AppHero
