import React from 'react';

import './index.css';

export default function AppliedFilterListComponent (props) {
	const filters = props.items.map((item) => {
		return (
			<div
				key={item.id}
				className="chip applied-filter-list__filter"
			>
				{item.name}
			</div>
		);
	});

	return (
		<div className="applied-filter-list items-block">
			{filters}
		</div>
	);
};
