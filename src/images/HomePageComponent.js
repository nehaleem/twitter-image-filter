import React from 'react';

import ImageList from '../image-list/ImageListComponent';
import LoaderBar from '../loader-bar/LoaderBarComponent';
import FilterList from '../filter-list/FilterListComponent';
import AppliedFilterList from '../applied-filters-list/AppliedFilterListComponent';
import * as filterService from '../filters/service';
import * as imageService from '../images/service';

export default class HomePage extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			items: [],
			fetching: false,
			filters: filterService.list(),
		};

		this._handleFilterRemove = this._handleFilterRemove.bind(this);
		this._handleFilterAdd = this._handleFilterAdd.bind(this);
	}

	_consolidateTagsFromFilters (filters) {
		const tags = filters
			.reduce((map, filter) => map.concat(filter.tags), []);

		return [ ...new Set(tags) ];
	}

	_fetchTweetsByTags (tags) {
		imageService
			.search(tags)
			.then((items) => {
				this.setState({ items, fetching: false });
			});
	}

	_handleFilterRemove (itemId) {
		const filters = this._cancelAppliedFilterFromFiltersById(itemId, this.state.filters);
		const appliedFilters = this._filterAppliedFilters(filters);

		this.setState({
			filters,
			fetching: appliedFilters.length > 0,
		});

		if (appliedFilters.length > 0) {
			const tags = this._consolidateTagsFromFilters(appliedFilters);

			this._fetchTweetsByTags(tags);
		}
		else {
			this.setState({ items: [] });
		}
	}

	_handleFilterAdd (itemId) {
		const filters = this._applyFilterInFiltersById(itemId, this.state.filters);
		const appliedFilters = this._filterAppliedFilters(filters);

		this.setState({
			filters,
			fetching: appliedFilters.length > 0,
		});

		if (appliedFilters.length > 0) {
			const tags = this._consolidateTagsFromFilters(appliedFilters);

			this._fetchTweetsByTags(tags);
		}
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

	_getItemsContent () {
		if (this.state.fetching) {
			return <LoaderBar />;
		}
		else if (this.state.items.length) {
			return <ImageList items={this.state.items} />;
		}
		else {
			return 'No tweets found, or no filter defined. Jeesus :(';
		}
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
						<strong>Filters</strong>
						<FilterList
							onFilterItemClick={this._handleFilterAdd}
							items={unappliedFilters}
						/>
					</div>

					<div className="col s9">
						<strong>Found image tweets</strong>
						<div className="items-block image-list">
							{this._getItemsContent()}
						</div>
					</div>
				</div>

			</div>
		);
	}
}
