(function(){
  angular.module('travelApp')
    .controller('UserController', UserController);

    function UserController($scope, $http, $state, $timeout){

      var self = this;

      this.currentUser = null;
      this.editedTrip = {};
      this.showEditForm = false;
      this.password = '';
      this.signupusername = null;
      this.signuppassword = null;
      this.signuperror = null;
      this.myTrips = [];
      this.searchedForTrips = [];
      this.username = '';

      this.newTrip = {
        dateStart: null,
        dateEnd: null,
        description: null,
        foo: null,
        place: null,
        tripId: null
      };

      this.addTrip = function() {
        $http({
          method: 'POST',
          url: '/private/'+self.currentUser,
          data: { data: self.newTrip }
        })
        .then(function(response) {
          //clear the form
          self.newTrip = {};

          //ask the server for this user's updated trip array
          return $http({
            method: 'GET',
            url: '/user/'+response.data.userId+'/trips'
          })
        })
        .catch(function(err) {
          console.error(err);
        })
        .then(function(response){
          console.log('response is:', response);
          self.myTrips = response.data;
        })
      }; //end this.addTrip

      this.login = function() {
        $http({
          method: 'POST',
          url: '/login',
          data: {
            username: self.username,
            password: self.password
          }
        })
        .then(function(response) {
          console.log('in login, response.data is ', response.data);
          self.currentUser = response.data.username;
          return $http({
            method: 'GET',
            url: '/user/'+response.data.userId+'/trips'
          })
          .then(function(res){
            self.myTrips = res.data;
          })
          .then(function(){
            $state.go('user');
          })
        })
        .catch(function(err) {
          console.error(err);
        });
      }; //end this.login

      this.logout = function() {
        $http({
          method: 'GET',
          url: '/private/logout'
        })
        .then(function(response) {
          console.log('in logout, response.data is ', response.data);
          self.currentUser = null;
          $state.go('home');
        })
        .catch(function(err) {
          console.error(err);
        });
      }; //end this.logout

      this.setTripToEdit = function(trip) {
        self.showEditForm = true;
        trip.dateEnd = new Date(trip.dateEnd);
        trip.dateStart = new Date(trip.dateStart);
        self.editedTrip = trip;
      }//end setTripToEdit

      this.search = function(){
        self.searchedForTrips = [];
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

          var tempUser = {};
          console.log('self.searchedForTrips is:', self.searchedForTrips); // XXX this is printing duplicates.  Why?
          console.log('people who have been to searchString is:', people);
          // loop through people and then loop through that person's trip to find all trips where 'place' contains searchString, and display those in the browser, including the username associated with each trip

          var isDuplicateTrip = function(id) {
            var result = self.searchedForTrips.find(function(tripLooper){
              return tripLooper._id === id;
            });

            if (result === undefined) {
              return false;
            } else {
              return true;
            }
          };

          people.forEach(function(personLooper){
            tempUser = {};
            tempUser.username = personLooper.username;
            personLooper.trips.forEach(function(tripLooper) {
              console.log('tripLooper is:', tripLooper);



              //add trip to array if tripLooper.place matches $scope.text
              if ( RegExp($scope.text, 'i').test(tripLooper.place) &&
                  !isDuplicateTrip(tripLooper._id)) {
                for (property in tripLooper) {
                  tempUser[property] = tripLooper[property];
                }
                self.searchedForTrips.push(tempUser);
              } // end if
            }) // end personLooper forEach
          }) // end res.data forEach
          console.log('self.searchedForTrips is ', self.searchedForTrips);
          $state.go('search-results')
        })
        /*
        XXX
        the below code contained within triple x did not work,
        but moving `$state.go...` to inside the above `.then` made it
        work.

          change State to search-results.html
        .then(function(){
          $scope.changeStateToSearchResults = function() {

          }
          return $http({
            method: 'GET',
            url: '/search-results',
            templateUrl: 'search-results.html'
          })
        })
        XXX */
        .catch(function(err){
          console.log(err);
        })
      }; // end this.search

      this.signup = function() {
        $http({
          method: 'POST',
          url: '/signup',
          data: {
            username: self.signupusername,
            password: self.signuppassword
          }
        })
        .then(function(response) {
          console.log('in signup, response.data is ', response.data);

          //clear form
          self.signupusername = '';
          self.signuppassword = '';

          $state.go('home');
        })
        .catch(function(err) {
          var resetMessage = function() {
            self.signuperror = '';
          }

          self.signuperror = err.data.message.message;
          console.error(err);

          //clear the message after 3 seconds
          $timeout(resetMessage,3000);
        });
      }; //end this.signup

      // DELETE A TRIP FROM A USER'S ARRAY
      this.deleteTrip = function(id) {
        $http.delete(`/private/trip/${id}`)
        .then(function(response) {
          console.log('response is:', response);

          //get the most recent trip data

          // self.myTrips = res.data.trips; // not sure if this is right
        });
      }; //end this.deleteTrip

      // EDIT A TRIP IN A USER'S ARRAY
      this.editTrip = function(trip) {

        self.showEditForm = false;

        $http.patch(`/private/trip/${trip.tripId}`, {tripData: trip})
        .then(function(response) {
          console.log(response.data);

          //don't need to update self.myTrips because editing newTrip updates
          //it in real time

          $state.go('user');
        });
      }; //end this.editTrip

    } // end UserController function
})()
