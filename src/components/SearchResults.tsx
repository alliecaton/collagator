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
			id: 'Foo5cbMCwpg',
			slug: 'a-man-riding-skis-down-a-snow-covered-slope-Foo5cbMCwpg',
			created_at: '2023-08-02T14:05:23Z',
			updated_at: '2023-09-06T14:41:04Z',
			promoted_at: '2023-08-18T15:00:01Z',
			width: 6240,
			height: 4160,
			color: '#f3f3d9',
			blur_hash: 'L6QmFu~pw0-;%MayRkj[?at7IURj',
			description: null,
			alt_description: 'a man riding skis down a snow covered slope',
			breadcrumbs: [],
			urls: {
				raw: 'https://images.unsplash.com/photo-1690984806741-451b34409f17?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3',
				full: 'https://images.unsplash.com/photo-1690984806741-451b34409f17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=85',
				regular:
					'https://images.unsplash.com/photo-1690984806741-451b34409f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=1080',
				small:
					'https://images.unsplash.com/photo-1690984806741-451b34409f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=400',
				thumb:
					'https://images.unsplash.com/photo-1690984806741-451b34409f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=200',
				small_s3:
					'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1690984806741-451b34409f17',
			},
			links: {
				self: 'https://api.unsplash.com/photos/a-man-riding-skis-down-a-snow-covered-slope-Foo5cbMCwpg',
				html: 'https://unsplash.com/photos/a-man-riding-skis-down-a-snow-covered-slope-Foo5cbMCwpg',
				download:
					'https://unsplash.com/photos/Foo5cbMCwpg/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
				download_location:
					'https://api.unsplash.com/photos/Foo5cbMCwpg/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
			},
			likes: 12,
			liked_by_user: false,
			current_user_collections: [],
			sponsorship: null,
			topic_submissions: {},
			user: {
				id: 'HBKtNiATif8',
				updated_at: '2023-09-07T00:36:19Z',
				username: 'ling_gigi',
				name: 'Gigi',
				first_name: 'Gigi',
				last_name: null,
				twitter_username: null,
				portfolio_url: 'https://linggigi.wixsite.com/photography',
				bio: 'Sharing bits of the world ',
				location: 'Singapore',
				links: {
					self: 'https://api.unsplash.com/users/ling_gigi',
					html: 'https://unsplash.com/@ling_gigi',
					photos: 'https://api.unsplash.com/users/ling_gigi/photos',
					likes: 'https://api.unsplash.com/users/ling_gigi/likes',
					portfolio: 'https://api.unsplash.com/users/ling_gigi/portfolio',
					following: 'https://api.unsplash.com/users/ling_gigi/following',
					followers: 'https://api.unsplash.com/users/ling_gigi/followers',
				},
				profile_image: {
					small:
						'https://images.unsplash.com/profile-1554289545797-5ae17e0f3109?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
					medium:
						'https://images.unsplash.com/profile-1554289545797-5ae17e0f3109?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64',
					large:
						'https://images.unsplash.com/profile-1554289545797-5ae17e0f3109?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
				},
				instagram_username: 'ling_gigi',
				total_collections: 11,
				total_likes: 110,
				total_photos: 183,
				accepted_tos: true,
				for_hire: false,
				social: {
					instagram_username: 'ling_gigi',
					portfolio_url: 'https://linggigi.wixsite.com/photography',
					twitter_username: null,
					paypal_email: null,
				},
			},
			exif: {
				make: 'Canon',
				model: ' EOS RP',
				name: 'Canon, EOS RP',
				exposure_time: '1/4000',
				aperture: '14',
				focal_length: '105.0',
				iso: 1600,
			},
			location: {
				name: 'Corvatsch, Sils im Engadin/Segl, Switzerland',
				city: 'Sils im Engadin/Segl',
				country: 'Switzerland',
				position: {
					latitude: 46.408347,
					longitude: 9.816083,
				},
			},
			views: 255863,
			downloads: 5423,
		},
		{
			id: 'm3dnHi0ueh0',
			slug: 'a-white-plate-topped-with-food-next-to-a-knife-and-fork-m3dnHi0ueh0',
			created_at: '2023-08-05T01:47:33Z',
			updated_at: '2023-09-06T19:40:09Z',
			promoted_at: '2023-08-07T13:16:01Z',
			width: 1937,
			height: 2584,
			color: '#d9d9d9',
			blur_hash: 'LLNK3C0dyYaH9WbWNFD$yXr;MctS',
			description:
				'Basil halloumi sweet potato toasts on a white ceramic plate with vintage flatware',
			alt_description:
				'a white plate topped with food next to a knife and fork',
			breadcrumbs: [],
			urls: {
				raw: 'https://images.unsplash.com/photo-1691200007743-0652bbbc1d7d?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3',
				full: 'https://images.unsplash.com/photo-1691200007743-0652bbbc1d7d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=85',
				regular:
					'https://images.unsplash.com/photo-1691200007743-0652bbbc1d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=1080',
				small:
					'https://images.unsplash.com/photo-1691200007743-0652bbbc1d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=400',
				thumb:
					'https://images.unsplash.com/photo-1691200007743-0652bbbc1d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=200',
				small_s3:
					'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1691200007743-0652bbbc1d7d',
			},
			links: {
				self: 'https://api.unsplash.com/photos/a-white-plate-topped-with-food-next-to-a-knife-and-fork-m3dnHi0ueh0',
				html: 'https://unsplash.com/photos/a-white-plate-topped-with-food-next-to-a-knife-and-fork-m3dnHi0ueh0',
				download:
					'https://unsplash.com/photos/m3dnHi0ueh0/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
				download_location:
					'https://api.unsplash.com/photos/m3dnHi0ueh0/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
			},
			likes: 19,
			liked_by_user: false,
			current_user_collections: [],
			sponsorship: null,
			topic_submissions: {},
			user: {
				id: 'nnC22AXZX7c',
				updated_at: '2023-09-01T00:38:05Z',
				username: 'sheri_silver',
				name: 'sheri silver',
				first_name: 'sheri',
				last_name: 'silver',
				twitter_username: 'sheri_silver',
				portfolio_url: 'http://www.sherisilver.com',
				bio: 'Mom of 3. Lover of doughnuts. Striving to channel my inner Nancy Botwin.',
				location: 'New York',
				links: {
					self: 'https://api.unsplash.com/users/sheri_silver',
					html: 'https://unsplash.com/@sheri_silver',
					photos: 'https://api.unsplash.com/users/sheri_silver/photos',
					likes: 'https://api.unsplash.com/users/sheri_silver/likes',
					portfolio: 'https://api.unsplash.com/users/sheri_silver/portfolio',
					following: 'https://api.unsplash.com/users/sheri_silver/following',
					followers: 'https://api.unsplash.com/users/sheri_silver/followers',
				},
				profile_image: {
					small:
						'https://images.unsplash.com/profile-1514909949836-6bc6acaa95d8?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
					medium:
						'https://images.unsplash.com/profile-1514909949836-6bc6acaa95d8?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64',
					large:
						'https://images.unsplash.com/profile-1514909949836-6bc6acaa95d8?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
				},
				instagram_username: 'sherisilver',
				total_collections: 0,
				total_likes: 0,
				total_photos: 97,
				accepted_tos: true,
				for_hire: true,
				social: {
					instagram_username: 'sherisilver',
					portfolio_url: 'http://www.sherisilver.com',
					twitter_username: 'sheri_silver',
					paypal_email: null,
				},
			},
			exif: {
				make: null,
				model: null,
				name: null,
				exposure_time: null,
				aperture: null,
				focal_length: null,
				iso: null,
			},
			location: {
				name: null,
				city: null,
				country: null,
				position: {
					latitude: 0,
					longitude: 0,
				},
			},
			views: 516320,
			downloads: 3182,
		},
		{
			id: 'mB4ud4isCII',
			slug: 'a-narrow-narrow-passage-between-two-large-rocks-mB4ud4isCII',
			created_at: '2023-08-11T20:10:47Z',
			updated_at: '2023-09-06T20:39:20Z',
			promoted_at: '2023-08-15T11:56:01Z',
			width: 5157,
			height: 7736,
			color: '#260c0c',
			blur_hash: 'LG7,lXj[0zjZn$jsW;WXEMjt-UWX',
			description: null,
			alt_description: 'a narrow narrow passage between two large rocks',
			breadcrumbs: [],
			urls: {
				raw: 'https://images.unsplash.com/photo-1691783655466-95a4cd07e56c?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3',
				full: 'https://images.unsplash.com/photo-1691783655466-95a4cd07e56c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=85',
				regular:
					'https://images.unsplash.com/photo-1691783655466-95a4cd07e56c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=1080',
				small:
					'https://images.unsplash.com/photo-1691783655466-95a4cd07e56c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=400',
				thumb:
					'https://images.unsplash.com/photo-1691783655466-95a4cd07e56c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=200',
				small_s3:
					'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1691783655466-95a4cd07e56c',
			},
			links: {
				self: 'https://api.unsplash.com/photos/a-narrow-narrow-passage-between-two-large-rocks-mB4ud4isCII',
				html: 'https://unsplash.com/photos/a-narrow-narrow-passage-between-two-large-rocks-mB4ud4isCII',
				download:
					'https://unsplash.com/photos/mB4ud4isCII/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
				download_location:
					'https://api.unsplash.com/photos/mB4ud4isCII/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
			},
			likes: 288,
			liked_by_user: false,
			current_user_collections: [],
			sponsorship: null,
			topic_submissions: {
				'architecture-interior': {
					status: 'rejected',
				},
				travel: {
					status: 'approved',
					approved_on: '2023-08-13T19:48:08Z',
				},
				wallpapers: {
					status: 'approved',
					approved_on: '2023-08-13T19:29:23Z',
				},
				'arts-culture': {
					status: 'approved',
					approved_on: '2023-08-13T19:53:31Z',
				},
			},
			user: {
				id: 'v2RF4SeIUts',
				updated_at: '2023-09-06T14:23:39Z',
				username: 'limamauro23',
				name: 'Mauro Lima',
				first_name: 'Mauro',
				last_name: 'Lima',
				twitter_username: null,
				portfolio_url: 'https://www.instagram.com/limamauro23/',
				bio: null,
				location: 'Rio de Janeiro, Brazil',
				links: {
					self: 'https://api.unsplash.com/users/limamauro23',
					html: 'https://unsplash.com/@limamauro23',
					photos: 'https://api.unsplash.com/users/limamauro23/photos',
					likes: 'https://api.unsplash.com/users/limamauro23/likes',
					portfolio: 'https://api.unsplash.com/users/limamauro23/portfolio',
					following: 'https://api.unsplash.com/users/limamauro23/following',
					followers: 'https://api.unsplash.com/users/limamauro23/followers',
				},
				profile_image: {
					small:
						'https://images.unsplash.com/profile-1581387326424-d34750b1c8fbimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
					medium:
						'https://images.unsplash.com/profile-1581387326424-d34750b1c8fbimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64',
					large:
						'https://images.unsplash.com/profile-1581387326424-d34750b1c8fbimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
				},
				instagram_username: 'limamauro23',
				total_collections: 3,
				total_likes: 269,
				total_photos: 706,
				accepted_tos: true,
				for_hire: false,
				social: {
					instagram_username: 'limamauro23',
					portfolio_url: 'https://www.instagram.com/limamauro23/',
					twitter_username: null,
					paypal_email: null,
				},
			},
			exif: {
				make: 'SONY',
				model: 'ILCE-7RM5',
				name: 'SONY, ILCE-7RM5',
				exposure_time: '1/250',
				aperture: '2.8',
				focal_length: '20.0',
				iso: 640,
			},
			location: {
				name: 'Petra, Jordânia',
				city: 'Wadi Musa',
				country: 'Jordânia',
				position: {
					latitude: 30.321635,
					longitude: 35.480125,
				},
			},
			views: 1141690,
			downloads: 9736,
		},
		{
			id: '2tdvbMPEsZI',
			slug: 'a-large-orange-flower-surrounded-by-green-leaves-2tdvbMPEsZI',
			created_at: '2023-08-27T19:40:14Z',
			updated_at: '2023-09-06T14:41:36Z',
			promoted_at: '2023-08-29T16:48:01Z',
			width: 3648,
			height: 5472,
			color: '#400c0c',
			blur_hash: 'L9CYKz[pGZ$jD@={^P-oG=^j}Dx[',
			description: null,
			alt_description: 'a large orange flower surrounded by green leaves',
			breadcrumbs: [],
			urls: {
				raw: 'https://images.unsplash.com/photo-1693165075114-e203e2b8a025?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3',
				full: 'https://images.unsplash.com/photo-1693165075114-e203e2b8a025?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=85',
				regular:
					'https://images.unsplash.com/photo-1693165075114-e203e2b8a025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=1080',
				small:
					'https://images.unsplash.com/photo-1693165075114-e203e2b8a025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=400',
				thumb:
					'https://images.unsplash.com/photo-1693165075114-e203e2b8a025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=200',
				small_s3:
					'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1693165075114-e203e2b8a025',
			},
			links: {
				self: 'https://api.unsplash.com/photos/a-large-orange-flower-surrounded-by-green-leaves-2tdvbMPEsZI',
				html: 'https://unsplash.com/photos/a-large-orange-flower-surrounded-by-green-leaves-2tdvbMPEsZI',
				download:
					'https://unsplash.com/photos/2tdvbMPEsZI/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
				download_location:
					'https://api.unsplash.com/photos/2tdvbMPEsZI/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
			},
			likes: 70,
			liked_by_user: false,
			current_user_collections: [],
			sponsorship: null,
			topic_submissions: {
				wallpapers: {
					status: 'rejected',
				},
			},
			user: {
				id: 'CpBDVgrthTM',
				updated_at: '2023-09-06T14:09:29Z',
				username: 'ninjason',
				name: 'Jason Leung',
				first_name: 'Jason',
				last_name: 'Leung',
				twitter_username: null,
				portfolio_url: 'https://jasonleung.co',
				bio: 'Shooting with Canon R5/R6.\r\nThis is my way of giving back,  keep up with what I photograph on Instagram @xninjason',
				location: 'Bay Area, California',
				links: {
					self: 'https://api.unsplash.com/users/ninjason',
					html: 'https://unsplash.com/@ninjason',
					photos: 'https://api.unsplash.com/users/ninjason/photos',
					likes: 'https://api.unsplash.com/users/ninjason/likes',
					portfolio: 'https://api.unsplash.com/users/ninjason/portfolio',
					following: 'https://api.unsplash.com/users/ninjason/following',
					followers: 'https://api.unsplash.com/users/ninjason/followers',
				},
				profile_image: {
					small:
						'https://images.unsplash.com/profile-1574623311321-015452cd1304image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
					medium:
						'https://images.unsplash.com/profile-1574623311321-015452cd1304image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64',
					large:
						'https://images.unsplash.com/profile-1574623311321-015452cd1304image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
				},
				instagram_username: 'xninjason',
				total_collections: 3,
				total_likes: 0,
				total_photos: 6805,
				accepted_tos: true,
				for_hire: true,
				social: {
					instagram_username: 'xninjason',
					portfolio_url: 'https://jasonleung.co',
					twitter_username: null,
					paypal_email: null,
				},
			},
			exif: {
				make: 'Canon',
				model: ' EOS R6',
				name: 'Canon, EOS R6',
				exposure_time: '1/250',
				aperture: '6.3',
				focal_length: '90.0',
				iso: 12800,
			},
			location: {
				name: null,
				city: null,
				country: null,
				position: {
					latitude: 0,
					longitude: 0,
				},
			},
			views: 210263,
			downloads: 2231,
		},
		{
			id: '95UosrAD2L4',
			slug: 'an-aerial-view-of-a-city-at-night-95UosrAD2L4',
			created_at: '2023-08-29T05:21:43Z',
			updated_at: '2023-09-06T10:41:25Z',
			promoted_at: '2023-09-04T16:40:02Z',
			width: 3519,
			height: 5279,
			color: '#262626',
			blur_hash: 'L58zoe0L%g$$-pRij?jFI:%Mrr%M',
			description: null,
			alt_description: 'an aerial view of a city at night',
			breadcrumbs: [],
			urls: {
				raw: 'https://images.unsplash.com/photo-1693286206828-abf6e3fbec75?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3',
				full: 'https://images.unsplash.com/photo-1693286206828-abf6e3fbec75?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=85',
				regular:
					'https://images.unsplash.com/photo-1693286206828-abf6e3fbec75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=1080',
				small:
					'https://images.unsplash.com/photo-1693286206828-abf6e3fbec75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=400',
				thumb:
					'https://images.unsplash.com/photo-1693286206828-abf6e3fbec75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8&ixlib=rb-4.0.3&q=80&w=200',
				small_s3:
					'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1693286206828-abf6e3fbec75',
			},
			links: {
				self: 'https://api.unsplash.com/photos/an-aerial-view-of-a-city-at-night-95UosrAD2L4',
				html: 'https://unsplash.com/photos/an-aerial-view-of-a-city-at-night-95UosrAD2L4',
				download:
					'https://unsplash.com/photos/95UosrAD2L4/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
				download_location:
					'https://api.unsplash.com/photos/95UosrAD2L4/download?ixid=M3w0ODk1NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQwNDcxMzF8',
			},
			likes: 142,
			liked_by_user: false,
			current_user_collections: [],
			sponsorship: null,
			topic_submissions: {
				'street-photography': {
					status: 'approved',
					approved_on: '2023-09-04T14:33:46Z',
				},
				'arts-culture': {
					status: 'rejected',
				},
				'architecture-interior': {
					status: 'rejected',
				},
				wallpapers: {
					status: 'approved',
					approved_on: '2023-09-01T10:14:05Z',
				},
				'textures-patterns': {
					status: 'rejected',
				},
				travel: {
					status: 'approved',
					approved_on: '2023-09-01T18:51:29Z',
				},
			},
			user: {
				id: '4K2ZgDN4-Bg',
				updated_at: '2023-09-06T21:54:01Z',
				username: 'justzht',
				name: 'Haotian Zheng',
				first_name: 'Haotian',
				last_name: 'Zheng',
				twitter_username: 'JustZht',
				portfolio_url: 'https://haotianzheng.com/',
				bio: 'Also known as JustZht / Justin Fincher. \r\nSoftware engineer by weekdays, amateur photographer by weekends.',
				location: 'Sunnyvale, CA, USA',
				links: {
					self: 'https://api.unsplash.com/users/justzht',
					html: 'https://unsplash.com/@justzht',
					photos: 'https://api.unsplash.com/users/justzht/photos',
					likes: 'https://api.unsplash.com/users/justzht/likes',
					portfolio: 'https://api.unsplash.com/users/justzht/portfolio',
					following: 'https://api.unsplash.com/users/justzht/following',
					followers: 'https://api.unsplash.com/users/justzht/followers',
				},
				profile_image: {
					small:
						'https://images.unsplash.com/profile-1638043028119-7d8bde171119image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
					medium:
						'https://images.unsplash.com/profile-1638043028119-7d8bde171119image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64',
					large:
						'https://images.unsplash.com/profile-1638043028119-7d8bde171119image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
				},
				instagram_username: 'justzht',
				total_collections: 0,
				total_likes: 58,
				total_photos: 114,
				accepted_tos: true,
				for_hire: true,
				social: {
					instagram_username: 'justzht',
					portfolio_url: 'https://haotianzheng.com/',
					twitter_username: 'JustZht',
					paypal_email: null,
				},
			},
			exif: {
				make: 'Fujifilm',
				model: 'X-E4',
				name: 'Fujifilm, X-E4',
				exposure_time: '1/105',
				aperture: '1.4',
				focal_length: '35.0',
				iso: 1250,
			},
			location: {
				name: 'Edge, Hudson Yards, New York, NY, USA',
				city: 'New York',
				country: 'United States',
				position: {
					latitude: 40.754124,
					longitude: -74.000974,
				},
			},
			views: 395157,
			downloads: 3363,
		},
	],
}

