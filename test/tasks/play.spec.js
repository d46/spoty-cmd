import test from 'ava';
import playTask from "../../src/tasks/play";

test('Task: Play', t => {
  let type;
  let query = 'Agar agar';
  playTask.task(query, {
    dispatch: ({
      type,
      query
    }) => {
      type = type;
      query = query;
    }
  });

  t.is(type, 'SINGLE_FETCH_REQUESTED');
});


