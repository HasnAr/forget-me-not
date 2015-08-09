// mongoose schema for student data
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	name: { type: String, required: true },
	// need to get string of the img file path
	imgSrc: { type: String, required: true },
	hint: String
});

module.exports = mongoose.model('Student', StudentSchema);
