import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

export default class FilterForm extends React.Component {
	constructor (props) {
		super(props);

		this._handleFilterSave = this._handleFilterSave.bind(this);
		this._handleFilterDelete = this._handleFilterDelete.bind(this);
		this._handleNameInputChange = this._handleNameInputChange.bind(this);
		this._handleFormErase = this._handleFormErase.bind(this);

		this.state = {
			id: null,
			name: '',
			tags: [],
		};
	}

	static propTypes = {
		filter: React.PropTypes.object,
		onDelete: React.PropTypes.func.isRequired,
		onSave: React.PropTypes.func.isRequired,
	};

	componentWillReceiveProps (nextProps) {
		if (nextProps.filter) {
			const { id, name, tags } = nextProps.filter;

			this.setState({ id, name, tags });
		}
		else {
			this._handleFormErase();
		}
	}

	_handleFilterSave () {
		const { id, name, tags } = this.state;

		this.props.onSave(id, name, tags);
	}

	_handleFilterDelete () {
		this.props.onDelete(this.state.id);
	}

	_handleNameInputChange (event) {
		const name = event.target.value;

		this.setState({ name });
	}

	_handleFormErase () {
		this.setState({
			id: null,
			name: '',
			tags: [],
		});
	}

	render () {
		let additionalControlls = null;

		if (this.state.id !== null) {
			additionalControlls = [
				<button className="waves-effect waves-light btn" onClick={this._handleFilterDelete}>
					Delete
				</button>,
				<button className="waves-effect waves-light btn" onClick={this._handleFormErase}>
					New filter
				</button>,
			];
		}

		let saveBtnClassName = 'waves-effect waves-light btn';

		if (!this.state.name.length) {
			saveBtnClassName += ' disabled';
		}


		return (
			<div>
				<div className="row">
					<div className="input-field col s5">
						<input
							id="filter_name"
							type="text"
							value={this.state.name}
							onChange={this._handleNameInputChange}
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
						<button
							className={saveBtnClassName}
							onClick={this._handleFilterSave}
							disabled={!this.state.name.length}
						>
							Save
						</button>
						{additionalControlls}
					</div>
				</div>
			</div>
		);
	}
}