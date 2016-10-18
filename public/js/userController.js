(function(){
  angular.module('travelApp')
    .controller('UserController', UserController);

    function UserController($scope){

      var self = this;

      this.search = function(){
        console.log($scope.text);
        // return $http({
        //   method: 'POST',
        //   url: '/placeholder',
        //   data: {
        //     searchString: $scope.text
        //   }
        // })
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
