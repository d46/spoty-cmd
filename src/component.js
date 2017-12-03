import {h,Component} from "ink"
import SelectInput from "ink-select-input"
import TextInput from "ink-text-input"

export default class CLI extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			single: process.argv.length < 3
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
		// process.argv.forEach(function (val, index, array) {
		// 	console.log(index + ': ' + val);
		// });
		return (
			<div>
				{
					this.state.single &&
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
		);
	}
}
