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

		$scope.watcherOne = 'It is a watcher';


		function thisFunc() {
			console.log('hi there');
		}

		thisFunc();

		console.log($rootScope);
		console.log($rootScope.$id);
		console.log($rootScope.$parent); // null
		
		console.log($scope);
		console.log($scope.$parent === $rootScope); // true

		$scope.watcherOne = 'It is a watcher';

		var childScope = $scope.$new();
		console.log(childScope);
		console.log(childScope.watcherOne); // 'It is a watcher'
		console.log(childScope.$parent === $scope); // true
		console.log(childScope.$parent === $rootScope); // false

		console.log(childScope.confirm);
		console.log(typeof childScope.confirm);

}]);











































