import axios from "axios"

// export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'

// export const geoApiOptions = {
// 	method: 'GET',
//   // url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
// 	headers: {
// 		'X-RapidAPI-Key': 'f250328eaamsh74cbb8c73c1b751p116c59jsn742ea2dfad13',
// 		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
// 	}
// };

const Q_WEATHER_KEY = '3fdbd4e6a48e4fff9b9ecbe05fde26bd'

const Q_WEATHER_HOST = 'https://geoapi.qweather.com/v2'

export const api = function(method, url, params) {
	return new Promise((resolve, reject) => {
		params.key = Q_WEATHER_KEY
		params.lang = 'en'

		axios({
			url: `${Q_WEATHER_HOST}${url}`,
			method: method,
			params: method === 'get' ? params : undefined,
			data: method !== 'get' ? params : undefined,
		})
		.then((response) => resolve(response.data))
		.catch((err) => {
			console.log('fetch data error', err)
		})
	})
}

const apis = {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args)
}

export default apis