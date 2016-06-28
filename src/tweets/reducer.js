import { Action } from './actions';

const initialState = {
	isFetching: false,
	tweets: [],
	error: null,
};

const tweets = (state = initialState, action) => {
	let filters = null;

	switch (action.type) {
		case Action.FETCH:
			return {
				...state,
				isFetching: true,
			};
		case Action.FETCH_SUCCESS:
			return {
				...state,
				tweets: action.tweets,
				isFetching: false,
			};
		case Action.FETCH_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.error,
			};
		case Action.CLEAR:
			return {
				...state,
				tweets: [],
			};
		default:
			return state;
	}
};

export default tweets;