function SearchResults({ formData }: { formData: Payload }) {
	const [images, setImages] = useState<Photo[] | null>(fakeData.data)
	// const [images, setImages] = useState<Photo[] | null>([])
	const [exports, setExports] = useState<Photo[]>([])

	useEffect(() => {
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
					setImages(res.data)
				},
				error => {
					console.error(error)
				}
			)
		}

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

		let zip = new JSZip()
		let folder = zip.folder('images')

		// Loop through exports and request the download url for each
		// Not ideal, but unsplash does not support bulk downloading
		for (let img of exports) {
			let link = img.links.download_location

			let downloadUrl = ''
			await axios({
				method: 'get',
				url: link,
				headers: {
					Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
				},
			}).then(
				res => {
					downloadUrl = res.data.url
				},
				error => {
					console.error(error)
				}
			)

			// Fetch the image and parse the response stream as a blob
			const imageBlob = await fetch(downloadUrl).then(response =>
				response.blob()
			)

			// Create a new file from the blob object
			const imageFile = new File([imageBlob], 'filename.jpg')

			folder?.file(img.slug + '.jpg', imageFile)
		}

		// Create zip with all files
		zip
			.generateAsync({ type: 'blob' })
			.then(content => saveAs(content, 'files'))
	}

	return (
		<>
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
