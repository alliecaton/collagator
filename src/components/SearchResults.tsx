import { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import '@/styles/SearchResults.scss'

import { Photo } from '@/types/photos'

type Payload = {
	query?: string
	count: number
}

const fakeData: { data: any[] } = {
	data: [
		{
			id: '49fnhuJBHH8',
			slug: '49fnhuJBHH8',
			created_at: '2021-08-03T14:40:22Z',
			updated_at: '2023-09-05T11:22:49Z',
			promoted_at: '2023-09-03T10:24:01Z',
			width: 4892,
			height: 6522,
			color: '#73598c',
			blur_hash: 'LA9s.2s,t7t9^-oMt7RjohRiNEWC',
			alt_description: 'purple and black flower in close up photography',
			breadcrumbs: [],
			urls: {
				raw: 'https://images.unsplash.com/photo-1628001275493-56d109f0bc45?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM5NjQ4ODV8&ixlib=rb-4.0.3',
				full: 'https://images.unsplash.com/photo-1628001275493-56d109f0bc45?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM5NjQ4ODV8&ixlib=rb-4.0.3&q=85',
				regular:
					'https://images.unsplash.com/photo-1628001275493-56d109f0bc45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM5NjQ4ODV8&ixlib=rb-4.0.3&q=80&w=1080',
				small:
					'https://images.unsplash.com/photo-1628001275493-56d109f0bc45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM5NjQ4ODV8&ixlib=rb-4.0.3&q=80&w=400',
				thumb:
					'https://images.unsplash.com/photo-1628001275493-56d109f0bc45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM5NjQ4ODV8&ixlib=rb-4.0.3&q=80&w=200',
			},
			links: {
				self: 'https://api.unsplash.com/photos/49fnhuJBHH8',
				html: 'https://unsplash.com/photos/49fnhuJBHH8',
				download:
					'https://unsplash.com/photos/49fnhuJBHH8/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM5NjQ4ODV8',
				download_location:
					'https://api.unsplash.com/photos/49fnhuJBHH8/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM5NjQ4ODV8',
			},
			likes: 153,
			liked_by_user: false,
			current_user_collections: [],
			sponsorship: null,
			topic_submissions: {
				monochromatic: {
					status: 'approved',
					approved_on: '2023-09-05T10:18:16Z',
				},
				'fill-the-frame': {
					status: 'approved',
					approved_on: '2021-08-04T07:06:32Z',
				},
			},
			user: {
				id: 'IFcEhJqem0Q',
				updated_at: '2023-09-05T19:50:14Z',
				username: 'anniespratt',
				name: 'Annie Spratt',
				twitter_username: 'anniespratt',
				portfolio_url: 'https://www.anniespratt.com',
				bio: 'Photographer from England, sharing my digital, film + vintage slide scans.  \r\n',
				location: 'New Forest National Park, UK',
				links: {
					self: 'https://api.unsplash.com/users/anniespratt',
					html: 'https://unsplash.com/@anniespratt',
					photos: 'https://api.unsplash.com/users/anniespratt/photos',
					likes: 'https://api.unsplash.com/users/anniespratt/likes',
					portfolio: 'https://api.unsplash.com/users/anniespratt/portfolio',
				},
				profile_image: {
					small:
						'https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
					medium:
						'https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64',
					large:
						'https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
				},
				instagram_username: 'anniespratt',
				total_collections: 44,
				total_likes: 14452,
				total_photos: 19175,
				accepted_tos: true,
				for_hire: false,
				social: {
					instagram_username: 'anniespratt',
					portfolio_url: 'https://www.anniespratt.com',
					twitter_username: 'anniespratt',
					paypal_email: null,
				},
			},
			exif: {
				make: 'RICOH IMAGING COMPANY, LTD.',
				model: 'PENTAX 645Z',
				exposure_time: '1/200',
				aperture: '8.0',
				focal_length: '120.0',
				iso: 200,
			},
			views: 500642,
			downloads: 3682,
		},
		{
			id: 'Dwu85P9dfsfSOIk',
			created_at: '2016-05-03T11:00:28-04:00',
			updated_at: '2016-07-10T11:00:01-05:00',
			width: 2448,
			height: 3264,
			color: '#6E633A',
			blur_hash: 'LFC$yHwc8^$yIAS$%M%00KxukYIp',
			downloads: 1345,
			likes: 24,
			liked_by_user: false,
			description: 'A man drinking a coffee.',
			exif: {
				make: 'Canon',
				model: 'Canon EOS 40D',
				exposure_time: '0.011111111111111112',
				aperture: '4.970854',
				focal_length: '37',
				iso: 100,
			},
			location: {
				name: 'Montreal, Canada',
				city: 'Montreal',
				country: 'Canada',
				position: {
					latitude: 45.473298,
					longitude: -73.638488,
				},
			},
			current_user_collections: [
				{
					id: 206,
					title: 'Makers: Cat and Ben',
					published_at: '2016-01-12T18:16:09-05:00',
					last_collected_at: '2016-06-02T13:10:03-04:00',
					updated_at: '2016-07-10T11:00:01-05:00',
					cover_photo: null,
					user: null,
				},
			],
			urls: {
				raw: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
				full: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
				regular:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
				small:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max',
				thumb:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
			},
			links: {
				self: 'https://api.unsplash.com/photos/Dwu85P9SOIk',
				html: 'https://unsplash.com/photos/Dwu85P9SOIk',
				download: 'https://unsplash.com/photos/Dwu85P9SOIk/download',
				download_location:
					'https://api.unsplash.com/photos/Dwu85P9SOIk/download',
			},
			user: {
				id: 'QPxL2MGqfrw',
				updated_at: '2016-07-10T11:00:01-05:00',
				username: 'exampleuser',
				name: 'Joe Example',
				portfolio_url: 'https://example.com/',
				bio: 'Just an everyday Joe',
				location: 'Montreal',
				total_likes: 5,
				total_photos: 10,
				total_collections: 13,
				instagram_username: 'instantgrammer',
				twitter_username: 'crew',
				links: {
					self: 'https://api.unsplash.com/users/exampleuser',
					html: 'https://unsplash.com/exampleuser',
					photos: 'https://api.unsplash.com/users/exampleuser/photos',
					likes: 'https://api.unsplash.com/users/exampleuser/likes',
					portfolio: 'https://api.unsplash.com/users/exampleuser/portfolio',
				},
			},
		},
		{
			id: 'Dwu85Pasdf9SOIk',
			created_at: '2016-05-03T11:00:28-04:00',
			updated_at: '2016-07-10T11:00:01-05:00',
			width: 2448,
			height: 3264,
			color: '#6E633A',
			blur_hash: 'LFC$yHwc8^$yIAS$%M%00KxukYIp',
			downloads: 1345,
			likes: 24,
			liked_by_user: false,
			description: 'A man drinking a coffee.',
			exif: {
				make: 'Canon',
				model: 'Canon EOS 40D',
				exposure_time: '0.011111111111111112',
				aperture: '4.970854',
				focal_length: '37',
				iso: 100,
			},
			location: {
				name: 'Montreal, Canada',
				city: 'Montreal',
				country: 'Canada',
				position: {
					latitude: 45.473298,
					longitude: -73.638488,
				},
			},
			current_user_collections: [
				{
					id: 206,
					title: 'Makers: Cat and Ben',
					published_at: '2016-01-12T18:16:09-05:00',
					last_collected_at: '2016-06-02T13:10:03-04:00',
					updated_at: '2016-07-10T11:00:01-05:00',
					cover_photo: null,
					user: null,
				},
			],
			urls: {
				raw: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
				full: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
				regular:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
				small:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max',
				thumb:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
			},
			links: {
				self: 'https://api.unsplash.com/photos/Dwu85P9SOIk',
				html: 'https://unsplash.com/photos/Dwu85P9SOIk',
				download: 'https://unsplash.com/photos/Dwu85P9SOIk/download',
				download_location:
					'https://api.unsplash.com/photos/Dwu85P9SOIk/download',
			},
			user: {
				id: 'QPxL2MGqfrw',
				updated_at: '2016-07-10T11:00:01-05:00',
				username: 'exampleuser',
				name: 'Joe Example',
				portfolio_url: 'https://example.com/',
				bio: 'Just an everyday Joe',
				location: 'Montreal',
				total_likes: 5,
				total_photos: 10,
				total_collections: 13,
				instagram_username: 'instantgrammer',
				twitter_username: 'crew',
				links: {
					self: 'https://api.unsplash.com/users/exampleuser',
					html: 'https://unsplash.com/exampleuser',
					photos: 'https://api.unsplash.com/users/exampleuser/photos',
					likes: 'https://api.unsplash.com/users/exampleuser/likes',
					portfolio: 'https://api.unsplash.com/users/exampleuser/portfolio',
				},
			},
		},
		{
			id: 'Dwu8sdf5P9SOIk',
			created_at: '2016-05-03T11:00:28-04:00',
			updated_at: '2016-07-10T11:00:01-05:00',
			width: 2448,
			height: 3264,
			color: '#6E633A',
			blur_hash: 'LFC$yHwc8^$yIAS$%M%00KxukYIp',
			downloads: 1345,
			likes: 24,
			liked_by_user: false,
			description: 'A man drinking a coffee.',
			exif: {
				make: 'Canon',
				model: 'Canon EOS 40D',
				exposure_time: '0.011111111111111112',
				aperture: '4.970854',
				focal_length: '37',
				iso: 100,
			},
			location: {
				name: 'Montreal, Canada',
				city: 'Montreal',
				country: 'Canada',
				position: {
					latitude: 45.473298,
					longitude: -73.638488,
				},
			},
			current_user_collections: [
				{
					id: 206,
					title: 'Makers: Cat and Ben',
					published_at: '2016-01-12T18:16:09-05:00',
					last_collected_at: '2016-06-02T13:10:03-04:00',
					updated_at: '2016-07-10T11:00:01-05:00',
					cover_photo: null,
					user: null,
				},
			],
			urls: {
				raw: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
				full: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
				regular:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
				small:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max',
				thumb:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
			},
			links: {
				self: 'https://api.unsplash.com/photos/Dwu85P9SOIk',
				html: 'https://unsplash.com/photos/Dwu85P9SOIk',
				download: 'https://unsplash.com/photos/Dwu85P9SOIk/download',
				download_location:
					'https://api.unsplash.com/photos/Dwu85P9SOIk/download',
			},
			user: {
				id: 'QPxL2MGqfrw',
				updated_at: '2016-07-10T11:00:01-05:00',
				username: 'exampleuser',
				name: 'Joe Example',
				portfolio_url: 'https://example.com/',
				bio: 'Just an everyday Joe',
				location: 'Montreal',
				total_likes: 5,
				total_photos: 10,
				total_collections: 13,
				instagram_username: 'instantgrammer',
				twitter_username: 'crew',
				links: {
					self: 'https://api.unsplash.com/users/exampleuser',
					html: 'https://unsplash.com/exampleuser',
					photos: 'https://api.unsplash.com/users/exampleuser/photos',
					likes: 'https://api.unsplash.com/users/exampleuser/likes',
					portfolio: 'https://api.unsplash.com/users/exampleuser/portfolio',
				},
			},
		},
		{
			id: 'Dwu85asdfasP9SOIk',
			created_at: '2016-05-03T11:00:28-04:00',
			updated_at: '2016-07-10T11:00:01-05:00',
			width: 2448,
			height: 3264,
			color: '#6E633A',
			blur_hash: 'LFC$yHwc8^$yIAS$%M%00KxukYIp',
			downloads: 1345,
			likes: 24,
			liked_by_user: false,
			description: 'A man drinking a coffee.',
			exif: {
				make: 'Canon',
				model: 'Canon EOS 40D',
				exposure_time: '0.011111111111111112',
				aperture: '4.970854',
				focal_length: '37',
				iso: 100,
			},
			location: {
				name: 'Montreal, Canada',
				city: 'Montreal',
				country: 'Canada',
				position: {
					latitude: 45.473298,
					longitude: -73.638488,
				},
			},
			current_user_collections: [
				{
					id: 206,
					title: 'Makers: Cat and Ben',
					published_at: '2016-01-12T18:16:09-05:00',
					last_collected_at: '2016-06-02T13:10:03-04:00',
					updated_at: '2016-07-10T11:00:01-05:00',
					cover_photo: null,
					user: null,
				},
			],
			urls: {
				raw: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
				full: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
				regular:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
				small:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max',
				thumb:
					'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
			},
			links: {
				self: 'https://api.unsplash.com/photos/Dwu85P9SOIk',
				html: 'https://unsplash.com/photos/Dwu85P9SOIk',
				download: 'https://unsplash.com/photos/Dwu85P9SOIk/download',
				download_location:
					'https://api.unsplash.com/photos/Dwu85P9SOIk/download',
			},
			user: {
				id: 'QPxL2MGqfrw',
				updated_at: '2016-07-10T11:00:01-05:00',
				username: 'exampleuser',
				name: 'Joe Example',
				portfolio_url: 'https://example.com/',
				bio: 'Just an everyday Joe',
				location: 'Montreal',
				total_likes: 5,
				total_photos: 10,
				total_collections: 13,
				instagram_username: 'instantgrammer',
				twitter_username: 'crew',
				links: {
					self: 'https://api.unsplash.com/users/exampleuser',
					html: 'https://unsplash.com/exampleuser',
					photos: 'https://api.unsplash.com/users/exampleuser/photos',
					likes: 'https://api.unsplash.com/users/exampleuser/likes',
					portfolio: 'https://api.unsplash.com/users/exampleuser/portfolio',
				},
			},
		},
	],
}

function SearchResults({ formData }: { formData: Payload }) {
	const [images, setImages] = useState<Photo[] | null>(fakeData.data)
	const [exports, setExports] = useState<Photo[]>([])

	useEffect(() => {
		console.log('fetching...')
		async function fetchData() {
			axios({
				method: 'get',
				url: process.env.REACT_APP_UNSPLASH_BASE_URL + '/photos/random',
				headers: {
					Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
				},
				params: formData,
			}).then(
				res => {
					console.log(res)
					setImages(res.data)
				},
				error => {
					console.error(error)
				}
			)
		}

		// return console.log('cleanup')
		// fetchData()
	}, [formData])

	function collectExports(e: any, img: Photo) {
		// If not checked, remove from exports
		if (!e.target.checked) {
			setExports(oldExports => oldExports.filter(image => img !== image))
		} else {
			// Otherwise, add to exports
			setExports([...exports, img])
		}
	}

	// Exporting

	const downloadImage = async (e: any) => {
		e.preventDefault()

		const link = exports[0].links.download_location
		// Fetch the image and parse the response stream as a blob
		// const imageBlob = await fetch(link).then(response => response.blob())
		// async function fetchData(z) {

		let downloadUrl = ''
		await axios({
			method: 'get',
			url: link,
			headers: {
				Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
			},
			params: formData,
		}).then(
			res => {
				downloadUrl = res.data.url
				console.log(res)
			},
			error => {
				console.error(error)
			}
		)

		let zip = new JSZip()
		let folder = zip.folder('images')

		// TODO: exports.foreeeach this  function

		folder?.file(exports[0]?.slug + '.jpg', downloadUrl)

		zip.generateAsync({ type: 'base64' }).then(function (content) {
			// see FileSaver.js
			saveAs(content, 'example.zip')
		})

		// saveAs(downloadUrl, 'image.jpg')
	}

	return (
		<>
			<span>{exports.map(img => img.id)}</span>

			<form onSubmit={e => downloadImage(e)}>
				<div className='export'>
					<button type='submit' className='export-button button'>
						EXPORT {exports.length} PHOTOS
					</button>
				</div>

				<div className='images'>
					{images?.map(function (img) {
						return (
							<div key={img.id}>
								<label className='image-label'>
									<input
										className='image-input'
										value={img.id}
										type='checkbox'
										name={img.id}
										onClick={e => collectExports(e, img)}
									/>
									<img
										className='image'
										src={img.urls.thumb}
										alt={img.alt_description || img.description}
									/>
								</label>

								<div className='credits'>
									photo by{' '}
									<a
										className='credits__link'
										href={
											img.user.portfolio_url +
											'?utm_source=collager&utm_medium=referral'
										}>
										{img.user.name}
									</a>{' '}
									on{' '}
									<a
										className='credits__link'
										href='https://unsplash.com?utm_source=collager&utm_medium=referral'>
										Unsplash
									</a>
									<div>
										<a
											className='credits__link'
											href={
												img.urls.raw +
												'?utm_source=collager&utm_medium=referral'
											}>
											source
										</a>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</form>
		</>
	)
}

export default SearchResults
