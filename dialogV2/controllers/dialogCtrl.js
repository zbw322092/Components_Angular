var app = angular.module('dialog_app', []);


app.controller('dialogCtrl', [
	'$scope',
	'$rootScope', 
	'$window', 
	'$location',
	'$document',
	'$templateCache',
	'$http',
	'ngDialog',
	function (
		$scope, 
		$rootScope, 
		$window,
		$location,
		$document,
		$templateCache,
		$http,
		ngDialog
	) {

		$scope.showDialog = function() {
			ngDialog.open({
				showClose: true,
				showOverlay: true,
				plain: false,
				// template: '<div class="test">test dom element</div>'
				templateUrl: 'windowAlert.html',
				cache: true
			});
		}








	}
]);


app.run(['$templateCache', function ($templateCache) {
  $templateCache.put('windowAlert.html',
    '<div class="alert-body">' +
    ' <div class="alert-button" ng-click="redirect(distination)"></div>' +
    '</div>'
  );
}]);




































