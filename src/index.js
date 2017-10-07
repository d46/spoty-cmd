const {h, render, Component, Text} = require('ink');
const SelectInput = require('ink-select-input');
const TextInput = require('ink-text-input');
const got = require('got');
const {Provider, connect} = require('ink-redux');
const createSagaMiddleware = require('redux-saga').default;
const {createStore, applyMiddleware} = require('redux');
const {call, put, takeLatest} = require('redux-saga/effects');

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

function* searchSaga() {
	yield takeLatest("SEARCH_FETCH_REQUESTED", fetchSearch);
	yield takeLatest("SELECT_FETCH_REQUESTED", fetchSelect);
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore((state, action) => {
	switch (action.type) {
		case 'SEARCH_FETCH_REQUESTED':
			return {...state, ...action.query};
		case 'SEARCH_FETCH_SUCCEEDED':
			return {...state, search: action.search};
		case 'SEARCH_FETCH_FAILED':
			return state;
		default:
			return state;
	}
}, {
	query: '',
	search: [{
		artists: [
			{
				name: "Type to search",

			}
		],
		name: " track !"
	}]
}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(searchSaga);

class Counter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: ''
		}

		this.handleChangeQuery = this.handleChangeQuery.bind(this);
	}

	handleChangeQuery(value) {
		this.setState({
			query: value
		});
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			const {
				handleChangeQuery
			} = this.props;
			handleChangeQuery(value);
		}, 500);

	}

	parseData(data = []) {
		return data.map((item, index) => {
			return {
				label: `${item.artists[0].name} - ${item.name}`,
				value: item
			}
		});
	}

	render(props) {
		return (
			<div>
				<div>
					<TextInput
						value={this.state.query}
						onChange={this.handleChangeQuery}
					/>
				</div>
				<SelectInput items={this.parseData(props.search)} onSelect={props.handleSelect}/>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	query: state.query,
	search: state.search
});

const mapDispatchToProps = {
	handleChangeQuery: (query) => ({type: "SEARCH_FETCH_REQUESTED", query}),
	handleSelect: (item) => ({type: "SELECT_FETCH_REQUESTED", item: item.value})
};


const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);


render((
	<Provider store={store}>
		<CounterContainer/>
	</Provider>
));
