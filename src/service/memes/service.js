const DATA_URL = '/data.json';

export function list () {
	return fetch(DATA_URL)
		.then((result) => result.json());
}
