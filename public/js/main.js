
var app = angular.module('DSP', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "templates/pages/home.html", controller: "PageCtrl"})
    // Pages
    .when("/fraternitylife", {templateUrl: "templates/pages/fraternitylife.html", controller: "PageCtrl"})
    .when("/about", {templateUrl: "templates/pages/about.html", controller: "PageCtrl"})
    .when("/recruitment", {templateUrl: "templates/pages/recruitment.html", controller: "PageCtrl"})
    .when("/alumni", {templateUrl: "templates/pages/alumni.html", controller: "PageCtrl"})
    .when("/login", {templateUrl: "templates/pages/login.html", controller: "PageCtrl"})
    .when("/scholarship", {templateUrl: "templates/pages/scholarship.html", controller: "PageCtrl"})

      //mobile redirects
      //.when("/m", {templateUrl: "templates/pages/about.html", controller: "PageCtrl"})
      //.when("/fraternitylife/m", {templateUrl: "templates/pages/fraternitylife.html", controller: "PageCtrl"})
      //.when("/about/m", {templateUrl: "templates/pages/about.html", controller: "PageCtrl"})
      //.when("/recruitment/m", {templateUrl: "templates/pages/recruitment.html", controller: "PageCtrl"})
      //.when("/alumni/m", {templateUrl: "templates/pages/alumni.html", controller: "PageCtrl"})
      //.when("/login/m", {templateUrl: "templates/pages/login.html", controller: "PageCtrl"})
      //.when("/scholarship/m", {templateUrl: "templates/pages/scholarship.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "templates/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  var bsn = require("bootstrap.native");

  // Activates the Carousel
  var mainSlider = document.getElementById('myCarousel');
  mainSlider.addEventListener('slid.bs.carousel', function(e) {
    // get the caption of current active item before slide
    var active = mainSlider.querySelector('.item.active .carousel-caption'); 
    active.classList.remove('slide')
  });
  mainSlider.addEventListener('slide.bs.carousel', function(e) {
    // get the caption of new active item after slide
    var active = mainSlider.querySelector('.item.active .carousel-caption');
    active.classList.add('slide')
  }); 

  $('.carousel').carousel({
    interval: 5000
  });
});

// fill the pdf form
function scholarship() {
  var firstname = document.getElementById(firstname).value;
  var lastname = document.getElementById(lastname).value;
  var email = document.getElementById(email).value;
  var phone = document.getElementById(phone).value;
  var addressline = document.getElementById(addressline).value;
  var city = document.getElementById(city).value;
  var state = document.getElementById(state).value;
  var zip = document.getElementById(zip).value;
  var birthday = document.getElementById(birthday).value;
  var highschool = document.getElementById(highschool).value;
  var classrank = document.getElementById(classrank).value;
  var gpa = document.getElementById(gpa).value;
  var year = document.getElementById(year).value;
  var major = document.getElementById(major).value;
  var honors = document.getElementById(honors).value;
  var service = document.getElementById(service).value;
  var essay = document.getElementById(essay).value;

  var sourcePDF = "files/scholarship.pdf";
  var destinationPDF =  "files/scholarship_complete.pdf";
  var shouldFlatten = true;
  var data = {
    "firstname" : firstname,
    "lastname" : lastname,
    "email" : email,
    "phone" : phone,
    "addressline" : addressline,
    "city" : city,
    "state" : state,
    "zip" : zip,
    "birthday" : birthday,
    "highschool" : highschool,
    "classrank" : classrank,
    "gpa" : gpa,
    "year" : year,
    "major" : major,
    "honors" : honors,
    "service" : service,
    "essay" : essay
  };
 
  pdfFiller.fillForm( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
  });
};

