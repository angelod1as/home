import React, { Component } from 'react';

import Routing from './Routing';

class App extends Component {
	render() {
		const { props } = this;
		const { data } = props;
		console.log('app rendered'); // eslint-disable-line
		return (
			<Routing data={data} />
		);
	}
}

export default App;
