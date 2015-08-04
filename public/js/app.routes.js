angular.module('routerRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
	$routeProvider
	  .when('/', {
	  	templateUrl: 'pages/home.html',
	  	controller: 'homeController',
	  	controllerAs: 'home'
	  })
	  .when('/game', {
	  	templateUrl: 'pages/game.html',
	  	controller: 'gameController',
	  	controllerAs: 'game'
	  });

	  $locationProvider.html5Mode(true);
});

