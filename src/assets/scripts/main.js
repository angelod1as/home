import React from 'react';
import jsonp from 'jsonp';
import { render } from 'react-dom';

// CSS
import '../style/main.styl';

// Routing
import App from './App';

// Started > oct 3rd 8am
// Finished > nov 27 19pm
// author: Angelo Dias
// e-mail: angelo@angelodias.com.br

// if HTTPS, go to HTTP
// (the website is secure, umbler isn't)
const url = window.location.href;
if (url.includes('https')) {
	const newUrl = url.replace('https', 'http');
	window.location.href = newUrl;
}

// A message to everyone
/* eslint-disable */
console.group("READ THIS PLEASE!");
console.log("Angelo built this website from the ground. If you like his coding or design, what about hiring him? He's a experienced designer and knows JS and React. He's even willing to learn new technologies! e-mail him right away: angelo@angelodias.com.br");
console.log("");
console.log("if you want to see how this website is built, visit https://github.com/angelod1as/temposfantasticos");
console.group("HTTP vs HTTPS")
console.log("Because of PagSeguro technology for making purchases or subscriptions I can't serve this website on HTTP That's why I'm force-redirecting it to HTPPS. I already contacted the server's team and I'm waiting for their way to fix.")
console.groupEnd();
console.groupEnd();
/* eslint-enable */

jsonp(
	'../json/data.json',
	{
		name: 'data',
		timeout: 1000,
	},
	(err, data) => {
		if (err) {
			throw err;
		} else {
			render(
				<App data={data} />,
				document.getElementById('app'),
			);
		}
	},
);
