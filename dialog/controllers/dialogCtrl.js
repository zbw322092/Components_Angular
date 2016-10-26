var app = angular.module('dialog_app', []);

app.controller('dialogCtrl', [
	'$scope', 
	'$rootScope', 
	'$window', 
	'$location',
	'$document',
	function (
		$scope, 
		$rootScope, 
		$window,
		$location,
		$document
	) {


		$scope.cancel = function() {
			$scope.showDialog = false;
		}

		$scope.confirm = function() {
			location.href = 'http://cn.bing.com/';
		}


}]);











































