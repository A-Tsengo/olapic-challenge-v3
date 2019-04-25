# Olapic-challenge-v3
Olapic SA technical challenge version 3

#### Author: **James J. Chen**


## Background

This is the front-end development challenge portion of the Olapic technical assessment for Solution Architect candidates.  The purpose of this project is to mimic the development of a web page for a hypothetical client using the Olapic API.

### Task

To create a simple front-end display of UGC pulled directly from the Olapic API and arranging the photos in a gid layout, mimicing the layout used in the adidas PDP implementation.  (The URL to the adidas web page is intentially omitted).

## Development 

### High Level Summary

This section includes high level implementation information.  More detailed information about the development process is covered in the next section.

* The web page was developed using front end code exclusively (in other words, a back-end such as node.js was not used).
* ES6+ code was written and used alongside babel to transpile the code.
	* Babel transpiles the code into ES5 code, which is more compatible with older browsers.
* Axios, a promised based library, was included through a CDN to make asynchronous requests easier.
* Vue.js, a front-end frame work, was included through a CDN to makes data binding and interpolation easier (e.g. used to display the images from the API into the HTML).
* NPM was installed to manage dependencies (babel) and to run babel's build process.
* With the setup outlined above, the development consisted of the following:
	* Used Axios to call the Olapic API - The API response provided the image URLs needed.
	* Vue was used to inject the data into the DOM.
	* The HTML layout consists of a basic HTML5 template with added div tags to contain the needed content.
	* CSS was used to manipulate the images contained in divs to their respective positions.
		*  This was achieved by targeting specific elements with CSS selectors and styling them appropriately with floats, and other attributes.
	*  Once the code was developed, babel was run to create the transpiled code and the script was then added to the HTML and subsequently, the old script was removed.
		
### Development Process

This section covers the development process in technical detail.

#### JavaScript

Dependancies:

* Babel
* Axios
* NPM (not a code dependency, but a it is a dependency in the sense that it was required to build this project)
* Vue.js

Code Development:

All code is written in `./js/src/index.js` in ES6+.  The code is then transpiled using babel to `./js/dest/index.js` and then included in the HTML.  The script is included at the bottom of the HTML which allows the Vue CDN to load as well as the DOM, which is required as a dependency to the script.  Additionally, the code is wrapped in an immediately invoked function (IFFE) for the purposes of code encapsulation so that Olapic specific variables do not pollute the Global space and conflict with client or other 3rd party code.

The JS code performs two basic functions; 1) Retrieving and storing image data and 2) Populating the DOM with image content and controlling user interaction.

* The Olapic API, is stored in the `olapicApi` variable for later use in the Axios call.
* A new Vue instance is created and stored in the `vm` variable.
	* The vue instance will later hold the image data and bind it the the DOM.
* a `moreImages` variable is used to hold the reference to the "load more images" link in the html.
* `showImages` is a function saved to a variable that will take part of saved data and use it to populate the DOM.
* `moreImages` is then bound to an event listener based on a click event and calls `showImages()`.
* Axios is used to call the API asynchronously by using a promise. It then retrieves the data once the promise is fulfilled and passes the response to the chained `.then()` method. 

When the Axios call is made, the response object needs to be drilled down into the `media` property found in `data.data._embedded.media`.  Within `media`, five image URL types are specified.  For this implementation, the `normal` type was chosen based on the image size specification of 640x640px.  A map array function is used to retrieve and store this from the response data:

```
const mediaArray = [...data.data.data._embedded.media].map(element => element.images.normal);
```

The function `buildGroup()` is used to take the image data and store the data as arrays with at most five elements.  These arrays are then stored as elements themselves in another array.  These array elements are later used to populate the DOM with five images at a time based on the initial load of the page and each time the "load more images" button is clicked.

The population of the DOM is achieved by the use of Vue.  The array of arrays with image URLs is stored in the `responses` key in the `vm` data object.  Upon page load, one array is pushed to `groups` which populates the initial five images.  Each time the "load more images" link is clicked, the eventLister that is bound to `moreImages` calls `showImages()` which then pushes another array from `responses` to `groups`, thus adding another five images to the DOM.  The population of the images is also partly accomplished by the v-for directive that is hard coded into the HTML, which is discussed more in the next sub-section.

### HTML

* Top level div is given the id of `app` which is used to bind to the vue instance.  
* divs and elements are used to organize the content and assist the CSS with layout.
* Vue code was necessary to hard code into the HTML in order for the data to be injected into the DOM.
	* The `v-for` directive loops through the image data.  The first loop iterates through the outer array and the 2nd loop, iterates through the array elements (the five or less image URLs).
	* The `v-bind` directive then populates the image URL into the anchor tag.

	```
	<div class="image-group" v-for="group of groups">
                <div v-for="element in group">
                    <img v-bind:src=element alt="">
	``` 
	* lastly, the `v-if` directive controls the visibility of the "load more images" link.  Once all the photos have been populated, the visability is removed.

### CSS

* CSS reset is used to normalize cross browser specific styles.
* The content is contained as 75% of the browser width and centered by the use of auto margins.
* The container for the block of images is hard coded at 1200x600px.
* The grid layout is achieved by a combination of floating the elements and specifying the image size based on the positioning of the image.
	*	The HTML structure contains each group of five photos in a div, while each photo is also contained in a div.  This top level div allows selection using the `nth-of-type()` pseudo class with either "odd" or "even" as the pseudo class value.  This was needed in order to correctly target and format the large image in the group to float right or left depending on the row number.
	*	Similarly, the `nth-of-type()` with the value of 1 or using a preceding `not()` pseudo class was used to select the remaining images to float them either left or right, respectively to odd or even rows.


## Considerations

More development is needed to make this page mobile responsive (media queries).  Additionally, more testing is required to see if a polyfill CDN needs to be included to polyfill any JS features that may be needed for older browsers.

## Versioning

The `master` branch contains the code needed to populate a webpage that pulls the most recent photos from the Olapic API (using the `recent` media sorting option), as requested by the client.  It also display the photos using `contain`, which maintains the aspect ratio of the photo.  This is the reason why some of the images display fully in their containers.

The `alt` branch contains similar code, however it uses the `rated` media sorting option and uses `cover` which expands the photo to fit their respective containers.  This version better demonstrates how the web page could look if the images pulled from the API were properly sized.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

