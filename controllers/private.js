var express = require('express');
var router  = express.Router();

//logout
router.get('/logout', function(req,res) {
  res.send('hello world');
});

//add trip
router.post('/', function(req,res) {
  //code goes here
});

//edit trip
router.patch('/', function(req,res) {
  //code goes here
});

//delete trip
router.delete('/', function(req,res) {
  //code goes here
});

module.exports = router;
