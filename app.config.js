var settings = {};

settings.img = {
	width: {
		med: 640,
		lg: 1200
	}
}

settings.about = {};
settings.about.profileImg = {};

try {
	settings.about.profileImg.med = require('./src/photos/DSC_0143-Edit_640.jpg')
	settings.about.profileImg.lg = require('./src/photos/DSC_0143-Edit_1200.jpg')
} catch (err) {

}

module.exports = settings;