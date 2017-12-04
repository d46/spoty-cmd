import {connect} from "ink-redux"
import CLI from "./component"

const mapStateToProps = state => ({
	query: state.query,
	search: state.search,
	single: state.single,
})

const mapDispatchToProps = {
	handleChangeQuery: (query) => ({type: "SEARCH_FETCH_REQUESTED", query}),
	handleSelect: (item) => ({type: "SELECT_FETCH_REQUESTED", item: item.value}),
}


const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(CLI)

export default CounterContainer
