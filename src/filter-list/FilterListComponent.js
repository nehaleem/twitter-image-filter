import React from 'react';
import { autobind } from 'core-decorators';

import './index.css';

export default class FilterListComponent extends React.Component {
	static propTypes = {
		items: React.PropTypes.array.isRequired,
		onFilterItemClick: React.PropTypes.func.isRequired,
	};

	@autobind
	_handleFilterItemClick (event) {
		const itemId = Number.parseInt(event.target.getAttribute('data-filter-id'), 10);

		this.props.onFilterItemClick(itemId);
	}

	render () {
		const filters = this.props.items.map((item) => {
			return (
				<div
					key={item.id}
					data-filter-id={item.id}
					className="chip filter-list__filter"
					title="Add to search"
					onClick={this._handleFilterItemClick}
				>
					{item.name}
				</div>
			);
		});

		return (
			<div className="filter-list items-block">
				{
					filters.length ?
						filters :
						'No filters to add'
				}
			</div>
		);
	}
}
