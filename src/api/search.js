import got from 'got'

const search = (query, token) => {
	return got(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
		headers: {
			Accept: "application/json",
			Authorization: token,
		},
	})
}

export default search
