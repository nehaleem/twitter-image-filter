import React from 'react';

import './index.css';

export default function MemeList (props) {
	const memes = props.items.map((item) => {
		return (
			<li key={item.id} className="collection-item avatar">
				<div className="meme-list__meme">
					<div className="meme__inner-column">
						<img
							width="100"
							height="100"
							src={item.url}
						/>
					</div>
					<div className="meme__inner-column">
						<strong className="title">Tags:</strong>
						<p>{item.tags.join(', ')}</p>
					</div>
				</div>
			</li>
		);
	});

	return (
		<ul className="collection">
			{memes}
		</ul>
	);
};
