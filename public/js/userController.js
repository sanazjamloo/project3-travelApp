(function(){
  angular.module('travelApp')
    .controller('UserController', UserController);

    function UserController($scope, $http, $state){

      var self = this;
      this.trips = [];

      this.search = function(){
        $http({
          method: 'GET',
          url: '/location?place='+$scope.text,
          data: {
            place: { searchString: $scope.text }
          }
        })
        .then(function(res) {
          // send the user to search-results.html state, and display
          // all users.
          var people = res.data;
          // filter out people.trips that don't equal $scope.text
          console.log(self);
          var username = '';
          res.data.forEach(function(personLooper){
            username = personLooper.username;
            personLooper.trips.forEach(function(tripLooper) {
              //add trip to array if tripLooper.place matches $scope.text
              if ( RegExp($scope.text, 'i').test(tripLooper.place) ) {
                self.trips.push({ username: username, trip: tripLooper });
              } // end if
            }) // end personLooper forEach
          }) // end res.data forEach
          $state.go('search-results')
        })
          // change State to search-results.html
        // .then(function(){
          // $scope.changeStateToSearchResults = function() {

          // }
          // return $http({
          //   method: 'GET',
          //   url: '/search-results',
            // templateUrl: 'search-results.html'
          // })
        // })
        .catch(function(err){
          console.log(err);
        })


      }

      // this.all = [
      //   {
      //     userName: 'Bob',
      //     trips: [
      //       {
      //         dateStart: new Date('01/01/2015'),
      //         dateEnd: new Date('01/12/2015'),
      //         description: 'Great place but COLD!!',
      //         imageUrl: "http://www.justrenttoown.com/blog/wp-content/uploads/2015/04/denvercity.jpg",
      //         place: 'Denver, Colorado',
      //         tripId: Date.now().toString()
      //       },
      //       {
      //         dateStart: new Date('08/10/2015'),
      //         dateEnd: new Date('08/12/2015'),
      //         description: 'Great place but WAY to HOT!!',
      //         imageUrl: "imageUrl for Bob's trip to Daytona Beach",
      //         place: 'Daytona Beach, FL',
      //         tripId: Date.now().toString()
      //       }
      //     ],
      //     userId: Date.now().toString()
      //   },
      //   {
      //     userName: 'Suzy',
      //     trips: [
      //       {
      //         dateStart: new Date('04/01/2015'),
      //         dateEnd: new Date('04/22/2015'),
      //         description: 'Southern hospitality is alive and well -- these people really know how to treat a lady!',
      //         imageUrl: "imageUrl for Suzy's trip to Jackson",
      //         place: 'Jackson, MS',
      //         tripId: Date.now().toString()
      //       },
      //       {
      //         dateStart: new Date('04/23/2016'),
      //         dateEnd: new Date('04/25/2016'),
      //         description: 'In my opinion, this place is the armpit of America.',
      //         imageUrl: "http://www.igsprotection.com/wp-content/uploads/2012/10/Building-Security1.jpg",
      //         place: 'Houston, TX',
      //         tripId: Date.now().toString()
      //       }
      //     ],
      //     userId: Date.now().toString()
      //   }
      // ] // end this.all
    } // end UserController function
})()
