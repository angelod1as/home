import React, { Component } from 'react';
import postscribe from 'postscribe';
// import PropTypes from 'prop-types';

import Newsletter from './common/Newsletter';
import alt from './common/alt';

class News extends Component {
	componentDidMount() {
		postscribe('#archive', '<script language="javascript" src="//tumblr.us13.list-manage.com/generate-js/?u=5763cb0778ec81558f6d9304e&fid=17021&show=1000" type="text/javascript"></script>', {
			done() {
				document.getElementById('news-loading').remove();
			},
		});
	}

	render() {
		return (
			<div id="news">
				<main className="news">
					<section className="opening container">
						<h1>Newsletter</h1>
						<Newsletter />
						<p>Quem acompanha o Tempos Fantásticos conhece a importância de nossa newsletter</p>
						<p>Comandada por nosso faz tudo Jennings, o e-mail é quinzenal e traz as informações mais importantes sobre o projeto, além de curiosidades diversas — como <a href="https://us13.campaign-archive.com/?u=5763cb0778ec81558f6d9304e&id=2aa988a2bc" target="_blank" rel="noopener noreferrer"> a importância da assinatura do TF </a> , <a href="https://us13.campaign-archive.com/?u=5763cb0778ec81558f6d9304e&id=0880701863" target="_blank" rel="noopener noreferrer"> o novo projeto gráfico do jornal </a> e até sobre <a href="https://us13.campaign-archive.com/?u=5763cb0778ec81558f6d9304e&id=2e0b84c43e" target="_blank" rel="noopener noreferrer"> o desenvolvimento deste site </a> .
						</p>
						<p>Você pode assinar a news no formulário acima ou navegar em nosso arquivo de news já publicadas abaixo</p>
						<img src="../../images/sobre/news.png" alt={alt.news.img1} className="news-header" />
						<div id="archive">
							<h2>Arquivo de newsletters</h2>
							<p id="news-loading">Carregando...</p>
						</div>
					</section>
				</main>
			</div>
		);
	}
}

export default News;
