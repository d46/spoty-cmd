import CounterContainer from "./container"
import {h, render} from "ink" // eslint-disable-line no-unused-vars
import {Provider} from "ink-redux"
import store from "./store"
import { hasInitialTask, argumentParser } from "./argument-parser";

// Check client auth
store.dispatch({
	type: 'ME_FETCH_REQUESTED',
})

// Check for initial argument
if( hasInitialTask ) {
	const tasks = argumentParser()
	
	store.dispatch({
		type: 'SINGLE_FETCH_REQUESTED',
		query: value,
	})
}

render((
	<Provider store={store}>
		<CounterContainer/>
	</Provider>
))


