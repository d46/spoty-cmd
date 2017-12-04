import got from 'got'

const me = (token) => {
	return got('https://api.spotify.com/v1/me', {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: token,
		},
	})
}

export default me
