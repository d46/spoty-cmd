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
}
const store = createStore(reducers, initialData , applyMiddleware(sagaMiddleware));

sagaMiddleware.run(AllSagas);
export default store;
