import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Fade from 'react-reveal/Fade';

// import Svg from './Svg';

class Header extends Component {
	render() {

		return (
			<header id="header">
				<h1>Header</h1>
			</header>
		);
	}
}

// Header.propTypes = {
// 	location: PropTypes.object.isRequired,
// 	lastEd: PropTypes.object.isRequired,
// 	storeOn: PropTypes.bool.isRequired,
// };

export default withRouter(Header);
