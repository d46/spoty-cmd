import {call, put, takeLatest} from "redux-saga/effects"
import fs from 'fs';
import api from './api'

let token;

let tokenReader = ()=>{
	return new Promise((resolve, reject)=>{
		fs.readFile('./token','utf8',(err, data)=>{
			if(err) {
				reject(err)
			}
			resolve(data);
		});
	});
}

function* fetchSearch(action) {
	try {
		const payload = yield call(api.search, action.query, token);
		const search = JSON.parse(payload.body);
		yield put({type: "SEARCH_FETCH_SUCCEEDED", search: search.tracks.items});
	} catch (e) {
		yield put({type: "SEARCH_FETCH_FAILED", message: e.message});
	}
}

function* fetchSelect(action) {
	try {
		const payload = yield call(api.play, action.item, token);
		const status = payload.statusCode;
		yield put({type: "SELECT_FETCH_SUCCEEDED", status: status});
	} catch (e) {
		yield put({type: "SELECT_FETCH_FAILED", message: e.message})
	}
}

function* fetchMe() {
	try {

		token = yield tokenReader();
		const payload = yield call(api.me, token);
		const status = payload.statusCode;
		yield put({type: "ME_FETCH_SUCCEEDED", status: status});
	} catch (e) {
		yield put({type: "ME_FETCH_FAILED", message: e.message})
	}
}

function* fetchSingleSelect(action) {

	try {
		token = yield tokenReader();
		const payload = yield call(api.search, action.query, token);
		const search = JSON.parse(payload.body);

		const item = search.tracks.items[0];
		const play = yield call(api.play, item, token);
		const status = play.statusCode;
		if(status === 204 || status === 200) {
			process.exit();
		}
	} catch (e) {
		yield put({type: "SEARCH_FETCH_FAILED", message: e.message});
	}
}

export default function* () {
	yield takeLatest("SEARCH_FETCH_REQUESTED", fetchSearch);
	yield takeLatest("SELECT_FETCH_REQUESTED", fetchSelect);
	yield takeLatest("ME_FETCH_REQUESTED", fetchMe);
	yield takeLatest("SINGLE_FETCH_REQUESTED", fetchSingleSelect);
}
