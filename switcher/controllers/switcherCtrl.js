var app = angular.module('switcher_app', []);

app.controller('switcherCtrl', ['$scope', '$sce', function($scope, $sce) {
	console.log($scope.switcherStatus);

	$scope.changeFunc = function() {
		console.log('ok');
	}

	// $scope.disableValue = true;

}]);