import {call, put, takeLatest} from "redux-saga/effects"

const fetchSearchApi = (query) => {
	return got(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
		headers: {
			Accept: "application/json",
			Authorization: "Bearer BQC5lEcYu4qsO0W8InnPiMUzzhzLb0iXbOPRnDdPwyVNdNxeAyZvwBQXaY_tjgA21KaR0QbXmbkuT1kxHLJhXvDM_mDi4EN_84JKaKDQgVDLWvxY_5hGWr6DSqYpUn8i7m7XR0seoWpepaww982VeXlXpRaaD01Kr1Q"
		},
	})
};

const fetchSelectApi = (item) => {
	return got('https://api.spotify.com/v1/me/player/play', {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer BQC5lEcYu4qsO0W8InnPiMUzzhzLb0iXbOPRnDdPwyVNdNxeAyZvwBQXaY_tjgA21KaR0QbXmbkuT1kxHLJhXvDM_mDi4EN_84JKaKDQgVDLWvxY_5hGWr6DSqYpUn8i7m7XR0seoWpepaww982VeXlXpRaaD01Kr1Q"
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

function* fetchSearch(action) {

	try {
		const payload = yield call(fetchSearchApi, action.query);
		const search = JSON.parse(payload.body);
		yield put({type: "SEARCH_FETCH_SUCCEEDED", search: search.tracks.items});
	} catch (e) {
		yield put({type: "SEARCH_FETCH_FAILED", message: e.message});
	}
}

function* fetchSelect(action) {
	try {
		const payload = yield call(fetchSelectApi, action.item);
		const status = payload.statusCode;
		yield put({type: "SELECT_FETCH_SUCCEEDED", status: status});
	} catch (e) {
		yield put({type: "SELECT_FETCH_FAILED", message: e.message})
	}
}

export default function* () {
	yield takeLatest("SEARCH_FETCH_REQUESTED", fetchSearch);
	yield takeLatest("SELECT_FETCH_REQUESTED", fetchSelect);
}
