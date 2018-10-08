import SubTasks from './tasks';

export const hasInitialTask = process.argv.length > 2

export const getTasks = () => {
	// Parse args
	const args = process.argv.slice(2);
	// Collect reserved keys
	const tasks = SubTasks.filter(task => task.value.indexOf(args[0]) > -1);
	const input = args.slice(1).join(" ");
	return {
		tasks,
		input
	}
}
