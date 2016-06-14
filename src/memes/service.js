const DATA_URL = '/api/twitter/search/tweets.json';

function wait (ms = 200) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
export function search () {
	const query = window.encodeURIComponent('cat filter:media');

	return window
		.fetch(`${DATA_URL}?q=${query}`)
		.then((result) => result.json())
		.catch((error) => {
			console.error(error);
		});
}
