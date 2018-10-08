const playTask = {
  info: `Play`,
  value: ``,
  task: (value, store) => {
    store.dispatch({
      type: 'SINGLE_FETCH_REQUESTED',
      query: value,
    })
  },
}
export default playTask;
