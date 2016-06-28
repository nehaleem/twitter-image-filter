import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HomePage from './HomePageComponent';
import * as tweetActions from './actions';
import * as filterActions from '../filters/actions';

const mapStateToProps = (state) => {
	const { filters } = state;
	const { isFetching, tweets, error } = state.tweets;

	return {
		filters,
		isFetching,
		tweets,
		error,
	};
};

@connect(mapStateToProps)
export default class HomePageContainer extends React.Component {
	render () {
		const { dispatch } = this.props;

		const boundTweetActions = bindActionCreators(tweetActions, dispatch);
		const boundFilterActions = bindActionCreators(filterActions, dispatch);


		return (
			<HomePage
				tweets={this.props.tweets}
				isFetching={this.props.isFetching}
				filters={this.props.filters}
				{...boundTweetActions}
				{...boundFilterActions}
			/>
		);
	}
}
