
var app = angular.module('DSP', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "templates/home.html", controller: "PageCtrl"})
    // Pages
    .when("/fraternitylife", {templateUrl: "templates/fraternitylife.html", controller: "PageCtrl"})
    .when("/about", {templateUrl: "templates/about.html", controller: "PageCtrl"})
    .when("/recrutment", {templateUrl: "templates/recrutment.html", controller: "PageCtrl"})
    .when("/alumni", {templateUrl: "templates/alumni.html", controller: "PageCtrl"})
    .when("/login", {templateUrl: "templates/login.html", controller: "PageCtrl"})
    .when("/scholarship", {templateUrl: "templates/scholarship.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "templates/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });
});