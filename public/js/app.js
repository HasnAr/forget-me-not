angular.module('routerApp', [])
// controller for entire app
.controller('mainController', function(){
	var viewModel = this;
	viewModel.bigMessage = "Main message here";
})
// controller for the game page
.controller('gameController', function(){
  var viewModel = this;
  viewModel.message = "This is where the game is played";
});