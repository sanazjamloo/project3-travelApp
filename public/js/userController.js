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
          var username = '';
          var temp = {};
          res.data.forEach(function(personLooper){
            temp = {};
            temp.username = personLooper.username;
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
          console.log('self.trips is ', self.trips);
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
      } // end this.search

      // html -> controller.login() send user and pw -> index.js POST route -> controller.login() test user and pw are good -> change state.  User must persist in all states, so look at Christine's slack message with URL with Colin's solution and integrate.

    } // end UserController function
})()
