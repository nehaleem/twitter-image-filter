import { Action } from './actions';

const initialState = {
	filters: [],
	editingFilter: null,
};

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
	let filter = null;

	switch (action.type) {
		case Action.ADD:
			filters = state.filters
				.map((filter) => updateFilterAppliedStateOnId(filter, action.id, true));

			return {
				...state,
				filters,
			};
		case Action.REMOVE:
			filters = state.filters
				.map((filter) => updateFilterAppliedStateOnId(filter, action.id, false));

			return {
				...state,
				filters,
			};
		case Action.LIST_FILTERS:
			return {
				...state,
				filters: action.filters,
			};
		case Action.CREATE:
			filter = {
				id: action.id,
				name: action.name,
				tags: action.tags,
			};

			filters = state.filters.slice();
			filters.push(filter);

			return {
				...state,
				editingFilter: filter,
				filters,
			};
		case Action.UPDATE:
			filter = {
				id: action.id,
				name: action.name,
				tags: action.tags.slice(),
			};
			filters = state.filters
				.slice()
				.map((currentFilter) => currentFilter.id === action.id ? filter : currentFilter);

			return {
				...state,
				editingFilter: filter,
				filters,
			};
		case Action.DELETE:
			filters = filters
				.filter((filter) => filter.id !== action.id);

			return {
				...state,
				editingFilter: null,
				filters,
			};
		case Action.SELECT_FILTER:
			filter = state.filters
				.find((filter) => filter.id === action.id);

			return {
				...state,
				editingFilter: Object.assign({}, filter),
			};
		case Action.DESELECT_FILTER:
			return {
				...state,
				editingFilter: null,
			};
		default:
			return state;
	}
};

export default filters;
