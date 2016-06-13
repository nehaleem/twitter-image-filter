const DATA_URL = '/data.json';

function wait (ms = 200) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export function list () {
	return wait(1000)
		.then(() => window.fetch(DATA_URL))
		.then((result) => result.json());
}
