import { Action } from './actions';

const initialState = [];

function updateFilterAppliedStateOnId (filter, id, applied) {
	if (filter.id === id) {
		return Object.assign({}, filter, { applied });
	}
	else {
		return filter;
	}
}

const filters = (state = initialState, action) => {
	let filters = null;

	switch (action.type) {
		case Action.ADD:
			return state
				.map((filter) => updateFilterAppliedStateOnId(filter, action.id, true));
		case Action.REMOVE:
			return state
				.map((filter) => updateFilterAppliedStateOnId(filter, action.id, false));
		case Action.LIST_FILTERS:
			return action.filters;
		default:
			return state;
	}
};

export default filters;
