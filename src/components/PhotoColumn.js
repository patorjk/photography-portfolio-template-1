import React, {Component} from 'react';
import Photo from './Photo.js'

class PhotoColumn extends Component {
	render() {

		var numCols = this.props.numColumns || 1;

		var flexCol = {
			display: 'flex',
			flexDirection: 'column',
			width: 'calc(100% / '+numCols+')',
		};

		var imgStyles = {
			width: '100%'
		}

		var photos = this.props.photos || [];

		return (
			<div style={flexCol}>
				{photos.map(function(item) {
					return 	<Photo img={item} size={"med"} key={item.src.med} />
				})}
			</div>
		);

/*
		return (
			<div style={flexCol}>
				{photos.map(function(item) {
					return 	<img src={item.img.src.med} style={imgStyles} key={item.img.src.med} />
				})}
			</div>
		);
*/
	}
}

export default PhotoColumn;