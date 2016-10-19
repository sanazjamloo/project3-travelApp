var express = require('express');
var router  = express.Router();
var Trip = require('../models/trip.js');
var User = require('../models/user.js');

//logout
router.get('/logout', function(req,res) {
  try {
    req.logout();
  } catch (e) {
    console.log(e);
  }
});

//add trip
router.post('/:userId', function(req,res) {

    //   return User.findById(req.user._id).exec()
    User.findById('5806d92db5fd1e059a394c6e').exec()
    .then(function(user){
      // if (!user) { return; }

      var newTrip = req.body;
      newTrip.tripId = Date.now().toString();

      user.trips.push(new Trip(newTrip));
      return user.save();
    })
    .then(function(data) {
      console.log('Created and pushed new trip');
      res.status(201).json({message: 'created'});
    })
    .catch(function(err) {
      console.error(err);
    });
});

//edit trip
router.patch('/trip/:tripId', function(req,res) {
  //code goes here
});

//delete trip
router.delete('/trip/:tripId', function(req,res) {
  //code goes here
});

module.exports = router;
