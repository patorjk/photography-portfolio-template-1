import React, {Component} from 'react'
import PhotoColumn from './PhotoColumn.js'
import MediaQuery from 'react-responsive';
import config from '../../app.config.js';
import { Route } from 'react-router-dom'
import Lightbox from './Lightbox.js';

const flexTop = {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
}

const flexCol = {
	display: 'flex',
	flexDirection: 'column',
	width: 'calc(100% / 3)',
};

const imgStyles = {
	width: '100%'
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getShortestColumn(arr) {
	var idx = 0;
	var minSize = null;
	arr.forEach(function(item, index) {
		item.height = item.height || 0;
		if (item.height < minSize || minSize === null) {
			idx = index;
			minSize = item.height;
		}
	});
	return idx;
}

function addToLayout(arr, item) {
	var idx = getShortestColumn(arr);
	arr[idx].height = arr[idx].height + item.height.med;
	arr[idx].push(item);
}

class PhotoGrid extends Component {

	constructor(props) {
		super(props);

		var photos = this.props.photos || [];

		photos = shuffle(photos);

		this.state = {
			photos: photos
		}
	}

	render() {

		var cat = this.props.category;

		var fPhotos = this.state.photos.filter(function(item) {
			return item.categories.indexOf(cat) !== -1 ? true : false;
		});

		var cols = [];
		cols[0] = [ [] ];
		cols[1] = [ [], [] ];
		cols[2] = [ [], [], [] ];
		cols[3] = [ [], [], [], [] ];

		fPhotos.forEach(function(item, idx) {
			addToLayout(cols[0], item);
			addToLayout(cols[1], item);
			addToLayout(cols[2], item);
			addToLayout(cols[3], item);
		});

		return (
			<React.Fragment>

				<Route path={this.props.baseUrl + "/photo/:name"} render={( {match} ) => (
					<React.Fragment>
						<Lightbox photos={fPhotos} photoName={match.params.name} baseUrl={this.props.baseUrl} />
					</React.Fragment>
				)} />


				<MediaQuery maxWidth={config.img.width.med}>
					<div style={flexTop}>
						<PhotoColumn photos={cols[0][0]} numColumns={1} />
				    </div>
			    </MediaQuery>
			    <MediaQuery minWidth={config.img.width.med + 1} maxWidth={config.img.width.med * 2}>
					<div style={flexTop}>
						<PhotoColumn photos={cols[1][0]} numColumns={2} />
						<PhotoColumn photos={cols[1][1]} numColumns={2} />
				    </div>
				</MediaQuery>
			    <MediaQuery minWidth={ (config.img.width.med*2) + 1} maxWidth={ config.img.width.med * 3 }>
					<div style={flexTop}>
						<PhotoColumn photos={cols[2][0]} numColumns={3} />
						<PhotoColumn photos={cols[2][1]} numColumns={3} />
						<PhotoColumn photos={cols[2][2]} numColumns={3} />
				    </div>
			    </MediaQuery>
			    <MediaQuery minWidth={(config.img.width.med * 3) + 1}>
					<div style={flexTop}>
						<PhotoColumn photos={cols[3][0]} numColumns={4} />
						<PhotoColumn photos={cols[3][1]} numColumns={4} />
						<PhotoColumn photos={cols[3][2]} numColumns={4} />
						<PhotoColumn photos={cols[3][3]} numColumns={4} />
				    </div>
			    </MediaQuery>
		    </React.Fragment>
		);
	}
}

export default PhotoGrid;