angular.module('citiesApp')
 .controller('registerCtrl', [function() {
 

    self = this;

    self.cities = function(){
        console.log('User clicked submit with ' , self.user)
    }

 }]);
