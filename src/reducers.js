import auth from './auth';

const reducers =  (state, action) => {
	switch (action.type) {
		case 'ME_FETCH_SUCCEEDED':
			return state;
		case 'ME_FETCH_FAILED':
			auth();
			return state;
		case 'SEARCH_FETCH_REQUESTED':
			return {...state, ...action.query};
		case 'SEARCH_FETCH_SUCCEEDED':
			return {...state, search: action.search};
		case 'SEARCH_FETCH_FAILED':
			return state;
		default:
			return state;
	}
}

export default reducers
