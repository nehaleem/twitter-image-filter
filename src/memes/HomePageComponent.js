import React from 'react';

import MemeList from '../meme-list/MemeListComponent';
import LoaderBar from '../loader-bar/LoaderBarComponent';
import FilterList from '../filter-list/FilterListComponent';
import AppliedFilterList from '../applied-filters-list/AppliedFilterListComponent';
import * as filterService from '../filters/service';
import * as twitter from '../memes/service';

export default class HomePage extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			items: [],
			fetching: true,
			filters: filterService.list(),
		};

		this._handleFilterRemove = this._handleFilterRemove.bind(this);
		this._handleFilterAdd = this._handleFilterAdd.bind(this);
	}

	componentDidMount () {
		twitter
			.search([ 'laugh' ])
			.then((items) => {
				this.setState({ items, fetching: false });
			});
	}

	_handleFilterRemove (itemId) {
		const filters = this._cancelAppliedFilterFromFiltersById(itemId, this.state.filters);

		this.setState({ filters });
	}

	_handleFilterAdd (itemId) {
		const filters = this._applyFilterInFiltersById(itemId, this.state.filters);

		this.setState({ filters });
	}

	_applyFilterInFiltersById (itemId, filters) {
		return filters.map((filter) => {
			if (filter.id === itemId) {
				filter.applied = true;
			}

			return filter;
		});
	}

	_cancelAppliedFilterFromFiltersById (itemId, filters) {
		return filters.map((filter) => {
			if (filter.id === itemId) {
				filter.applied = false;
			}

			return filter;
		});
	}

	_filterAppliedFilters (filters) {
		return filters.filter((filter) => filter.applied);
	}

	_filterOutAppliedFilters (filters) {
		return filters.filter((filter) => !filter.applied);
	}

	render () {
		const appliedFilters = this._filterAppliedFilters(this.state.filters);
		const unappliedFilters = this._filterOutAppliedFilters(this.state.filters);

		return (
			<div>
				<div className="row">
					<div className="col s12">
						<div>Home</div>
					</div>
				</div>

				<div className="row">
					<div className="col s12">
						<strong>Search filters</strong>
						<AppliedFilterList
							onFilterRemove={this._handleFilterRemove}
							items={appliedFilters}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col s3">
						<strong>Filters 3</strong>
						<FilterList
							onFilterItemClick={this._handleFilterAdd}
							items={unappliedFilters}
						/>
					</div>

					<div className="col s9">
						<strong>Filtered memes</strong>
						<div className="items-block meme-list">
							{
								this.state.fetching ?
									<LoaderBar /> :
									<MemeList items={this.state.items} />
							}
						</div>
					</div>
				</div>

			</div>
		);
	}
}
