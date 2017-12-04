import CounterContainer from "./container"
import {h, render} from "ink" // eslint-disable-line no-unused-vars
import {Provider} from "ink-redux"
import store from "./store"

render((
	<Provider store={store}>
		<CounterContainer/>
	</Provider>
))


