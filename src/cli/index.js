import CounterContainer from "./container"
import {h,Component,render} from "ink"
import {Provider} from "ink-redux"
import store from "./store"

render((
	<Provider store={store}>
		<CounterContainer/>
	</Provider>
));


