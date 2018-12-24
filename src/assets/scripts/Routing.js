import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Pages
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import News from './components/News';

// Functionality
import ScrollTop from './components/common/ScrollTop';

// Common
import Nav from './components/common/Nav';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

class Routing extends Component {
	render() {
		const { data } = this.props;

		// getting links
		const { links } = data;

		// get state
		return (
			<div id="app-outer">
				<HashRouter>
					<div id="app-inner">
						<Nav
							links={links}
						/>
						<Header />
						<ScrollTop>
							<Switch>
								<Route
									path="/"
									exact
									render={({ match }) => (
										<Home
											Route={match}
											links={links}
										/>
									)}
								/>
								<Route
									path="/sobre"
									render={({ match }) => (
										<About
											Route={match}
											links={links}
										/>
									)}
								/>
								<Route
									path="/newsletter"
									render={({ match }) => (
										<News
											Route={match}
										/>
									)}
								/>
								<Route
									path="*"
									render={({ match }) => (
										<NotFound
											Route={match}
											links={links}
										/>
									)}
								/>
							</Switch>
						</ScrollTop>
						<Footer />
					</div>
				</HashRouter>
			</div>
		);
	}
}

Routing.propTypes = {
	data: PropTypes.object.isRequired,
};

export default Routing;
