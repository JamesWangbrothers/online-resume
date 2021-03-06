'use strict';
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<h2 id="role">%data%</h2>';
var HTMLheaderPic = '<img src=%data% alt="my head shot">';
var HTMLmessage = '<h3>%data%</h3>';

//var HTMLcontactGeneric = '<li><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile ='<li><a href = "tel:%data%"><i class="fa fa-phone-square fa-2x"></i></a></li>';
var HTMLemail = '<li><a href = "mailto:%data%"><i class="fa fa-envelope-square fa-2x"></i></a></li>';
var HTMLlinkedin = '<li><a href = "%data%"><i class="fa fa-linkedin-square fa-2x"></i></a></li>';
var HTMLgithub = '<li><a href = "%data%"><li><i class="fa fa-github-square fa-2x"></i></a></li>';
var HTMLportfolio = '<li><a href = "%data%"><i class="fa fa-facebook-square fa-2x"></i></a></li>';
var HTMLlocation = '<li><a href = "%data%"><i class="fa fa-map-marker fa-2x"></i></a></li>';

var HTMLskillStart = '<h3 id="skills-h3"></h3><ul id="skills"</ul>';
var HTMLskills = '<li><span class="expand html5"></span><em>%data%</em></li>';
// var HTMLskills2 = '<li><span class="expand css3"></span><em>%data%</em></li>';
// var HTMLskills3 = '<li><span class="expand jquery"></span><em>%data%</em></li>';
// var HTMLskills4 = '<li><span class="expand javascript"></span><em>%data%</em></li>';
// var HTMLskills5 = '<li><span class="expand python"></span><em>%data%</em></li>';
// var HTMLskills6 = '<li><span class="expand git"></span><em>%data%</em></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a>%data%';
var HTMLworkTitle = '<li> -- %data%</li></a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<li>%data%</li>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a>%data%</a>';
var HTMLprojectDates = '<a class="date-text">%data%</a>';
var HTMLprojectDemo = '<button><a class="demoButton" href="%data%">Demo</a></button>';
var HTMLprojectGitHub = '<button><a class="gitHubButton" href="%data%">GitHub</a></button>';
var HTMLprojectDescription = '<ul><br><li>%data1%</li><li>%data2%</li><li>%data3%</li></ul>';


var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a>%data%';
var HTMLschoolMajor = '<li> -- %data%</li></a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a>%data%';
var HTMLonlineSchool = ' -- %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a>%data%</a>';

//var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

/*
a function that will need this helper code to run.
*/
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName() || function(){};
    $('#name').html(iName);  
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
//clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  
  var x = loc.pageX;
  var y = loc.pageY;

  logClicks(x,y);
});



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /* 
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js. 
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide: 
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    education.schools.forEach(function(school){
      locations.push(school.location);
    });

    // iterates through work locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide: 
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    work.jobs.forEach(function(job){
      locations.push(job.location);
    });

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
      infoWindow.open(map,marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});
