var app = angular.module('switcher_app', []);

app.controller('switcherCtrl', ['$scope', '$sce', function($scope, $sce) {

	$scope.changeFunc = function(oldValue, newValue) {
		// console.log(scope.switcherStatus);
		console.log('was: ' + oldValue + '          ' + 'now: '+ newValue);
	}

}]);