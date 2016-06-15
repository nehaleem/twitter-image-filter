import React from 'react';

import { Link } from 'react-router';

export default class Menu extends React.Component {
	render () {
		return (
			<nav>
				<div class="nav-wrapper">
					<ul id="nav-mobile" class="right hide-on-med-and-down">
						<li>
							<Link to="/home">Images</Link>
						</li>
						<li>
							<Link to="/filters">Filters</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
