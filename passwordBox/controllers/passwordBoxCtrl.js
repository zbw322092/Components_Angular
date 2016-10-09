var app = angular.module('password_box_app', []);

app.controller('passwordBoxCtrl', ['$scope','$timeout', function ($scope, $timeout) {
	$scope.passwordRequest = function(data) {
		window.alert(data);
		$timeout(function() {
			$scope.processDone = false;
		}, 5000);
	}
}]);



 




































