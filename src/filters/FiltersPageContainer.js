import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FiltersPage from './FiltersPageComponent';
import * as filterActions from './actions';

const mapStateToProps = (state) => {
	const { filters, editingFilter } = state.filters;

	return {
		filters,
		editingFilter,
	};
};

@connect(mapStateToProps)
export default class FiltersPageContainer extends React.Component {
	render () {
		const { dispatch } = this.props;

		const boundFilterActions = bindActionCreators(filterActions, dispatch);


		return (
			<FiltersPage
				filters={this.props.filters}
				editingFilter={this.props.editingFilter}
				{...boundFilterActions}
			/>
		);
	}
}
