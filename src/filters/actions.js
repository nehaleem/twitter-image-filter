import * as filterService from '../filters/service';

export const Action = {
	ADD: 'FILTER_ADD',
	REMOVE: 'FILTER_REMOVE',
	CREATE: 'FILTER_CREATE',
	DELETE: 'FILTER_DELETE',
	UPDATE: 'FILTER_UPDATE',
	LIST_FILTERS: 'FILTER_LIST',
	PERSIST_FILTERS: 'FILTER_PERSIST',
	SELECT_FILTER: 'SELECT_FILTER',
	DESELECT_FILTER: 'DESELECT',
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

export const createFilter = (id, name, tags) => {
	return {
		id,
		name,
		tags,
		type: Action.CREATE,
	};
};

export const deleteFilter = (id) => {
	return {
		id,
		type: Action.DELETE,
	};
};

export const updateFilter = (id, name, tags) => {
	return {
		id,
		name,
		tags,
		type: Action.UPDATE,
	};
};

export const persistFilters = (filters) => {
	filterService.save(filters);

	return {
		type: Action.PERSIST_FILTERS,
	};
};

export const selectFilter = (id) => {
	return {
		id,
		type: Action.SELECT_FILTER,
	};
};

export const deselectFilter = () => {
	return {
		type: Action.DESELECT_FILTER,
	};
};

export const listFilters = () => {
	return {
		type: Action.LIST_FILTERS,
		filters: filterService.list(),
	};
};
