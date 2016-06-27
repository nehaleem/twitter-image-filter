import React from 'react';
import { connect } from 'react-redux'

import HomePage from './HomePageComponent';
import * as actions from './actions';

const mapStateToProps = (state) => {
	const { items, fetching, filters } = state.imagePage;

	return { items, fetching, filters };
};

const mapDispatchToProps = (dispatch) => {
	return {
		addFilter: (id) => dispatch(actions.addFilter(id)),
		removeFilter: (id) => dispatch(actions.removeFilter(id)),
		listFilters: () => dispatch(actions.listFilters()), 
	}
};

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePageContainer extends React.Component {
	render () {
		const { items, fetching, filters } = this.props;

		return (
			<HomePage
				items={items}
				fetching={fetching}
				filters={filters}
				addFilter={this.props.addFilter}
				removeFilter={this.props.removeFilter}
				listFilters={this.props.listFilters}
			/>
		);
	}
}
