const DATA_URL = '/api/twitter/search/tweets.json';

function wait (ms = 200) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
export function search (keywords) {
	const query = window.encodeURIComponent(`${keywords.join(' ')} filter:media`);

	return window.fetch(`${DATA_URL}?q=${query}`);		
}
