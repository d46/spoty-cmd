import createSagaMiddleware from "redux-saga"
import {createStore, applyMiddleware} from "redux"
import AllSagas from "./sagas"
import reducers from "./reducers"
const args = process.argv
const sagaMiddleware = createSagaMiddleware()
const initialData = {
	query: '',
	search: [{
		artists: [
			{
				name: "Type to search",
			},
		],
		name: " track !",
	}],
	single: args.length > 2,
}

const store = createStore(reducers, initialData , applyMiddleware(sagaMiddleware))

sagaMiddleware.run(AllSagas)
store.dispatch({
	type: 'ME_FETCH_REQUESTED',
})
if(args.length > 2) {
	const value = args.slice(2).join(" ")
	store.dispatch({
		type: 'SINGLE_FETCH_REQUESTED',
		query: value,
	})
}
export default store
