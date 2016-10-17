var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var tripSchema = mongoose.Schema({
  dateStart: Date,
  dateEnd: Date,
  description: String,
  imageUrl: String,
  place: String,
  tripId: String

})


module.exports = mongoose.model('Trip', tripSchema);
