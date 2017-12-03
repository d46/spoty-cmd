import got from 'got';

const play = (item, token) => {
	return got('https://api.spotify.com/v1/me/player/play', {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: token
		},
		method: 'PUT',
		body: JSON.stringify({
			"context_uri": item.album.uri,
			"offset": {
				"position": Number(item.track_number - 1)
			}
		})
	})
};

export default {
	play
}
