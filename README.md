# Photography Portfolio Template

This is the project I development to create the website [patrickgillespie.com](https://patrickgillespie.com). 

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

That will create a src/photos directory with the new files. This script also has a "--exif-only" option for when you just want to re-generate the metadata file. I've used the metadata fields that Lightroom provides for the title and description of an image. You can look at the create-images.js script for more info. Images displayed on the main page have "main" as a tag in their metadata. In Lightroom, this field is the "Keyword Tags" field in the "Library" module.


## Hard coded updates

* You'll want to edit index.html:
  * Remove or update Google Analytics code.
  * Remove or update meta tags at the top of the page.
* Right now the categories are hard coded in the NavBar.js file.
* Other configurable settings can be made by editing app.config.js
