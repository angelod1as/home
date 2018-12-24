import React, { Component } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

export default class Newsletter extends Component {
	componentDidMount() {
		// changing form placeholder and button
		// in a DIRTY and BAD way
		// sorry.

		const getNews = document.getElementsByClassName('mc-newsletter');
		for (let i = 0; i < getNews.length; i += 1) {
			const thisNews = getNews[i];
			thisNews
				.getElementsByTagName('INPUT')[0]
				.placeholder = 'seu email';
			thisNews
				.getElementsByTagName('BUTTON')[0]
				.innerHTML = 'bora!';
		}
	}

	render() {
		const url = 'https://tumblr.us13.list-manage.com/subscribe/post?u=5763cb0778ec81558f6d9304e&amp;id=2a87629fcd';
		return (
			<div className="newsletter">
				<h2>Receba nossa newsletter</h2>
				<p>(Ela é quinzenal, não vai lotar sua caixa de entrada)</p>
				<div className="mc-newsletter">
					<MailchimpSubscribe url={url} />
				</div>
			</div>
		);
	}
}
