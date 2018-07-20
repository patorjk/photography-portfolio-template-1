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
			<div dangerouslySetInnerHTML={{__html:config.about.blurb}} />
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