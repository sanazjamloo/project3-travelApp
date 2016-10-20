(function(){
  angular.module('travelApp')
    .controller('UserController', UserController);

    function UserController($scope, $http, $state){

      var self = this;

      this.currentUser = null;
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

      // html -> controller.login() send user and pw -> index.js POST route -> controller.login() test user and pw are good -> change state.  User must persist in all states, so look at Christine's slack message with URL with Colin's solution and integrate.
      //
      // $http.get('/helpers/get-user')
      // .then(function(response) {
      //   self.currentUser = response.data.user;
      //   console.log('from get-user, currentUser is ', self.currentUser);
      // })
      // .catch(function(err) {
      //   console.error(err);
      // });

      /*
        For signup route:
              {
          "message": {
            "name": "UserExistsError",
            "message": "A user with the given username is already registered"
          }
        }
      */



    } // end UserController function
})()
