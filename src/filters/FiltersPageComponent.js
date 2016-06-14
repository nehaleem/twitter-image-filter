import React from 'react';

import FilterForm from '../filter-form/FilterFormComponent';
import FilterList from '../filter-list/FilterListComponent';

export default class FiltersPage extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			filters: [],
			editedFilter: null,
		};

		this._handleUpdateFilter = this._handleUpdateFilter.bind(this);
		this._deleteFilter = this._deleteFilter.bind(this);
		this._handleFilterClick = this._handleFilterClick.bind(this);
	}

	_deleteFilter (itemId) {

	}

	_handleUpdateFilter (itemId, name, tags) {
		if (itemId === null) {
			this._addFilter(name, tags);
		}
		else {
			this._editFilter(itemId, name, tags);
		}
	}

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
	}

	_addFilter (name, tags) {
		const filter = {
			id: this.state.filters.length,
			name,
			tags,
		};

		const filters = this.state.filters.concat([ filter ]);

		this.setState({ filters, editedFilter: filter });
	}

	render () {
		return (
			<div>
				<div className="row">
					<div className="col s12">
						<div>Filters</div>
					</div>
				</div>

				<div className="row">
					<div className="col s3">
						<strong>Your filters</strong>
						<FilterList
							onFilterItemClick={this._handleFilterClick}
							items={this.state.filters}
						/>
					</div>

					<div className="col s9">
						<strong>Filter edit</strong>
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
