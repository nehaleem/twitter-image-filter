import { Action } from './actions';

const initialState = {
	items: [],
	fetching: false,
	filters: [],
};

function updateFilterAppliedStateOnId (filter, id, applied) {
	if (filter.id === id) {
		return Object.assign({}, filter, { applied });
	}
	else {
		return filter;
	}
}

const reducer = (state = initialState, action) => {
	let filters = null;

	switch (action.type) {
		case Action.ADD:
			filters = state.filters
				.map((filter) => updateFilterAppliedStateOnId(filter, action.id, true));
			return {
				...state,
				filters,
				fetching: true,
			};
		case Action.REMOVE:
			filters = state.filters
				.map((filter) => updateFilterAppliedStateOnId(filter, action.id, false));
			const appliedFilters = filters.filter((filter) => filter.applied);

			return {
				...state,
				filters,
				fetching: appliedFilters.length > 0,
			};
		case Action.LIST_FILTERS:
			return {
				...state,
				filters: action.filters,
			};
		default:
			return state;
	}
};

export default reducer;
