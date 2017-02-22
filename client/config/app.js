// ===============================================================
//                            CONFIG
// ===============================================================
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "partials/home.html",
		controller : "HomeCtrl"
    })
    .when("/about", {
        templateUrl : "partials/about.html"
    })
	.when("/", {
        templateUrl : "partials/home.html",
		controller : "HomeCtrl"

    })
  .otherwise("/home");

});
// ===============================================================
//                            FACTORY FOR SOCKET
// ===============================================================

app.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:8089');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});



// ===============================================================
//                            CONTROLLERS
// ===============================================================
app.controller('MainController', function($scope,socket) { 
  console.log("Inside MainController");
   $scope.headerLinks=
[{name:'Home',link:'#home'},
{name:'About Us',link:'https://www.google.com'},
{name:'Details',link:'https://www.google.com'}];
});
 

app.controller('HomeCtrl', function($scope, $http,socket) {
  console.log("Inside HomeCtrl");
  //whenever socket connection opens
  socket.on('newclient', function(data){
      $http.get('http://10.20.232.120:8089/getData')
       .then(function(res){
          $scope.details = res.data;   
          console.log('data is::::::::::::'+ JSON.stringify($scope.details));
          // $scope.$apply($scope.details);
        });
      // alert('socket on');
  });
       
  // $http.get('details.json')
  //      .then(function(res){
  //       console.log('inside get json');
  //         $scope.details = res.data;   
  //       });
});                                 