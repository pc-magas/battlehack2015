// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'battlehack15' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//   'battlehack15.services' is found in services.js
//   'battlehack15.controllers' is found in controllers.js
var app = angular.module('battlehack15', ['ionic','battlehack15.controllers','battlehack15.services','ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider, $compileProvider, $ionicConfigProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  //boost performance - no need to keep debug info
  $compileProvider.debugInfoEnabled(false);

  //cache only 1 view
  $ionicConfigProvider.views.maxCache(1);

  $stateProvider.state('monument/list', {
    url: "/monument/list",
    templateUrl: "templates/monument.list.html",
    controller: 'Monument'
  });

  $stateProvider.state('monument/view', {
    url: "/monument/view",
    templateUrl: "templates/monument.view.html",
    controller: 'Monument'
  });

  $stateProvider.state('organization/list', {
    url: "/organization/list",
    templateUrl: "templates/organization.list.html",
    controller: 'Organization'
  });

  $stateProvider.state('donation/form', {
    url: "/donation/form",
    templateUrl: "templates/donation.form.html",
    controller: 'Donation'
  });

  //
  //Default view: Profile page (with the appropriate session validation!!!!!)
  //
  $urlRouterProvider.otherwise('/monument/list');
});