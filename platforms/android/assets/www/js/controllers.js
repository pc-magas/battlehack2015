var app = angular.module('battlehack15.controllers', ['ngCordova']);


app.controller('Common', function(navigator) {
  $scope.exit_app = function() {
    navigator.app.exitApp();
  }
});

/*
  Controller: Monument
*/
app.controller('Monument', function($scope, $rootScope, $state, $cordovaGeolocation, $ionicModal, Mod_monument) {
  $rootScope.battlehack15_server = battlehack15_server;

  $rootScope.fetch_data = true;
  $rootScope.monument_item = 0;

  if (typeof $rootScope.watch === "undefined")
    $rootScope.watch = null;
  
  $scope.bring_next = function () {
    $rootScope.monument_item = $rootScope.monument_item + 1;
    $rootScope.monument_item = ($rootScope.monument_item >= $rootScope.monuments.length) ? $rootScope.monuments.length-1 : $rootScope.monument_item;
    $scope.monument = $rootScope.monuments[$rootScope.monument_item];
  }

  $scope.bring_prev = function () {
    $rootScope.monument_item = $rootScope.monument_item - 1;
    $rootScope.monument_item = ($rootScope.monument_item <= 0) ? 0 : $rootScope.monument_item;
    $scope.monument = $rootScope.monuments[$rootScope.monument_item];
  }

  $scope.reset_fetch_data = function () {
    $rootScope.fetch_data = true;
    $rootScope.fetch_by_location();
  }

  $scope.fetch_by_location = function() {
    //initialize a timer to start fetching data based on user's location
    if (!$rootScope.watch) {
      $rootScope.monuments = [];
      $rootScope.watch = $cordovaGeolocation.watchPosition({maximumAge: 7000, timeout: 300000, enableHighAccuracy: true});
      $rootScope.watch.then(
        null,
        function(err) {
          //error - do nothing
        },
        function(position) {
          if ($rootScope.fetch_data) {
            //Mod_monument.fetch_by_location(37,23)
            Mod_monument.fetch_by_location(position.coords.longitude,position.coords.latitude)
            .then(function (r) {
              navigator.vibrate(1000);
              $rootScope.monuments = r.data;
              $rootScope.fetch_data = false;
            });
          }
        }
      );
    }
  }

  $scope.fetch_by_id = function(m, index) {
    //fetch the monument by its id
    $rootScope.monument_item = index;
    $rootScope.monument = m;
    Mod_monument.fetch_by_id(m.id)
    .then(function (r) {
      if (r.status) {
        $rootScope.monument = r.data[0];
        $state.go("monument/view");
      }
      else
        $ionicPopup.alert({
          title: 'Error',
          template: 'Oooops. This monument does not exist in our database!',
        });
    });
  }
});



/*
  Controller: Organization
*/
app.controller('Organization', function($scope, $rootScope, $state, Mod_organization) {
  $scope.fetch_all = function() {
    $rootScope.organizations = [];
    Mod_organization.fetch_all()
    .then(function (r) {
      $rootScope.organizations = r.data;
    });
  }
});

/*
  Controller: Donation
*/
app.controller('Donation', function($scope, $rootScope, $state, $ionicPopup, Mod_donation) {
 $scope.pop_up_donation_form = function(org) {
    $rootScope.organization = org;
    $ionicPopup.confirm({
      title: 'Donate',
      template: 'You have selected to donate money to ' + org.title  + '. Proceed?'
    })
    .then(function(res) {
      if(res) {
        //donation form
        $state.go('donation/form');
      }
    });
  }

  $scope.donate_init = function () {
    Mod_donation.donate_to($rootScope.organization.id, $rootScope.monument.id)
    .then(function (r) {
      braintree.setup(r.data, "dropin", {container: "payment-form"});
    });
  }
});