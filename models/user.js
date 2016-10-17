var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tripSchema = require('./trip.js').schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	trips: [tripSchema],
	userId: String
});




UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
