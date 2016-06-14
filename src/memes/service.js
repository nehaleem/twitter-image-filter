const DATA_URL = '/api/twitter/search/tweets.json';

function wait (ms = 200) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
export function search (keywords) {
	const query = window.encodeURIComponent(`meme ${keywords.join(' ')} filter:media`);

	return window
		.fetch(`${DATA_URL}?q=${query}`)
		.then((result) => result.json())
		.then((result) => {
			return result.statuses
				.filter((status) => status.entities.media)
				.map((status) => {
					return {
						id: status.id,
						url: status.entities.media[0].media_url,
						text: status.text,
					};
				});
		})
		.catch((error) => {
			console.error(error);
		});
}
