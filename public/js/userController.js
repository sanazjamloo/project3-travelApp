(function(){
  angular.module('travelApp')
    .controller('UserController', UserController);

    function UserController($scope, $http, $state){

      var self = this;

      this.creds = {
        username: 'sam',
        password: 's'
      };
      this.password = '';
      this.trips = [];
      this.username = '';

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
        // XXX the below code contained within triple x did not work,
        // but moving `$state.go...` to inside the above `.then` made it
        // work.

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
        // XXX
        .catch(function(err){
          console.log(err);
        })
      }; // end this.search

      this.test = function() {
        console.log('at beginngin of test, scope.username is ', $scope.username);
        console.log('at beginngin of test, self.username is ', self.username);
        $http.post('/login', self.creds)
        .then(function() {
          console.log('after POST on /test');
          $state.go('home');
        });
      }; //end this.login

      this.login = function() {
        $http({
          method: 'POST',
          url: '/login',
          data: {
            username: $scope.username,
            password: $scope.password
          }
        })
        .then(function() {
          console.log('after POST on /login');
          $state.go('home');
        });
      }; //end this.login

      // html -> controller.login() send user and pw -> index.js POST route -> controller.login() test user and pw are good -> change state.  User must persist in all states, so look at Christine's slack message with URL with Colin's solution and integrate.

    } // end UserController function
})()
