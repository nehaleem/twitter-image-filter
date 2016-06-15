import React from 'react';

import './index.css';

export default function ImageList (props) {
	const images = props.items.map((item) => {
		return (
			<li key={item.id} className="collection-item">
				<div className="image-list__image">
					<div className="image__inner-column">
						<a href={item.url} target="_blank">
							<img
								className="circle-border"
								width="150"
								height="150"
								src={item.url}
							/>
						</a>
					</div>
					<div className="image__inner-column image-description">
						<strong className="title">Text:</strong>
						<p>{item.text}</p>
					</div>
				</div>
			</li>
		);
	});

	return (
		<ul className="collection">
			{images}
		</ul>
	);
};
