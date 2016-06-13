import React from 'react';

import MemeList from '../meme-list/MemeListComponent';
import LoaderBar from '../loader-bar/LoaderBar';
import * as memeService from './service';

export default class HomePage extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			items: [],
			fetching: true,
		};
	}

	componentDidMount () {
		memeService
			.list()
			.then((items) => {
				this.setState({
					items,
					fetching: false,
				});
			});
	}

	render () {
		return (
			<div>
				<div className="row">
					<div className="col s12">
						<div>Home</div>
						{
							this.state.fetching ?
								<LoaderBar /> :
								<MemeList items={this.state.items} />
						}
					</div>
				</div>
			</div>
		);
	}
}
