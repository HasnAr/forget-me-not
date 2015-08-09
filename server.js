var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var Student = require('./models/student');

// ------- Configuration -------
// use bodyParser to pull info from POST reqs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// handle CORS reqs
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();
});

// log all reqs to console
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/students');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});


// backbone, coffeescript, underscore, db query to select user sql  

app.use(express.static(__dirname + '/public'));

var studentId = 0;

var studentArray = [
	{ name: "Jennie", imgSrc: "images/jennie.png" },
  { name: "Batman", imgSrc: "images/batman.png" },
  { name: "Eric", imgSrc: "images/eric.png" }
];


var jk = new Student({
	name: 'Jennie',
	imgSrc: "images/jennie.png"
});

jk.save(function (err, jk) {
  if (err) return console.error(err);
});

studentArray = studentArray.map(function(student){
	student.id = '' + studentId++; // stringify so that === in param works
	return student;
});

app.get('/students', function(req, res){
	res.json(studentArray);
});

// whenever you make any req to param id, run this middleware first
app.param('id', function(req, res, next, id){
	var student = studentArray.filter(function(student){
		return student.id === id;
	}).pop();
	// make new prop on req obj, and assign to the var we just defined
	req.student = student;
	// TODO account for errors
	next();
});

app.put('/students/:id', function(req, res){
  var hint = req.body.hint;
  var result;
  for(var i = 0; i < studentArray.length; i++){
  	if(studentArray[i].id === req.student.id){
  		studentArray[i].hint = hint;
  		result = studentArray[i];
  	  // return;
  	}
  }
  res.send(result);
});

// app.get('/students/:id', function(req, res){
//   console.log(req.student);
//   res.send(req.student);
// });


app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});


// get an instance of the express router
// var apiRouter = express.Router();

// logging middleware
// apiRouter.use(function(req, res, next){
// 	console.log("Someone just came to our app!");
// 	next(); // call next to make sure that we don't stop here
// });
  
// app.use('/api', apiRouter);


app.listen(8080);
console.log("Server listening on 8080");
