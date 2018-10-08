export const hasInitialTask = process.argv.length > 2

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
				query: value.join(" "),
			})
		},
	},
]

export const getTasks = () => {
	// Parse args
	const args = process.argv.slice(2);
	// Collect reserved keys
	const tasks = subTasks.filter(task => task.value.indexOf(args[0]) > -1);
	const input = args.slice(1).join(" ");
	return {
		tasks,
		input
	}
}
