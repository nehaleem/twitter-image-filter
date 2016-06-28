import * as tweetService from './service';

export const Action = {
	FETCH: 'TWEETS_FETCH',
	FETCH_SUCCESS: 'TWEETS_FETCH_SUCCESS',
	FETCH_ERROR: 'TWEETS_FETCH_ERROR',
	CLEAR: 'TWEETS_CLEAR',
};

export const requestTweets = () => {
	return {
		type: Action.FETCH
	};
};

export const clearTweets = () => {
	return {
		type: Action.CLEAR
	};
};

export const receiveTweets = (tweets) => {
	return {
		type: Action.FETCH_SUCCESS,
		tweets,
	};
}

export const receiveTweetsFailed = (error) => {
	return {
		type: Action.FETCH_ERROR,
		error,
	};
}

export const fetchTweetsByKeywords = (keywords) => (dispatch) => {
	dispatch(requestTweets());

	tweetService
		.search(keywords)
		.then((result) => result.json())
		.then((result) => {
			const tweets = result.statuses
				.filter((status) => status.entities.media)
				.map((status) => {
					return {
						id: status.id,
						url: status.entities.media[0].media_url,
						text: status.text,
					};
				});

			dispatch(receiveTweets(tweets));
		})
		.catch((error) => dispatch(receiveTweetsFailed(error)));

	return null;
};
