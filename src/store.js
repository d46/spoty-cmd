import createSagaMiddleware from "redux-saga"
import {createStore, applyMiddleware} from "redux"
import AllSagas from "./sagas"
import reducers from "./reducers";

const sagaMiddleware = createSagaMiddleware()
const initialData = {
	query: '',
	search: [{
		artists: [
			{
				name: "Type to search",
			}
		],
		name: " track !"
	}]
};

const store = createStore(reducers, initialData , applyMiddleware(sagaMiddleware));

sagaMiddleware.run(AllSagas);
store.dispatch({
	type: 'ME_FETCH_REQUESTED'
});
if(process.argv.length > 2) {
	const value = process.argv.slice(2).join(" ");
	store.dispatch({
		type: 'SINGLE_FETCH_REQUESTED',
		query: value
	});
}
export default store;
