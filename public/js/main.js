require('angular-route');
require('angular-animate');
require('angular-ui-bootstrap');
require('angulartics');
require('angulartics-google-analytics');

var app = angular.module('DSP', [
  'ngRoute', 'ngAnimate', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics'
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

    .otherwise("/404", {templateUrl: "templates/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all Pages
 */
app.controller('PageCtrl', function ($scope) {




});

app.controller('scholarship', function($scope, $http) {
// fill the pdf form
 $scope.form = {};
console.log(__dirname)
  $scope.scholarship = function() {

    console.log("called scholarship");
    var data = $scope.form;
    console.log(data);
    $http({
        method: 'POST',
        url: '/formfill',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: data,
    }).success(function () {})
  };
});



app.controller('recruitment', function($scope) {

  $scope.myInterval = 5000;
  $scope.slide = [
    {image:'1.jpg'},
    {image:'2.jpg'},
    {image:'3.jpg'}
  ];

});

