import React from 'react';
import { autobind } from 'core-decorators';

import ImageList from '../image-list/ImageListComponent';
import LoaderBar from '../loader-bar/LoaderBarComponent';
import FilterList from '../filter-list/FilterListComponent';
import AppliedFilterList from '../applied-filters-list/AppliedFilterListComponent';

export default class HomePage extends React.Component {
	componentWillMount () {
		this.props.listFilters();
	}
	_consolidateTagsFromFilters (filters) {
		const tags = filters
			.reduce((map, filter) => map.concat(filter.tags), []);

		return [ ...new Set(tags) ];
	}

	_getItemsContent () {
		if (this.props.isFetching) {
			return <LoaderBar />;
		}
		else if (this.props.tweets.length) {
			return <ImageList items={this.props.tweets} />;
		}
		else {
			return 'No tweets found, or no filter defined. Jeesus :(';
		}
	}

	_groupFiltersByAppliedState (filters) {
		return filters
			.reduce(
				(filtersByGroup, filter) => {
					if (filter.applied) {
						filtersByGroup.applied.push(filter);
					}
					else {
						filtersByGroup.unApplied.push(filter);
					}

					return filtersByGroup;
				}, {
					applied: [],
					unApplied: [],
				}
			);
	}

	render () {
		const filtersByGroup = this._groupFiltersByAppliedState(this.props.filters);

		return (
			<div>
				<div className="row">
					<div className="col s12">
						<h3>Home</h3>
					</div>
				</div>

				<div className="row">
					<div className="col s12">
						<h4>Search filters</h4>
						<AppliedFilterList
							onFilterRemove={this.props.removeFilter}
							items={filtersByGroup.applied}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col s3">
						<h4>Filters</h4>
						<FilterList
							onFilterItemClick={this.props.addFilter}
							items={filtersByGroup.unApplied}
						/>
					</div>

					<div className="col s9">
						<h4>Found image tweets</h4>
						<div className="items-block image-list">
							{this._getItemsContent()}
						</div>
					</div>
				</div>

			</div>
		);
	}
}
