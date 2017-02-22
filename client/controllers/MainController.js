var app = angular.module('myApp',[]);
app.controller('MainController', function($scope) { 
	console.log("Inside MainController");
   $scope.headerLinks=
[{name:'Home',link:'#home'},
{name:'About Us',link:'https://www.google.com'},
{name:'Details',link:'https://www.google.com'}];
});
 

app.controller('HomeCtrl', function($scope, $http) {
	console.log("Inside HomeCtrl");
       $http.get('http://10.20.232.120:8080/')
       .then(function(res){
          $scope.details = res.data;   
          console.log('data is::::::::::::'+ JSON.stringify($scope.details));
        });
  $http.get('details.json')
       .then(function(res){
       	console.log('inside get json');
          $scope.details = res.data;   
        });
});                                 