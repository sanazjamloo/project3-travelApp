var express = require('express');
var router  = express.Router();
var Trip = require('../models/trip.js');
var User = require('../models/user.js');

var authorize = function(req, res, next) {
  if (!req.user) {
    res.status(401).json({message: 'unauthorized'});
  } else {
    next();
  }
}

//logout
router.get('/logout', function(req,res) {
  try {
    req.logout();
    res.status(200).json({message: 'logout successful'});
  } catch (e) {
    console.log(e);
  }
});

//add trip
router.post('/:username', authorize, function(req,res) {

    User.findOne({username: req.params.username}).exec()
    .then(function(user){
      if (!user) {
        res.status(406).json({message: 'username not found'});
      } else {
        console.log('found ', user.username);
      }

      console.log('in add trip, req.body is ', req.body);
      console.log('in add trip, req.user is ', req.user);
      var newTrip = req.body.data;
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
router.patch('/trip/:tripId', authorize, function(req,res) {
  User.findById(req.user._id).exec()
  // User.findById('5806d92db5fd1e059a394c6e').exec()
  .then(function(user){
    // if (!user) { return; }

    user.trips.forEach(function(item){
      if (item.tripId === req.params.tripId) {
        for (property in req.body) {
          item[property] = req.body.tripData[property];
        }
      }
    });

    return user.save();
  })
  .then(function(data) {
    //instead of sending {message: 'updated'}, we'll look for the user's
    //trips and return those
    res.status(200).json({message: 'updated'});
  })
  .catch(function(err) {
    console.error(err);
  });
});

//delete trip
router.delete('/trip/:tripId', authorize, function(req,res) {
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
