export function save (filters) {
	const data = JSON.stringify(filters);

	window.localStorage.filters = data;
}

export function list () {
	if (!window.localStorage.filters) {
		return [];
	}

	try {
		return JSON.parse(window.localStorage.filters);
	}
	catch (error) {
		console.error(error);

		return [];
	}
}
