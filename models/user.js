var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TripSchema = require('./trip.js').schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
	username: { type: String, unique: true },
	password: String,
	trips: [TripSchema],
	userId: String
});




UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
