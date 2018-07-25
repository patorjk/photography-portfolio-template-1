import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MediaQuery from 'react-responsive';
import config from '../../app.config.js';
import ReactGA from 'react-ga';

class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	
	handleClick(event) {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose() {
		this.setState({ anchorEl: null });
	};

	render() {
		var bStyle = {
			width: '20px'
		}

		const { anchorEl } = this.state;

		const middleStyle = {
			marginLeft: 'auto'
		}

		const rightItemStyle = {
			marginRight: '20px'
		};

		const titleStyle = {
			textDecoration: 'none',
		}

		const myHandleClose = this.handleClose;

		return (
			<AppBar position="fixed" color="default">
				<Toolbar>
					<MediaQuery minWidth={700}>
						<Typography variant="title" color="inherit" to="/" component={Link} style={titleStyle}>
							{config.title.main}
						</Typography>
						<div style={bStyle}></div>
					</MediaQuery>

					<Button color="inherit" onClick={this.handleClick} >Photos <KeyboardArrowDown style={{fontSize: 14, marginLeft: 2}}/></Button>
					
					<Menu
						id="photoMenu"
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={this.handleClose}
					>

						{config.categories.map(function(item) {
							return <MenuItem key={item.tag} onClick={myHandleClose} to={"/category/" + item.tag} component={Link}>{item.display}</MenuItem>
						})}

					</Menu>

					<Button color="inherit" to="/about" component={Link} >About</Button>

					<div style={middleStyle}></div>

					<MediaQuery minWidth={700}>
						<div style={rightItemStyle}>follow →</div>
						<ReactGA.OutboundLink
							to={config.urls.flickr}
							target="_blank" 
							style={rightItemStyle}
							eventLabel="Flickr"
						>
							<img src={require('../images/flickr.png')} width={32} />
						</ReactGA.OutboundLink>
						<ReactGA.OutboundLink 
							to={config.urls.instagram} 
							target="_blank"
							eventLabel="Instagram"
						>
							<img src={require('../images/instagram.png')} width={32} />
						</ReactGA.OutboundLink>
					</MediaQuery>
				</Toolbar>
			</AppBar>
		); 
	}
}

export default NavBar;