app.directive('progressBar', function() {
	return {
		restrict: 'AE',
		scope: {
			percentage: '@',
			barHeight: '@',
			showPercetage: '@',
			// why it will throw an error if I use '=' here
			// barWidth: '='
			barWidth: '@'
		},
		templateUrl: 'progressBar.html',
		link: function(scope, element, attrs) {
			scope.style = {height:scope.barHeight, width:scope.barWidth};
			scope.percentageBoolean = scope.showPercetage == 'false' ? false : true;
			scope.percentageText = scope.percentage;
			
		}
	}
});

app.run(['$templateCache', function($templateCache) {
	$templateCache.put('progressBar.html',
	  '<div class="progress-bar">' +
	    '<div class="progress-bar-taken" ng-style="style" >' +
	      '<span class="percentage" ng-show="percentageBoolean" ng-bind="percentageText"></span>' +
	    '</div>' +
	  '</div>'
	);
}]);