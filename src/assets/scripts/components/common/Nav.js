import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Nav extends Component {
	constructor() {
		super();
		this.state = { checked: false };
		this.unCheck = this.unCheck.bind(this);
	}

	unCheck() {
		let { checked } = this.state;
		checked = !checked;
		this.setState({ checked });
	}

	render() {
		const { links, location, storeOn } = this.props;
		const { checked } = this.state;
		const { pathname } = location;

		return (
			<nav role="navigation">
				<div id="menuToggle">
					{/* Botão CSS puro */}
					<div className="nav-bg" />
					<input
						id="nav-checkbox"
						className="nav-checkbox"
						type="checkbox"
						checked={checked}
						onChange={this.unCheck}
					/>
					<span />
					<span />
					<span />
					<ul id="menu">
						{links.map((link) => {
							if (link[0] === 'loja' && !storeOn) {
								return null;
							}
							if (pathname !== `/${link[0]}`) {
								return <li key={uuidv1()}><Link to={`/${link[0]}`} onClick={this.unCheck}>{link[1]}</Link></li>;
							}
							return <li className="tick" key={uuidv1()}>{link[1]}</li>;
						})}
					</ul>
				</div>
			</nav>);
	}
}

Nav.propTypes = {
	location: PropTypes.object.isRequired,
	links: PropTypes.array.isRequired,
	storeOn: PropTypes.bool.isRequired,
};

export default withRouter(Nav);
