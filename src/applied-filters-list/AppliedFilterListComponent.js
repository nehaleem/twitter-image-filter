import React from 'react';

import './index.css';

export default class AppliedFilterListComponent extends React.Component {
	constructor (props) {
		super(props);

		this._handleFilterRemove = this._handleFilterRemove.bind(this);
	}

	static propTypes = {
		items: React.PropTypes.array.isRequired,
		onFilterRemove: React.PropTypes.func.isRequired,
	};

	_handleFilterRemove (event) {
		const itemId = Number.parseInt(event.target.getAttribute('data-filter-id'), 10);

		this.props.onFilterRemove(itemId);
	}

	_renderFilters (items) {
		return items.map((item) => {
			return (
				<div
					key={item.id}
					data-filter-id={item.id}
					className="chip applied-filter-list__filter"
					title="Remove filter from search"
					onClick={this._handleFilterRemove}
				>
					{item.name}
				</div>
			);
		});
	}

	render () {
		return (
			<div className="applied-filter-list items-block">
				{this._renderFilters(this.props.items)}
			</div>
		);
	}
}

