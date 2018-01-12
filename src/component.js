import {Component} from "ink" // eslint-disable-line no-unused-vars
import SelectInput from "ink-select-input"
import TextInput from "ink-text-input"
import PropTypes from "prop-types"

class CLI extends Component {

	propTypes = {
		single: PropTypes.bool.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			query: '',
			single: props.single,
		}

		this.handleChangeQuery = this.handleChangeQuery.bind(this)
	}

	handleChangeQuery(value) {
		this.setState({
			query: value,
		})
		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			const {
				handleChangeQuery,
			} = this.props
			handleChangeQuery(value)
		}, 500)

	}

	parseData(data = []) {
		return data.map((item) => {
			return {
				label: `${item.artists[0].name} - ${item.name}`,
				value: item,
			}
		})
	}

	render(props) {
		return (
			<div>
				{
					!this.state.single &&
					<div>
						<div>
							<TextInput
								value={this.state.query}
								onChange={this.handleChangeQuery}
							/>
						</div>
						<SelectInput items={this.parseData(props.search)} onSelect={props.handleSelect}/>
					</div>
				}
			</div>
		)
	}
}

export default CLI
