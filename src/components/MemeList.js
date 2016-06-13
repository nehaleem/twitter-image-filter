import React from 'react';

export default function MemeList (props) {
	const memes = props.items.map((item) => {
		return (
			<li className="collection-item avatar">
				<img
					key={item.id}
					width="100"
					height="100"
					src={item.url}
				/>
				<strong className="title">Tags:</strong>
				<p>{item.tags.join(', ')}</p>
			</li>
		);
	});

	return (
		<ul className="collection">
			{memes}
		</ul>
	);
};
