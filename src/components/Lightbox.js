import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Lightbox extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			imgStyle: {
				maxWidth: '100%',
				maxHeight: window.innerHeight + 'px',
				opacity: 0,
			}
		};

		this.closeMe = this.closeMe.bind(this);	
		this.prevPhoto = this.prevPhoto.bind(this);	
		this.nextPhoto = this.nextPhoto.bind(this);	
		this.getCurrentPhoto = this.getCurrentPhoto.bind(this);	
		this.getCurrentPhotoIndex = this.getCurrentPhotoIndex.bind(this);
		this.imgLoaded = this.imgLoaded.bind(this);
	}

	imgLoaded() {
		this.setState({
			imgStyle: {
				maxWidth: '100%',
				maxHeight: window.innerHeight + 'px',
				opacity: 1,
			}
		})
	}

	closeMe() {
		this.props.history.push(this.props.baseUrl);
	}

	prevPhoto() {
		var idx = this.getCurrentPhotoIndex();
		idx--;
		if (idx < 0) {
			idx = this.props.photos.length - 1;
		}

		var name = this.props.photos[idx].name;
		this.props.history.push(this.props.baseUrl + '/photo/' + name);
	}

	nextPhoto() {
		var idx = this.getCurrentPhotoIndex();
		idx++;
		if (idx >= this.props.photos.length) {
			idx = 0;
		}

		var name = this.props.photos[idx].name;
		this.props.history.push(this.props.baseUrl + '/photo/' + name);
	}

	getCurrentPhotoIndex() {
		var idx = 0;
		var photoName = this.props.photoName;
		this.props.photos.forEach(function(item, index) {
			if (item.name === photoName) {
				idx = index;
			}
		});
		return idx;
	}

	getCurrentPhoto() {
		return this.props.photos[this.getCurrentPhotoIndex()];
	}

	render() {

		const divStyle = {
			position: 'fixed',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			zIndex: 10000,
			backgroundColor: 'rgba(255,255,255,0.95)',
		}

		const flexTop = {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
		}

		const photoAreaStyle = {
			flex: 1,
			justifyContent: 'center',
			flexDirection: 'row',
			display:'flex',
		}

		const tbStyle = {
			position: 'fixed',
			textAlign:'right',
			top: 0,
			left: 0,
			zIndex: 20000,
			width: '100%',
		}

		const closeBtnStyle = {
			margin: '10px 10px 0 auto',
			backgroundColor: 'transparent',
			fontSize: '21px',
			marginRight:0,
		}

		const arrowBtnStyle = {
			margin: 0,
			fontSize: '21px',
			backgroundColor: 'white',
		}

		const photoBox = {
			flex: 1,
			display: 'flex',
			justifyContent: 'space-around',
			flexDirection: 'row',
			alignItems: 'center',
		}

		const textBoxStyle = {
			minWidth: '350px',
			maxWidth: '350px',
			padding: '40px',
		}

		const curPhoto = this.getCurrentPhoto();

		return (
			<React.Fragment>
			<div style={divStyle}>


				<div style={flexTop}>
					<div style={photoAreaStyle}>
						<Button color="inherit" onClick={this.prevPhoto} style={arrowBtnStyle}>&lt;</Button>
						<div style={photoBox}>
							<div style={textBoxStyle}>
								<h3>{curPhoto.name}</h3>
								<p dangerouslySetInnerHTML={{__html:curPhoto.description}} />
							</div>
							<div>
								<img src={curPhoto.src.lg} style={this.state.imgStyle} onLoad={this.imgLoaded} />
							</div>
						</div>
						<Button color="inherit" onClick={this.nextPhoto} style={arrowBtnStyle}> &gt; </Button>
					</div>
				</div>

			</div>

			<div style={tbStyle}>
				<Button color="inherit" onClick={this.closeMe} style={closeBtnStyle}> X </Button>
			</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Lightbox);