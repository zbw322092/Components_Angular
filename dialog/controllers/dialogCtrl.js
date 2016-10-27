var app = angular.module('dialog_app', []);

app.controller('dialogCtrl', [
	'$scope', 
	'$rootScope', 
	'$window', 
	'$location',
	'$document',
	'userID',
	'apiToken',
	'launchIt',
	function (
		$scope, 
		$rootScope, 
		$window,
		$location,
		$document,
		userID,
		apiToken,
		launchIt
	) {


		$scope.cancel = function() {
			$scope.showDialog = false;
		}

		$scope.confirm = function() {
			location.href = 'http://cn.bing.com/';
		}

		console.log(userID);

		console.log(apiToken);

		console.log(launchIt);
		launchIt.launchRocket();


}]);











































