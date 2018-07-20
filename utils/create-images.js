/*
	Script for generating images
*/

const optionDefinitions = [
	{
		name: 'input',
		alias: 'i',
		type: String
	},
	{
		name: 'exif-only',
		type: Boolean
	}
];
const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);
const fs = require('fs');
const fsProm = require('fs').promises;
var config = require('../app.config.js');
var Jimp = require('jimp');
var path = require('path');
const { ExifTool } = require("exiftool-vendored")
const exiftool = new ExifTool();

// ----------------------------------------------------------------------------
// Utility functions

function newImageName(filename, size) {
	return filename.replace(/\.([^\.]+)$/, function(match, group) {
		return '_' + size + '.' + group
	});
}

function createResizedImages(actions, fullPath, filename) {
	return actions.then(function() {
		console.log('processing:'+fullPath);

		return Jimp.read(fullPath).then(function(lenna) {

			console.log('file read, preparing to write...');

			var newFilenameLg = newImageName(filename, config.img.width.lg);
			var newFilenameMed = newImageName(filename, config.img.width.med);

			return lenna
				.resize(config.img.width.lg, Jimp.AUTO)
				.quality(100)
				.write( path.join(__dirname, '../src/photos/' + newFilenameLg) )
				.resize(config.img.width.med, Jimp.AUTO)
				.quality(100)
				.write( path.join(__dirname, '../src/photos/' + newFilenameMed) );
		});
	});
}

/*
function createImage(fullPath, filename, size) {

	console.log('processing:'+fullPath);

	return Jimp.read(fullPath).then(function(lenna) {

		console.log('file read, preparing to write...');

		var newFilename = newImageName(filename, size);

		
		return lenna.resize(size, Jimp.AUTO)
			.quality(100)
			.write( path.join(__dirname, '../src/images/' + newFilename) );
	});
}

function createResizedImages(actions, fullPath, filename) {
	return actions.then(function() {
		return createImage(fullPath, filename, config.img.width.med);
	}).then(function() {
		return createImage(fullPath, filename, config.img.width.lg);
	}).catch(function(err) {
		console.error(err);
	})
}
*/

function createPhotoObjectString(metadata) {
	var imgName = metadata.ObjectName || metadata.FileName;
	imgName = imgName.replace(/'/g, "\\'");

	var imgDescription = metadata.ImageDescription || '';
	imgDescription = imgDescription.replace(/'/g, "\\'");

	var imgFile1 = newImageName( metadata.FileName, config.img.width.med );
	imgFile1 = imgFile1.replace(/'/g, "\\'");

	var imgFile2 = newImageName( metadata.FileName, config.img.width.lg );;
	imgFile2 = imgFile2.replace(/'/g, "\\'");

	var cats = '';
	if (typeof metadata.Subject === 'string') {
		cats = '"' + metadata.Subject + '"'
	} else if (Array.isArray(metadata.Subject)) {
		cats = metadata.Subject.map(item => '"' + item + '"').join(',') ;
	}

	var width = metadata.ImageWidth || config.img.width.med;
	var height = metadata.ImageHeight || config.img.width.med;
	var medWidth = config.img.width.med;
	var medHeight = Math.round((config.img.width.med) * (height / width ));

	var ret = 
`
	{
		name: '${imgName}',
		description: '${imgDescription}',
		categories: [${cats}],

		src: {
			med: require('./${imgFile1}'),
			lg: require('./${imgFile2}'),
		},
		width: {
			med: ${medWidth}
		},
		height: {
			med: ${medHeight}
		}
	},
`

	return ret;
}

function getExif(actions, fullPath) {
	return actions.then(function() {
		return exiftool
			.read(fullPath)
			.then(function(tags ) {
				myJsonString = myJsonString + createPhotoObjectString(tags);
			})
	});
}

// ----------------------------------------------------------------------------
// Check command line args

try {
	if ( !options.input || !fs.lstatSync(options.input).isDirectory() ) {
		console.log('Input is not a directory:'+options.input);
		return process.exit();
	}
} catch(err) {
	console.log('Input is not a directory:'+options.input);
	return process.exit();
}

// ----------------------------------------------------------------------------
// Loop through images

var myJsonString = '';
var actions = new Promise(function(resolve) {
	resolve();
});

fs.readdirSync(options.input).forEach(file => {
	var fullPath = path.join(options.input, file);

	if (file.match(/.jpg$|.jpeg$/)) {

		if ( !options['exif-only'] ) {
			actions = createResizedImages(actions, fullPath, file);
		}
		actions = getExif(actions, fullPath);
	}
	

})

actions.then(function() {
	myJsonString = "var imageList = [" + myJsonString + "]";
	myJsonString = myJsonString + `

export default imageList;
	`;

	return fsProm.writeFile( path.join(__dirname, '../src/photos/photos.js'), myJsonString);
}).then(function() {
	console.log('done!');
	process.exit();
}).catch(function() {
	console.error(arguments);
});