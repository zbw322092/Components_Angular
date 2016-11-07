var app = angular.module('dialog_app', []);


app.controller('dialogCtrl', [
	'$scope',
	'$rootScope', 
	'$window', 
	'$location',
	'$document',
	'$templateCache',
	'ngDialog',
	function (
		$scope, 
		$rootScope, 
		$window,
		$location,
		$document,
		$templateCache,
		ngDialog
	) {

		ngDialog.open({
			// showClose: 'Bowen'
		});


	}
]);


// app.run(['$templateCache', function ($templateCache) {
//   $templateCache.put('windowAlert.html',
//     '<div touch-scrolling class="alert-body" ng-class="[bodyStyle]">' +
//     ' <div ng-click="closeThisDialog(0)" class="pop-close"></div>' +
//     ' <div class="coupon-unit" ng-repeat="couponUnit in couponList track by $index" ng-class="[couponUnit]">' +
//     '   <span class="clickable-area" ng-click="checkInCouponDirectly()"></span>' +
//     ' </div>' +
//     ' <div class="alert-button" ng-class="[buttonStyle]" ng-click="redirect(distination)"></div>' +
//     '</div>'
//   );
// }]);




































