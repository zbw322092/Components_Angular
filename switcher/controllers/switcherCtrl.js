var app = angular.module('switcher_app', []);

app.controller('switcherCtrl', ['$scope', function($scope) {
	console.log($scope.switcherStatus);

	$scope.changeFunc = function() {
		console.log($scope.switcherStatus);
	}

	$scope.turnOn = function() {
		if (!$scope.disableStatus) {
			if($scope.switcherStatus) {
				$scope.switcherStatus = false;
			}
		}
	}

	$scope.turnOff = function() {
		if (!$scope.disableStatus) {
			if(!$scope.switcherStatus) {
				$scope.switcherStatus = true;
			}
		}
	}


}]);