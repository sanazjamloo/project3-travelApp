var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/project3-travelApp');
var Trip = require('../models/trip.js');
var User = require('../models/user.js');



var fakeUser1 = new User({
  username: 'Bob',
  trips: [
    {
      dateStart: new Date('01/01/2015'),
      dateEnd: new Date('01/12/2015'),
      description: 'Great place but COLD!!',
      imageUrl: "imageUrl for Bob's trip to Denver",
      place: 'Denver, Colorado',
      tripId: Date.now().toString()
    },
    {
      dateStart: new Date('08/10/2015'),
      dateEnd: new Date('08/12/2015'),
      description: 'Great place but WAY to HOT!!',
      imageUrl: "imageUrl for Bob's trip to Daytona Beach",
      place: 'Daytona Beach, FL',
      tripId: Date.now().toString()
    }
  ],
  userId: Date.now().toString()
});

var fakeUser2 = new User({
  username: 'Suzy',
  trips: [
    {
      dateStart: new Date('04/01/2015'),
      dateEnd: new Date('04/22/2015'),
      description: 'Southern hospitality is alive and well -- these people really know how to treat a lady!',
      imageUrl: "imageUrl for Suzy's trip to Jackson",
      place: 'Jackson, MS',
      tripId: Date.now().toString()
    },
    {
      dateStart: new Date('04/23/2016'),
      dateEnd: new Date('04/25/2016'),
      description: 'In my opinion, this place is the armpit of America.',
      imageUrl: "imageUrl for Suzy's trip to Houston",
      place: 'Houston, TX',
      tripId: Date.now().toString()
    }
  ],
  userId: Date.now().toString()
});

var newTrip = new Trip({
  dateStart: new Date('05/01/2015'),
  dateEnd: new Date('06/22/2015'),
  description: 'I spent most of the time at the beach!',
  imageUrl: "imageUrl for Suzy's trip to LA",
  place: 'Los Angeles, California',
  tripId: Date.now().toString()
});

fakeUser2.trips.push(newTrip);

//add the data to the database
fakeUser1.save()

fakeUser2.save();
  console.log('end of script');
//   .then(function(){
//     console.log('users added!!');
//   })
//   .catch({
//     console.log('something went wrong');
//   });

mongoose.connection.close();
