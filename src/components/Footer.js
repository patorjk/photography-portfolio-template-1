import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import config from '../../app.config.js';

const topDiv = {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	justifyContent: 'space-evenly',
	marginTop: '200px',
	backgroundColor: '#333',
	color: 'white',
}

const innerStyle = {
	margin: '100px 20px',
	fontSize: '0.8em'
}

const linkStyle = {
	color: 'white',
	textDecoration: 'none',
	fontWeight: 'bold'
}

function getRandomFooterMessage() {
	var msgs = [];
	msgs.push('I feel like this footer needs some text, do people read webpage footers?');
	msgs.push('Great wisdom can be found in the small print of webpage footers.');
	msgs.push('Back in 2011, MC Hammer launched a search engine called "WireDoo". That has nothing to do with this page, I just wanted to share.');
	msgs.push(`Coca-Cola was originally sweetened with wine. Before the wine was switched out for sugar, it was known as "Pemberton's French Wine Coca". It was a 1886 prohibition law enacted in Atlanta that caused its inventor, Dr. John S. Pemberton, to rewrite the formula. And that my friends, is the story of Coca-Cola.`);
	msgs.push(`Random fact #42: Kodak invented the first digital camera back in 1975, but held back on the concept because it didn't want to hurt it's film business.`);
	msgs.push(`Random fact #53: The human eye can distinguish around 10 million different colors.`);


	var rand = Math.floor(Math.random() * msgs.length);

	return msgs[rand];
}

class Footer extends Component {
	render() {


		return (
			<div style={topDiv}>
				
				<div style={innerStyle}>
					{getRandomFooterMessage()}
				</div>
				
			</div>
		);
	}
}

export default Footer;

