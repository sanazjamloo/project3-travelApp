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

    //User.findById(req.user._id).exec()
    User.findById('5806d92db5fd1e059a394c6e').exec()
    .then(function(user){
      // if (!user) { return; }

      var newTrip = req.body;
      newTrip.tripId = Date.now().toString();

      user.trips.push(new Trip(newTrip));
      return user.save();
    })
    .then(function(data) {
      res.status(201).json({message: 'created'});
    })
    .catch(function(err) {
      console.error(err);
    });
});

//edit trip
router.patch('/trip/:tripId', function(req,res) {
  //User.findById(req.user._id).exec()
  User.findById('5806d92db5fd1e059a394c6e').exec()
  .then(function(user){
    // if (!user) { return; }

    user.trips.forEach(function(item){
      if (item.tripId === req.params.tripId) {
        for (property in req.body) {
          item[property] = req.body[property];
        }
      }
    });

    return user.save();
  })
  .then(function(data) {
    res.status(200).json({message: 'deleted'});
  })
  .catch(function(err) {
    console.error(err);
  });
});

//delete trip
router.delete('/trip/:tripId', function(req,res) {
  //User.findById(req.user._id).exec()
  User.findById('5806d92db5fd1e059a394c6e').exec()
  .then(function(user){
    // if (!user) { return; }

    var removeItemAt = user.trips.findIndex(function(item){
      return item.tripId === req.params.tripId;
    });

    if (removeItemAt !== -1) {
      user.trips.splice(removeItemAt, 1);
    }

    return user.save();
  })
  .then(function(data) {
    console.log('removed the trip');
    res.status(200).json({message: 'removed'});
  })
  .catch(function(err) {
    console.error(err);
  });
});

module.exports = router;
