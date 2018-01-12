const args = process.argv

const subTasks = [
	{
		info: `Set volume`,
		value: `-v`,
		task: (value, store) => {

		},
	},
	{
		info: `Likes`,
		value: `-l`,
		task: (value, store) => {

		},
	},
	{
		info: `Playlist`,
		value: `-p`,
		task: (value, store) => {

		},
	},
	{
		info: `Play`,
		value: ``,
		task: (value, store) => {
			store.dispatch({
				type: 'SINGLE_FETCH_REQUESTED',
				query: args.join(" "),
			})
		},
	},
]
const analyzArgument = (store) => {
	// Parse args
	const args = args.slice(2)
	// Check args has reserved keys
	subTasks.forEach(task => {
		if(task.value.indexOf(args[0]) > -1) {
			task.task(args.slice(1).join(" "), store)
		}
	})
}

export default analyzArgument
