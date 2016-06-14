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

		this._editFilter = this._editFilter.bind(this);
		this._deleteFilter = this._deleteFilter.bind(this);
		this._saveFilter = this._saveFilter.bind(this);
	}

	_editFilter (itemId) {

	}

	_deleteFilter (itemId) {

	}

	_saveFilter (itemId, tags) {

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
							onFilterItemClick={this._editFilter}
							items={this.state.filters}
						/>
					</div>

					<div className="col s9">
						<strong>Filter edit</strong>
						<div className="items-block filter-form">
							<FilterForm
								filter={this.state.editedFilter}
								onDelete={this._deleteFilter}
								onSave={this._saveFilter}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
