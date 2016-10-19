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
        res.status(500).json({ message: err});
      } else {
        res.status(200).json({ message: 'user created'});
      }
    }); // end function
});

//LOG IN ROUTE
router.post('/login', passport.authenticate('local'), function(req, res) {

  req.session.save(function(err) {
    if (err) {
      res.status(500).json({ message: err});
    } else {
      res.status(200).json({ message: 'successful login'});
    }

  });
});

router.post('/test', function(req, res) {
  console.log('req.body is ',req.body);
});





//NOTE we are sending data to Angular.
//We are not sending views to a user.

router.get('/location' , function(req, res){
  //first we need to figure out what location the user wants to know about.
  console.log(req.query);

  var place = req.query.place;
  var result = [];

  //check for empty values
  if (!place) {
    res.json([]);
  }

  //find the relevant data in the database
  User.find().exec()
    .then(function(data){
      //data is a list of users
      //loop through the usrs and return the trips where trip.place === place
      data.forEach(function(userLooper){
        console.log('username is ', userLooper.username);
        userLooper.trips.forEach(function(tripLooper){
          if (tripLooper.place.search(new RegExp(place, 'i')) !== -1){
            result.push(userLooper);
          }
        });
      });

      console.log('after looping through users, result is ', result);
    })
    .catch(function(err){
      console.log(err);
    })
    //send the data to Angular in a res.json command
    .then(function(){
      res.json(result);
    });
});

router.get('/user/:userId/trips', function(req, res){

  User.findOne({userId: req.params.userId}).exec()
    .then(function(data){
      res.json(data)
    })
    .catch(function(err){
      console.log(err);
    });
});











module.exports = router;
