angular.module('routerApp', ['routerRoutes'])
// controller for entire app
.controller('mainController', function(){
	var viewModel = this;
	viewModel.bigMessage = "Welcome to Forget Me Not!";
	viewModel.subMessage = "This tool will help you remember your students' names through stories.";
})
.controller('homeController', function(){
	var viewModel = this;
	viewModel.bigMessage = "Welcome to Forget Me Not!";
	viewModel.subMessage = "This tool will help you remember your students' names through stories.";
})
// controller for the game page
// should eventually move this logic to its own file
.controller('gameController', function(gameFactory){
  var viewModel = this;
  viewModel.message = "What's my name?";
  viewModel.guess = '';
  viewModel.hint = '';
  viewModel.hasHint = false;
  viewModel.studentName = '';
  viewModel.students = [];
  viewModel.student = {};
  viewModel.matches = false;
  viewModel.showHintField = false;
	viewModel.visible = false;
	viewModel.isHidden = false;
	viewModel.guessSubmitted = false;


   gameFactory.getStudents().then(function(studentsArray){
  	viewModel.students = studentsArray;
  	viewModel.student = studentsArray[0];
	  // need logic to access the student name property from the student object 
  	viewModel.studentName = viewModel.student.name; 
  });

  // set submitName() to ng-submit in our game view
  viewModel.submitName = function(){
  	// console.log("submitName");
  	viewModel.matches = gameFactory.compareGuess(viewModel.guess, viewModel.studentName);
  	viewModel.showHintField = !viewModel.matches;
  	viewModel.guessSubmitted = true;
  };

  viewModel.updateHint = function(hintText){
  	console.log("update hint");
  	var id = viewModel.student.id;
  	gameFactory.updateHint(id, hintText);
  	viewModel.hasHint = true;
  	viewModel.isHidden = true;
  	console.log(viewModel.isHidden);
  };

  viewModel.showSavedHint = function(){
  	console.log("showSavedHint");
  	viewModel.visible = true;
  };

})
// if making a call to the server, use the factory bc you are storing state 
// do not store state in controller! controller should only hold logic for your view
.factory('gameFactory', function($http){
	// TODO get data from mongo
	var obj = {};

	obj.getStudents = function(){
    return $http.get('/students')
      .then(function(res){
      	return res.data;
      });
	};

	obj.compareGuess = function(guess, name){
		return guess === name;
	};

	obj.updateHint = function(id, hintText){
    return $http.put('/students/' + id, { hint: hintText })
      .then(function(res){
      	return res.data;
      });
	};

	obj.getHint = function(id){
    return $http.get('/students/' + id)
      .then(function(res){
      	return res.data.hint;
      });
	};

	return obj;
});

