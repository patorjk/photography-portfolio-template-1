var settings = {};

settings.img = {
	width: {
		med: 640,
		lg: 1200
	}
}

settings.title = {};
settings.title.main = 'Patrick Gillespie Photography';
settings.title.about = 'About Patrick';

settings.urls = {};
settings.urls.flickr = 'https://www.flickr.com/photos/40423570@N07/';
settings.urls.instagram = 'https://www.instagram.com/patorjk/';

settings.about = {};
settings.about.blurb = `
<p>
	My name is Pat, I'm a software engineer and amateur photographer. I'm married with 2 kids, I don't sleep enough, and I enjoy creating stuff. I setup this site to show off some of my favorite photos. If you're interested in more of my work you can find me on <a href="https://www.flickr.com/photos/40423570@N07/" target="_blank">Flickr</a> and <a href="https://www.instagram.com/patorjk/" target="_blank">Instagram</a>.
</p>
<p>
	I wrote the code for this site using ReactJS and have put <a href="https://github.com/patorjk/photography-portfolio-template-1/" target="_blank">the code</a> up on github. Additionally, I run a programming site which you can find here: <a href="http://patorjk.com/" target="_blank">patorjk.com</a>
</p>
`

settings.about.profileImg = {};

try {
	settings.about.profileImg.med = require('./src/photos/DSC_0143-Edit_640.jpg')
	settings.about.profileImg.lg = require('./src/photos/DSC_0143-Edit_1200.jpg')
} catch (err) {

}

module.exports = settings;