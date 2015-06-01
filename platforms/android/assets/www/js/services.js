//battlehack15 server url - retrieve data from this server
var battlehack15_server = 'http://battlehack2015-pcmagas.rhcloud.com/index.php/';


var srv = angular.module('battlehack15.services', ['ngCordova']);

/*
  Model: Monument
*/
srv.factory('Mod_monument', function ($http) {
  return {
    fetch_by_location: function(lat, lon) {
      return (
        $http({
          url:battlehack15_server + 'Monument/fetch_by_location',
          method:'POST',
          data:{lon:lon,lat:lat}
        })
        .then(function (r) {
          return(r.data)
        })
      );
    },

    fetch_by_id: function(id) {
      return (
        $http({
          url:battlehack15_server + 'Monument/fetch_by_id',
          method:'POST',
          data:{id:id}
        })
        .then(function (r) {
          return(r.data)
        })
      );
    },
  }
});

/*
  Model: Organization
*/
srv.factory('Mod_organization' ,function ($http) {
  return {
    fetch_all: function() {
      return (
        $http({
          url:battlehack15_server + 'Organization/fetch_all',
          method:'POST'
        })
        .then(function (r) {
          return(r.data)
        })
      );
    },
  }
});

/*
  Model: Donation
*/
srv.factory('Mod_donation' ,function ($http) {
  return {
    donate_to: function(oid, mid) {
      return (
        $http({
          url:battlehack15_server + 'Donation/donate_to',
          method:'POST',
          data: {oid:oid,mid:mid}
        })
        .then(function (r) {
          return(r.data)
        })
      );
    },
  }
});