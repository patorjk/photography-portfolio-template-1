import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import config from '../../app.config.js';

const flexTop = {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	justifyContent: 'center',
}

const lgVersion = {
	maxWidth: '1200px',
	padding: '20px',
	display: 'flex',
	flexDirection: 'row',
	margin: '100px'
}

const smVersion = {
	maxWidth: '1200px',
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
}

const imgStyles = {
	width: '100%'
}

const blurbStyles = {
	maxWidth: '650px',
	marginRight: '80px',
}

const blurbStylesBig = {
	maxWidth: '650px',
	marginRight: '80px',
}

const blurbStylesSmall = {
	maxWidth: '650px',
}

const headerStyle = {
	marginTop: 0
}

function AboutBlurb(props) {
	return (
		<div style={props.style}>
			<h3 style={headerStyle}>About</h3>
			<p>
				My name is Pat, I'm a software engineer and amateur photographer. I'm married with 2 kids, I don't sleep enough, and I enjoy creating stuff. I setup this site to show off some of my favorite photos. If you're interested in more of my work you can find me on <a href="https://www.flickr.com/photos/40423570@N07/" target="_blank">Flickr</a> and <a href="https://www.instagram.com/patorjk/" target="_blank">Instagram</a>.
			</p>
			<p>
				I wrote the code for this site using ReactJS and have put the code up on github. (edit: TODO). Additionally, I run a programming site which you can find here: <a href="http://patorjk.com/" target="_blank">patorjk.com</a>
			</p>
		</div>
	);
}

class About extends Component {
	render() {


		return (
			<div style={flexTop}>
				
					
					<MediaQuery maxWidth={999} >
						<div style={smVersion}>
							<AboutBlurb style={blurbStylesSmall} />
							<div>
								<img src={config.about.profileImg.med} style={imgStyles} />
							</div>
						</div>
					</MediaQuery>

					<MediaQuery minWidth={1000} >
						<div style={lgVersion}>
							<AboutBlurb style={blurbStylesBig} />
							<div>
								<img src={config.about.profileImg.med} style={imgStyles} />
							</div>
						</div>
					</MediaQuery>
				
			</div>
		);
	}
}

export default About;