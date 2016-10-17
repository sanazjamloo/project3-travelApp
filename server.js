//modules
var path = require('path');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var moment = require('moment-timezone');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//app settings
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));   //used for static content like CSS files and pictures
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//routers
app.use('/', require('./controllers/index.js'));
// app.use('/todos', require('./controllers/todos.js'));

app.listen(port, function() {
  console.info('Server is responding on port ' + port + ' ',
  moment(new Date(), 'America/Chicago').format());
});
