import React from 'react';

import './index.css';

export default function FilterListComponent (props) {
	const filters = props.items.map((item) => {
		return (
			<div
				key={item.id}
				className="chip filter-list__filter"
				title="Add to search"
			>
				{item.name}
			</div>
		);
	});

	return (
		<div className="filter-list">
			{filters}
		</div>
	);
};
