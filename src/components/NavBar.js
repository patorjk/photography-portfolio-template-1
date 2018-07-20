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

		return (
			<AppBar position="fixed" color="default">
				<Toolbar>
					<MediaQuery minWidth={700}>
						<Typography variant="title" color="inherit" to="/" component={Link} style={titleStyle}>
							Patrick Gillespie Photography
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
						<MenuItem onClick={this.handleClose} to="/" component={Link}>Main</MenuItem>
						<MenuItem onClick={this.handleClose} to="/category/baltimore" component={Link}>Baltimore</MenuItem>
						<MenuItem onClick={this.handleClose} to="/category/maryland" component={Link}>Maryland</MenuItem>
						<MenuItem onClick={this.handleClose} to="/category/people" others={{title:'About'}} component={Link}>People</MenuItem>
					</Menu>

					<Button color="inherit" to="/about" component={Link} >About</Button>

					<div style={middleStyle}></div>

					<MediaQuery minWidth={700}>
						<div style={rightItemStyle}>follow →</div>
						<a href="https://www.flickr.com/photos/40423570@N07/" target="_blank" style={rightItemStyle}>
							<img src={require('../images/flickr.png')} width={32} />
						</a>
						<a href="https://www.instagram.com/patorjk/" target="_blank">
							<img src={require('../images/instagram.png')} width={32} />
						</a>
					</MediaQuery>
				</Toolbar>
			</AppBar>
		); 
	}
}

export default NavBar;