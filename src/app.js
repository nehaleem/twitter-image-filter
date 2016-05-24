import 'materialize-css/bin/materialize.css';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
	<div className="container">
		<div className="row">
			<div className="col s12">
				<h2>Twitter MemeLocator</h2>
			</div>
		</div>
	</div>
);

ReactDOM.render(
	<App />,
	document.getElementById('#react-app')
);
