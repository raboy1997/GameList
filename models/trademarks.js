var mongoose = require('mongoose');

var MarksSchema = new mongoose.Schema({
	name: String,
	about: String,
	website: String,
	logo: String,
	country: String,
	founded: String,
	price: String
});

mongoose.model('Marks', MarksSchema, 'marks');