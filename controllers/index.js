var express = require('express');
var router  = express.Router();
var Trip = require('../models/trip.js');
var User = require('../models/user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// //SIGN UP ROUTE
router.post('/signup', function(req, res){
  User.register(new User({
    username: req.body.username,
    trips: [],
    userId: Date.now().toString()
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        res.status(406).json({ message: err });
      } else {
        res.status(200).json({ message: 'user created'});
      }
    }); // end function
});

//LOG IN ROUTE
router.post('/login', passport.authenticate('local'), function(req, res) {
  req.session.save(function(err) {
    if (err) {
      res.status(406).json({ message: err});
    } else {
      res.status(200).json({ message: 'successful login', username: req.body.username, userId: req.user.userId});

    }

  });
});


//NOTE we are sending data to Angular.
//We are not sending views to a user.

//get all trips for a location
router.get('/location' , function(req, res){
  //first we need to figure out what location the user wants to know about.
  var place = req.query.place;
  var result = [];

  //check for empty values
  if (!place) {
    res.json([]);
  }

  //find the relevant data in the database
  // User.find().exec()
  User.find({
    'trips.place': new RegExp(req.query.place, 'i')
  })
    .catch(function(err){
      console.log(err);
    })
    //send the data to Angular in a res.json command
    .then(function(result){
      console.log('after new regex search, result is:', result);
      res.status(200).json(result);
    })
    .catch(function(err){
      console.log(err);
    })
});

//return all trips for a user
router.get('/user/:userId/trips', function(req, res){

  // User.findOne({userId: req.user.userId}).exec()
  User.findById(req.user._id).exec()
    .then(function(data){
      res.json(data.trips) // send only the trips info
    })
    .catch(function(err){
      console.log(err);
    });
});

// // DELETE A TRIP FROM A USER'S DATABASE

//NOTE the API spec says that we use /private/trip/:tripId . . .
// this is /user/:tripId . . . . I'm commenting this out because it works
// and we may need the code but I think we should follow spec and use the
// code that I spent time building Tom Murphree

// router.delete('/user/:tripId', function(req, res){
//   User.findOneAndUpdate(
//     {'_id': req.user._id},
//     {$pull: {'trips': {'_id': req.params.tripId}}
//   })
//   .catch(function(err){
//     console.log(err);
//   })
//   .then(function(user){
//     console.log('user is:', user);
//     return user; // do res.json instead of return, I think
//   })
//   .catch(function(err){
//     console.log(err);
//   })
// })


module.exports = router;
