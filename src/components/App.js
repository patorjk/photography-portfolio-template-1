import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NavBar from './NavBar.js'
import PhotoGrid from './PhotoGrid.js'
import photoList from '../photos/photos.js'
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Router as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom'
import About from './About.js'
import Footer from './Footer.js'
import createHistory from 'history/createBrowserHistory'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary1Color: '#fff',
	},
	typography: {
		fontFamily: [
			'"PT Sans"', 
			'sans-serif',
		]
	},
	shadows: Array(25).fill('none')
}); 

function updatePageTitle(location) {
	if (!location) {
		location = window.location;
	}

	switch(location.pathname) {
		case "/":
			document.title = "Patrick Gillespie Photography";
			break;
		case "/about":
			document.title = "About Patrick";
			break;
		case /category\/[-_a-zA-Z0-9\/]+$/.test(location.pathname):
			document.title = "Patrick Gillespie Photography";
			break;
		case /photo\/[-_a-zA-Z0-9\/]+$/.test(location.pathname):
			document.title = "Patrick Gillespie Photography";
			break;
		default:
			document.title = "Patrick Gillespie Photography";
	}
}

const history = createHistory()
history.listen((location, action) => {

	console.log('history');
	console.dir(location);

	updatePageTitle(location);

	try {
		// set new url and title
		ga('set', {
		  page: location.pathname,
		  title: document.title
		});

		// send it for tracking
		ga('send', 'pageview');
	} catch(err) {
		console.warn('google analytics not setup');
	}
});

class App extends Component {
	
	componentWillMount() {
		console.log('mount!');
		updatePageTitle(location); // initial set
	}

	render() {

		return (
			<Router history={history}>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<NavBar />

					<Switch>

						<Route path="/category/:cat" render={( {match} ) => (
							<React.Fragment>
								<PhotoGrid photos={photoList} category={match.params.cat} baseUrl={match.url} />
								<Footer />
							</React.Fragment>
						)} />


						<Route path="/about" render={() => (
							<React.Fragment>
								<About />
								
							</React.Fragment>
						)} /> 

						<Redirect from="/" exact to="/category/main" />

					</Switch>

			    </MuiThemeProvider>
		    </Router>
		);
	}
}

export default App;