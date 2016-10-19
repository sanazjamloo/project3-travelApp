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
      } // end this.search

      

    } // end UserController function
})()
