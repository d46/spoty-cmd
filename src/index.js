import CounterContainer from "./container"
import {h, render} from "ink" // eslint-disable-line no-unused-vars
import {Provider} from "ink-redux"
import store from "./store"


// Check client auth
store.dispatch({
	type: 'ME_FETCH_REQUESTED',
})

// Parse arguments
if(args.length > 2) {
	const value = args.slice(2).join(" ")
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


