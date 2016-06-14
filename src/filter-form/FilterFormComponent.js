import React from 'react';

import './index.css';

export default class FilterForm extends React.Component {
	constructor (props) {
		super(props);

		this._nameNode = null;
	}

	static propTypes = {
		filter: React.PropTypes.object,
		onDelete: React.PropTypes.func.isRequired,
		onSave: React.PropTypes.func.isRequired,
	};

	render () {
		return (
			<div>
				<div className="row">
					<div className="input-field col s5">
						<input
							id="filter_name"
							type="text"
							ref={(node) => this._nameNode = node}
						/>
						<label for="filter_name">Filter name</label>
					</div>
				</div>

				<div className="row">
					<div className="input-field col s12">
						Tags
					</div>
				</div>

				<div className="row">
					<div className="col s12 form-controls">
						<a className="waves-effect waves-light btn">Save</a>
						{
							this.props.filter ?
								<a className="waves-effect waves-light btn">Delete</a> :
								null
						}
					</div>
				</div>
			</div>
		);
	}
}
