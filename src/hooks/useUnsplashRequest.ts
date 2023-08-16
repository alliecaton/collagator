import axios from 'axios'

export const useUnsplashRequest = ({
	method,
	url,
	data,
}: {
	method: string
	url: string
	data: object
}) => {
	axios({
		method: method,
		url: process.env.REACT_APP_UNSPLASH_BASE_URL + url,
		headers: {
			Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
		},
		data: data,
	})
}
