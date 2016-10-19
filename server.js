//modules
var path           = require('path');
var logger         = require('morgan');
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var moment         = require('moment-timezone');
var mongoose       = require('mongoose');
mongoose.Promise   = global.Promise;
mongoose.connect('mongodb://localhost/project3-travelApp');
var User = require('./models/user.js');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

//app settings
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));   //used for static content like CSS files and pictures
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(methodOverride('_method'));


var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routers
app.use('/private', require('./controllers/private.js'));
app.use('/', require('./controllers/index.js'));



app.listen(port, function() {
  console.info('Server is responding on port ' + port + ' ',
  moment(new Date(), 'America/Chicago').format());
});
