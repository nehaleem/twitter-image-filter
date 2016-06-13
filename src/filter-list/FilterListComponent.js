import React from 'react';

import './index.css';

export default class FilterListComponent extends React.Component {
	constructor (props) {
		super(props);

		this._handleFilterAdd = this._handleFilterAdd.bind(this);
	}

	static propTypes = {
		items: React.PropTypes.array.isRequired,
		onFilterAdd: React.PropTypes.func.isRequired,
	};

	_handleFilterAdd (event) {
		const itemId = Number.parseInt(event.target.getAttribute('data-filter-id'), 10);

		this.props.onFilterAdd(itemId);
	}

	render () {
		const filters = this.props.items.map((item) => {
			return (
				<div
					key={item.id}
					data-filter-id={item.id}
					className="chip filter-list__filter"
					title="Add to search"
					onClick={this._handleFilterAdd}
				>
					{item.name}
				</div>
			);
		});

		return (
			<div className="filter-list items-block">
				{filters}
			</div>
		);
	}
}
