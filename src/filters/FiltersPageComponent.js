import React from 'react';
import { autobind } from 'core-decorators';

import * as filterService from '../filters/service';
import FilterForm from '../filter-form/FilterFormComponent';
import FilterList from '../filter-list/FilterListComponent';

export default class FiltersPage extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			filters: filterService.list(),
			editedFilter: null,
		};
	}

	@autobind
	_deleteFilter (itemId) {
		const filters = this.state.filters.slice();
		const filterIndex = filters.findIndex((filter) => filter.id === itemId);

		filters.splice(filterIndex, 1);

		this.setState({ filters, editedFilter: null });
		filterService.save(filters);
	}

	@autobind
	_handleUpdateFilter (itemId, name, tags) {
		if (itemId === null) {
			this._addFilter(name, tags);
		}
		else {
			this._editFilter(itemId, name, tags);
		}
	}

	@autobind
	_handleFilterClick (itemId) {
		const filter = this.state.filters
			.find((filter) => filter.id === itemId);

		this.setState({ editedFilter: filter });
	}

	_editFilter (itemId, name, tags) {
		const updatedFilter = {
			id: itemId,
			name,
			tags,
		};
		const filters = this.state.filters
			.map((filter) => {
				if (filter.id === itemId) {
					filter = updatedFilter;
				}

				return filter;
			});

		this.setState({ filters, editedFilter: updatedFilter });
		filterService.save(filters);
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

	_addFilter (name, tags) {
		let lastFilterIndex = 0;

		if (this.state.filters.length) {
			const sortedFilters = this.state.filters.sort((this._sortFilterById));
			const lastFilter = sortedFilters[sortedFilters.length - 1];

			lastFilterIndex = lastFilter.id + 1;
		}

		const filter = {
			id: lastFilterIndex,
			name,
			tags,
		};

		const filters = this.state.filters.concat([ filter ]);

		this.setState({ filters, editedFilter: filter });
		filterService.save(filters);
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
							items={this.state.filters}
						/>
					</div>

					<div className="col s9">
						<h4>Filter edit</h4>
						<div className="items-block filter-form">
							<FilterForm
								filter={this.state.editedFilter}
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
