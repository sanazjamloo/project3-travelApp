(function(){
  angular.module('travelApp')
    .controller('UserController', UserController);

    function UserController($scope, $http, $state, $timeout){

      var self = this;

      this.currentUser = null;
      this.password = '';
      this.signupusername = null;
      this.signuppassword = null;
      this.signuperror = null;
      this.trips = [];
      this.username = '';

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
          $state.go('user');
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

          var temp = {};
          var username = '';

          res.data.forEach(function(personLooper){
            temp = {};
            username = personLooper.username;
            temp.username = username;
            personLooper.trips.forEach(function(tripLooper) {
              //add trip to array if tripLooper.place matches $scope.text
              if ( RegExp($scope.text, 'i').test(tripLooper.place) ) {
                for (property in tripLooper) {
                  temp[property] = tripLooper[property];
                }
                self.trips.push(temp);
              } // end if
            }) // end personLooper forEach
          }) // end res.data forEach
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

    } // end UserController function
})()
