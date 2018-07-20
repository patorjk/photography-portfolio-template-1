import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

function getHoverStyle(props) {
	return Object.assign({
		backgroundColor: 'transparent',
		opacity: 0.5,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		boxShadow: 'inset 0 0 5em 1em rgba(0,0,0,0.33)'
	}, props);
}

function getImageStyle(props) {
	return Object.assign({
		width: '100%',
		display: 'flex',
		cursor:'pointer',
	}, props)
}

class Photo extends Component {

	constructor(props) {
		super(props);

		var percent =  Math.round(( props.img.height[props.size] / props.img.width[props.size] ) * 100) + '%'

		this.state = {
			divStyle: {
				paddingBottom: '0',
				position:'relative',
				opacity: 1,
				cursor: 'pointer',
			},
			hoverStyle: getHoverStyle({opacity: 0}),
			imageStyle: getImageStyle({opacity: 1}),
		};

		this.imgLoaded = this.imgLoaded.bind(this);
		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseLeave = this.mouseLeave.bind(this);
		this.imgClick = this.imgClick.bind(this);
		
	}

	imgLoaded(evt) {

	}

	imgClick(evt) {
		console.dir(this.props.history);

		var cur = this.props.history.location.pathname;
		if ( !cur.match(/\/$/) ) {
			cur = cur + '/';
		}

		console.log(cur);
		console.log(this.props.img);

		cur = cur + 'photo/' + this.props.img.name;

		console.log('cur:'+cur);

		this.props.history.push(cur);
	}

	mouseEnter(evt) {
		this.setState({
			hoverStyle: getHoverStyle({opacity: 1}),
		});
	}

	mouseLeave(evt) {
		this.setState({
			hoverStyle: getHoverStyle({opacity: 0}),
		});
	}

	render() {

		var imgStyle = {

		}

		var hoverTextStyle = {
			fontSize: '21px',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translateX(-50%) translateY(-50%)'
		}

		var src = this.props.img.src[this.props.size];

		return (
			<div style={this.state.divStyle} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
				
				<img src={src} style={this.state.imageStyle} onLoad={this.imgLoaded} />

				<div style={this.state.hoverStyle} onClick={this.imgClick}>
					<div style={hoverTextStyle}>
						
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Photo);