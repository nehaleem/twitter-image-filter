import React from 'react';


export default function LoaderBar () {
	return (
		<div style={{ textAlign: 'center' }}>
			<div className="progress">
				<div className="indeterminate"></div>
			</div>
			<strong>Fetching tweets dude, chill out ...</strong>
		</div>
	);
};
