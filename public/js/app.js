(function(){
  angular.module('travelApp', ['ui.router'])
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('demo', {
      url: '/demo',
      templateUrl: 'demo.html'
    })
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('login', {
      url: '/user',
      templateUrl: 'user.html'
    })
    .state('search-results', {
      url: '/search-results',
      templateUrl: 'search-results.html'
    })
    .state('user', {
      url: '/user',
      templateUrl: 'user.html'
    });


    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

  } // end MainRouter function
})();
