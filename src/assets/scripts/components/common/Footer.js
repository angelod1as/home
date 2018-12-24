import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Svg from './Svg';
import Newsletter from './Newsletter';

export default class Footer extends Component {
	Social() {
		return (
			<div className="social">
				<h3>fale conosco</h3>
				<div className="social-inner">
					<a
						href="mailto:temposfantasticos@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="../../../images/social/mail.svg"
							alt="Imagem que representa o símbolo do e-mail"
						/>
					</a>
					<a
						href="http://facebook.com/temposfantasticos"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="../../../images/social/facebook.svg"
							alt="Imagem que representa o símbolo do facebook"
						/>
					</a>
					<a
						href="http://instagram.com/temposfantasticos"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="../../../images/social/instagram.svg"
							alt="Imagem que representa o símbolo do instagram"
						/>
					</a>
				</div>
			</div>
		);
	}

	render() {
		return (
			<footer id="footer" className="footer">
				<div className="footer_inner">
					<div className="logo">
						<Svg name="vertical" className="vertical" />
						<Svg name="horizontal" className="horizontal" />
					</div>
					<div className="contact">
						<Newsletter />
						<this.Social />
					</div>
				</div>
				<div className="footer_bottom">
					Tempos Fantástico (c) 2016-2018
				</div>
			</footer>
		);
	}
}
