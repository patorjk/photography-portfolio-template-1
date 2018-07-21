# Photography Portfolio Template

This is the project I development to create the website [patrickgillespie.com](http://patrickgillespie.com). 

## Quick Start

* Clone repo 
```bash
git clone __repo_url_here__ portfolio
cd portfolio
```
* Install dependences
```bash
npm install
```
* Create metadata and re-sized versions of photographs (more info below)
```bash
node utils/create-images.js -i /directory/to/full_sized_photos/
```
* Run webpack
```bash
npx webpack
```
* Run dev server
```bash
npm start
```

## Create sized photographs

The app uses resized versions of your photographs along with metadata it reads from the image's exif data. To generate the metadata file, as well as the resized images, run this command:

```bash
node utils/create-images.js -i /directory/to/full_sized_photos/
```

That will create a src/photos directory with the resized images along with a file called "photos.js". This file contains metadata about all of your photographs for use in the app. This script also has a "--exif-only" option for when you just want to re-generate photos.js. I've used the metadata fields that Lightroom provides for the title and description of an image. You can look at the create-images.js script for more info. 

In the portfolio app, images displayed on the main page have "main" as a tag in their metadata. In Lightroom, this field is the "Keyword Tags" field which you can find on the right hand side pane in the "Library" module.

In Lightroom, I've found the easiest workflow is to tag all of the images I want to use with "portfolio", and then from there, editing the metadata of the images and export them to a "full_sized_photos" directory which I can run the create-image.js on.

## What to edit

* You'll want to edit src/index.html:
  * Remove or update Google Analytics code.
  * Remove or update meta tags at the top of the page.
* All other updates that you'll need to do can be made by editing app.config.js
