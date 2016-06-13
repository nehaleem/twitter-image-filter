import React from 'react';

import MemeList from '../meme-list/MemeListComponent';
import LoaderBar from '../loader-bar/LoaderBarComponent';
import FilterList from '../filter-list/FilterListComponent';
import * as memeService from './service';

export default class HomePage extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			items: [],
			fetching: true,
			filters: [
				{ id: 1, name: 'laughing fucks', used: false },
			],
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
					</div>
				</div>
				<div className="row">
					<div className="col s3">
						<strong>Filters</strong>
						<FilterList items={this.state.filters} />
					</div>
					<div className="col s9">
						<strong>Filtered memes</strong>
						<div className="items-block">
							{
								this.state.fetching ?
									<LoaderBar /> :
									<MemeList items={this.state.items} />
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
