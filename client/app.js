let app = angular.module('citiesApp', ["ngRoute"]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        template: '<h1>This is the default route</h1>'
    })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/poi',{
            templateUrl: 'components/POI/poi.html',
            controller : 'poiCtrl as poiCtrl'
        })
        .when('/register',{
            templateUrl: 'components/Register/register.html',
            controller : 'registerCtrl as regCtrl'
        })
        .otherwise({ redirectTo: '/' });
}]);