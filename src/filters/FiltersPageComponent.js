import React from 'react';
import { autobind } from 'core-decorators';

import * as filterService from '../filters/service';
import FilterForm from '../filter-form/FilterFormComponent';
import FilterList from '../filter-list/FilterListComponent';

export default class FiltersPage extends React.Component {
	componentWillMount () {
		this.props.listFilters();
	}

	componentWillUpdate (nextProps) {
		if (nextProps.filters !== this.props.filters) {
			this.props.persistFilters(nextProps.filters);
		}
	}

	componentWillUnmount () {
		this.props.deselectFilter();
	}

	@autobind
	_deleteFilter (id) {
		this.props.deleteFilter(id);
	}

	@autobind
	_handleUpdateFilter (itemId, name, tags) {
		if (itemId === null) {
			const id = this._resolveLastFilterId(this.props.filters);

			this.props.createFilter(id, name, tags);
		}
		else {
			this.props.updateFilter(itemId, name, tags);
		}
	}

	@autobind
	_handleFilterClick (id) {
		this.props.selectFilter(id);
	}

	_sortFilterById (filterA, filterB) {
		if (filterA.id < filterB.id) {
			return -1;
		}
		else if (filterA.id > filterB.id) {
			return 1;
		}
		else {
			return 0;
		}
	}

	_resolveLastFilterId (filters) {
		let lastFilterIndex = 0;

		if (filters.length) {
			const sortedFilters = filters.sort((this._sortFilterById));
			const lastFilter = sortedFilters[sortedFilters.length - 1];

			lastFilterIndex = lastFilter.id + 1;
		}

		return lastFilterIndex;
	}

	render () {
		return (
			<div>
				<div className="row">
					<div className="col s12">
						<h3>Filters</h3>
					</div>
				</div>

				<div className="row">
					<div className="col s3">
						<h4>Your filters</h4>
						<FilterList
							onFilterItemClick={this._handleFilterClick}
							items={this.props.filters}
						/>
					</div>

					<div className="col s9">
						<h4>Filter edit</h4>
						<div className="items-block filter-form">
							<FilterForm
								filter={this.props.editingFilter}
								onDelete={this._deleteFilter}
								onSave={this._handleUpdateFilter}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
