import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

class NotFound extends Component {
	render() {
		return (
			<Fade>
				<div id="not-found">
					<main className="not-found">
						<section className="opening container">
							<h1>Página não encontrada</h1>
							<p>Ops, esse é o famoso <b>erro 404</b>. O link que você digitou provavelmente está errado. Volte para a home <Link to="/">clicando aqui.</Link></p>
						</section>
					</main>
				</div>
			</Fade>
		);
	}
}

export default NotFound;
