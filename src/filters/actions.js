import * as filterService from '../filters/service';

export const Action = {
	ADD: 'FILTER_ADD',
	REMOVE: 'FILTER_REMOVE',
	LIST_FILTERS: 'FILTER_LIST',
};

export const addFilter = (id) => {
	return {
		id,
		type: Action.ADD,
	};
};

export const removeFilter = (id) => {
	return {
		id,
		type: Action.REMOVE,
	};
};

export const listFilters = () => {
	return {
		type: Action.LIST_FILTERS,
		filters: filterService.list(),
	};
};
