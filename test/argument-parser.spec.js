import test from 'ava';
import { getTasks } from '../src/argument-parser';

test('Argument parser check has initial task', t => {
	t.is(getTasks().input, 'Agar');
});
